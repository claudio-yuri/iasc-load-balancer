var cluster = require('cluster');
var Debug = require('console-debug');
const configReader = require('./modules/config-reader.js');
const config = configReader('./config.json');
var console = new Debug({
    uncaughtExceptionCatch: false,                   // Do we want to catch uncaughtExceptions? 
    consoleFilter:          config.debug? [] : ['LOG', 'WARN', 'DEBUG', 'INFO'],         // Filter these console output types 
    colors:                 true                     // do we want pretty pony colors in our console output? 
});
const Client = require('node-rest-client').Client;
const ServerManager = require('./modules/server-manager.js');
const express = require('express');
// var redis = require("redis");

//cluster master
if (cluster.isMaster) {
    const numCPUs = require('os').cpus().length;
    console.info(`Starting up cluster with ${numCPUs} processes`);

    //creamos tantos hilos como cpus tengamos disponibles
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
    }

    //definimos qué hacer una vez que se levanta cada worker
    cluster.on('online', (worker) => {
        console.info(`Worker ${worker.process.pid} is online`);
    });

    //definimos qué pasa cuando un worker se cae
    cluster.on('exit', (worker, code, signal) => {
        console.error(`Worker ${worker.process.pid} died`);
        console.info('Starting new worker...');
        cluster.fork();
    });
    //se reciben los mensajes de los workers
    cluster.on('message', (worker, message, handle) => {
        for (var x in cluster.workers){
            if(cluster.workers[x].process.pid != message.pid){
                cluster.workers[x].send({ message: message.message, host: message.host} );
            }
        }
    });
}
//cluster workers
else{
    const srvMan = new ServerManager(config.serverList, config.serverTimeout);
    var app = express();
    const numberOfRetries = 3;
    // var client = redis.createClient();

    //todos los requests entrantes
    app.all("/", (req, res) => {
        console.info(`Recibí un request ${req.method} de ${req.ip}`);
        
        var maxNumberOfRetries = config.maxRetryCount;
        if(req.method === "POST" || req.method === "PUT" || req.method === "DELETE"){
            maxNumberOfRetries = 0;
        }

        makeRequest(srvMan, req, res, process, maxNumberOfRetries);
    });

    //levanto el servidor
    app.listen(config.listenPort, () => {
        console.info(`[${process.pid}] Escuchando en ${config.listenPort}`);
    });

    process.on("message", (message) => {
        console.info(`[${process.pid}] server ${message.host} offline`);
        console.debug(message);
        srvMan.setServerOffline(message.host);
    });
}


function makeRequest(srvMan, req, res, process, retries){
    var client = new Client();
    var theHost = srvMan.getServer();
    console.info(`[${process.pid}] Se va a hacer un request al servidor ${theHost}`);

    if(theHost == null) {
        console.error(`[${process.pid}] no available servers`);
        res.sendStatus(500);
    }
    //llamo a algún servidor externo
    var r_req = client.get(theHost, { requestConfig: { timeout: 2000 }, responseConfig: { timeout: 1000 } }, (data, response) => {
        //parseo la respuesta
        if(Buffer.isBuffer(data)){
            data = data.toString('utf8');
        }
        //respondo al cliente
        res.send(`[${process.pid}] - ${data}`);
    });

    //atiendo el evento de error del request al servidor destino
    r_req.on('error', (err) => {
        console.error(`[${process.pid}] request error`);
        //pregunto si el header ya se envío porque los eventos de error y requestTimeout se pueden lanzar en simultáneo
        if(!res.headerSent) handleErrorFromRemoteServer(theHost, srvMan, req, res, process, retries);
    });

    //atiendo el evento de timeout del request al servidor destino
    r_req.on('requestTimeout', function (req) {
        console.error(`[${process.pid}] request has expired`);
        //pregunto si el header ya se envío porque los eventos de error y requestTimeout se pueden lanzar en simultáneo
        if(!res.headerSent) handleErrorFromRemoteServer(theHost, srvMan, req, res, process, retries);
    });
}

function handleErrorFromRemoteServer(theHost, srvMan, req, res, process, retries){
    srvMan.setServerOffline(theHost);
    //le aviso al master que theHost no reponde para que le avise a los demás workers
    process.send({
        pid: process.pid,
        msg: 'serverDown',
        host: theHost
    });
    if(retries > 0){
        console.debug(`[${process.pid}] remote server error. Remaining attemps ${--retries}`);
        makeRequest(srvMan, req, res, process, (retries));
    }else{
        console.error(`[${process.pid}] can't process request`);
        res.sendStatus(503);
    }
}