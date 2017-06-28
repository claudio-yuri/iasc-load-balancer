var cluster = require('cluster');
var Debug = require('console-debug');
const configReader = require('./modules/config-reader.js');
const config = configReader('./config.json');
var console = new Debug({
    // Do we want to catch uncaughtExceptions?
    uncaughtExceptionCatch: false,
    // Filter these console output types
    consoleFilter:          config.debug? [] : ['LOG', 'WARN', 'DEBUG', 'INFO'],
    // do we want pretty pony colors in our console output?
    colors:                 true
});
const Client = require('node-rest-client').Client;
const ServerManager = require('./modules/server-manager.js');
const ServerSupervisor = require('./modules/server-supervisor.js');
const express = require('express');
var redis = require('redis');
var redis_client = redis.createClient();

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
    const srvMan = new ServerManager(config.serverList, config.serverExclusionTime);
    var app = express();
    const numberOfRetries = 3;

    //todos los requests entrantes
    app.all("/", (req, res) => {
        console.info(`Recibí un request ${req.method} de ${req.ip}`);
        console.debug(req.url);
        
        if(canUseCache(req)){
            //intento obtener los datos del caché
            redis_client.get(getCacheKey(req), (err, reply) => {
                // console.debug(err);
                // console.debug(reply);
                if(reply !== null){
                    //cache hit! respondo al cliente
                    res.send(reply);
                }
                else{
                    //cahce miss. procedo a hacer el request al server destino
                    makeRequest(srvMan, req, res, process, config.maxRetryCount);
                }
            });
        }
        else{
            //determino la cantidad de retries disponibles según el tipo de request
            var maxNumberOfRetries = config.maxRetryCount;
            if(req.method === "POST" || req.method === "PUT" || req.method === "DELETE"){
                maxNumberOfRetries = 0;
            }
            //procedo a hacer el request
            makeRequest(srvMan, req, res, process, maxNumberOfRetries);
        }
    });

    //levanto el servidor
    app.listen(config.listenPort, () => {
        console.info(`Se levanta el load balancer`);
        console.info(`[${process.pid}] Escuchando en ${config.listenPort}`);
    }).on('error', function(err) {
        if (err.errno === 'EADDRINUSE')
            console.debug('Puerto ocupado '+config.listenPort);
        else
            console.debug(err);
    });

    process.on("message", (message) => {
        console.info(`[${process.pid}] server ${message.host} offline`);
        console.debug(message);
        srvMan.setServerOffline(message.host);
    });

    //se agrega la ruta para registrar el heartbeat
    app.route('/register').get(function (req, res) {
        console.info('se registró el heartbeat');
        new ServerSupervisor(srvMan, config);
        res.json({status: 'heartbeat ok'})
    });
}

/**
 * Determina si corresponde o no usar caché
 * @param {Express.Request} req 
 */
function canUseCache(req){
    // console.debug(req.headers);
    // console.debug(req.header('cache-control'));
    // console.debug(req.header('expires'));
    var forbiddenByCacheControl = req.header('cache-control') !== undefined && req.header('cache-control') === "no-cache";
    var forbiddenByExpiration = req.header('expires') !== undefined && req.header('expires') == 0;

    // console.debug(`cc ${forbiddenByCacheControl} - exp ${forbiddenByExpiration}`);
    return req.method === "GET" && !forbiddenByCacheControl && !forbiddenByExpiration;
}

/**
 * me devuelve el nombre con el que voy a guardar los responses en el cache
 * @param {Express.Request} req el objeto del request con el que estamos trabajando
 * @return {string} sum
 */
function getCacheKey(req){
    //sabemos que la url puede ser muy larga y que una key larga para redis puede no ser lo mejor
    //  pero lo hacemos así igual porque es la forma más sencilla de identificar requests
    //  tabién se podría generar un hash, pero requiere más procesamiento
    return req.method + "_" + req.url;
}

/**
 * Realiza el request a un servidor disponible
 * @param {ServerManager} srvMan 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Process} process 
 * @param {number} retries la cantidad de reintentos disponibles
 */
function makeRequest(srvMan, req, res, process, retries){
    var client = new Client();
    //le pido un servidor al manager
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
        if(canUseCache(req)){
            //guardo en caché
            redis_client.setex(getCacheKey(req), config.cacheTimeout, `[${process.pid}] - ${data}`);
        }
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

/**
 * Es la función que se llama en caso de fallo
 * @param {string} theHost 
 * @param {ServerManager} srvMan 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Process} process 
 * @param {number} retries la cantidad de reintentos disponibles
 */
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
