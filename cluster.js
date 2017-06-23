var cluster = require('cluster');
// var redis = require("redis");

//cluster master
if (cluster.isMaster) {
    const numCPUs = require('os').cpus().length;
    console.log(`Starting up cluster with ${numCPUs} processes`);

    //creamos tantos hilos como cpus tengamos disponibles
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
    }

    //definimos qué hacer una vez que se levanta cada worker
    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    //definimos qué pasa cuando un worker se cae
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log('Starting new worker...');
        cluster.fork();
    });

    cluster.on('message', (worker, message, handle) => {
        // console.log(message.pid + ' said: "' + message.msg + '"');
        for (var x in cluster.workers){
            if(cluster.workers[x].process.pid != message.pid){
                cluster.workers[x].send({ message: message.message, host: message.host} );
            }
        }
    });
}
//cluster workers
else{
    const configReader = require('./modules/config-reader.js');
    const config = configReader('./config.json');
    const ServerManager = require('./modules/server-manager.js');
    const srvMan = new ServerManager(config.serverList);
    const express = require('express');
    var app = express();
    const numberOfRetries = 3;
    // var client = redis.createClient();

    //todos los requests entrantes
    app.get("/", (req, res) => {
        console.log(`Recibí un request de ${req.ip}`);
        
        makeRequest(srvMan, req, res, process, 0);
    });

    //levanto el servidor
    app.listen(config.listenPort, () => {
        console.log(`Escuchando en ${config.listenPort}`);
    });

    process.on("message", (message) => {
        console.log(message);
        srvMan.setServerOffline(message.host);
    });
}


function makeRequest(srvMan, req, res, process, retries){
    const Client = require('node-rest-client').Client;
    var client = new Client();
    var theHost = srvMan.getServer();
    console.log(`[${process.pid}] Se va a hacer un request al servidor ${theHost}`);

    if(theHost == null) {
        console.log(`[${process.pid}] chau count ${srvMan._offlineList.length}`);
        res.sendStatus(500);
    }
    //llamo a algún servidor externo
    var r_req = client.get(theHost, (data, response) => {
        //parseo la respuesta
        if(Buffer.isBuffer(data)){
            data = data.toString('utf8');
        }
        //respondo al cliente
        res.send(`[${process.pid}] - ${data}`);
    });

    r_req.on('error', (err) => {
        console.log('pucha request error');
        srvMan.setServerOffline(theHost);
        process.send({
            pid: process.pid,
            msg: 'serverDown',
            host: theHost
        });
        if(retries < 3){
            makeRequest(srvMan, req, res, process, (retries + 1));
        }else{
            res.sendStatus(400);
        }
    });
    // TODO: node-rest-client ya lanza eventos en caso de timeout
    //       acá podemos aprovechar para marcar como no disponible al servidor que no responda
    r_req.on('requestTimeout', function (req) {
        console.log('request has expired');
        res.sendStatus(400);
        // req.abort();
    });
}