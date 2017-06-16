var cluster = require('cluster');

//cluster master processess
if (cluster.isMaster) {
    const configReader = require('./modules/config-reader.js');
    var config = configReader('./config.json');
    
    //************************************************************************ 
    const numCPUs = require('os').cpus().length;
    console.log(`Starting up cluster with ${numCPUs} processes`);
    const ServerManager = require('./modules/server-manager.js');
    //instancio el server manager
    const srvMan = new ServerManager(config.serverList);
    // console.log(srvMan);

    //creamos tantos hilos como cpus tengamos disponibles
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
    }

    //definimos qué hacer una vez que se levanta cada worker
    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
        worker.send({ type: "configReady", listenPort: config.listenPort});
    });

    //definimos qué pasa cuando un worker se cae
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log('Starting new worker...');
        cluster.fork();
    });

    //escucho mensajes de los workers
    cluster.on('message', (worker, message, handle) => {
        switch(message.type){
            case "getHost":
                var theHost = srvMan.getServer();
                console.log(`sender pid: ${message.myPid} receiver pid: ${worker.process.pid}`);
                worker.send({ type: "targetHostReady", host: theHost });
                break;
            // case ""
        }
        // console.log(message.pid + ' said: "' + message.msg + '"');
    });

}
//cluster slave processes
else{
    const express = require('express');
    const Client = require('node-rest-client').Client;
    var app = express();

    //escucho el mensaje de configuración lista para definir el puerto escucha
    process.on("message", (message) => {
        switch(message.type){
            case "configReady":
                //levanto el servidor
                app.listen(message.listenPort, () => {
                    console.log(`Escuchando en ${message.listenPort}`);
                });
                break;
        }
    });

    //todos los requests entrantes
    app.get("/", (req, res) => {
        console.log(`Recibí un request de ${req.ip}`);

        //le pido al master un host
        process.send({ type: "getHost", myPid: process.pid });

        //escucho el mensaje de host listo
        process.on("message", (message) => {
            switch(message.type){
                case "targetHostReady":
                    var client = new Client();
                    console.log(`Se va a hacer un request al servidor ${message.host}`);
                    //llamo a algún servidor externo
                    client.get(message.host, (data, response) => {
                        //parseo la respuesta
                        if(Buffer.isBuffer(data)){
                            data = data.toString('utf8');
                        }
                        //respondo al cliente
                        res.send(`[${process.pid}] - ${data}`);
                    });
                    break;
            }
        });
        // TODO: node-rest-client ya lanza eventos en caso de timeout
        //       acá podemos aprovechar para marcar como no disponible al servidor que no responda
        // req.on('requestTimeout', function (req) {
        //     console.log('request has expired');
        //     req.abort();
        // });
    });
    
}
