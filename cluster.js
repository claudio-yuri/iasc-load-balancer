var cluster = require('cluster');

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
}
//cluster workers
else{
    const configReader = require('./modules/config-reader.js');
    const config = configReader('./config.json');
    const ServerManager = require('./modules/server-manager.js');
    const srvMan = new ServerManager(config.serverList);
    const express = require('express');
    const Client = require('node-rest-client').Client;
    var app = express();

    //todos los requests entrantes
    app.get("/", (req, res) => {
        console.log(`Recibí un request de ${req.ip}`);

        //le pido al master un host
        var theHost = srvMan.getServer();
        console.log(`Se va a hacer un request al servidor ${theHost}`);

        //llamo a algún servidor externo
        var client = new Client();
        client.get(theHost, (data, response) => {
            //parseo la respuesta
            if(Buffer.isBuffer(data)){
                data = data.toString('utf8');
            }
            //respondo al cliente
            res.send(`[${process.pid}] - ${data}`);
        });

        // TODO: node-rest-client ya lanza eventos en caso de timeout
        //       acá podemos aprovechar para marcar como no disponible al servidor que no responda
        // req.on('requestTimeout', function (req) {
        //     console.log('request has expired');
        //     req.abort();
        // });
    });

    //levanto el servidor
    app.listen(config.listenPort, () => {
        console.log(`Escuchando en ${config.listenPort}`);
    });
}
