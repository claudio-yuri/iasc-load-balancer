const ServerManager = require('./modules/server-manager.js');
const fs = require('fs');
const configReader = require('./modules/config-reader.js');
//levanto el config file
var config = configReader('./config.json');

//instancio el server manager
const srvMan = new ServerManager(config.serverList);
console.log(srvMan);

const express = require('express');
const Client = require('node-rest-client').Client;
var app = express();

//request de prueba
app.get("/", (req, res) => {
    console.log(`Recibí un request de ${req.ip}`);
     
    var client = new Client();
    var theHost = srvMan.getServer();
    console.log(`Se va a hacer un request al servidor ${theHost}`);
    //llamo a algún servidor externo
    client.get(theHost, (data, response) => {
        //parseo la respuesta
        if(Buffer.isBuffer(data)){
            data = data.toString('utf8');
        }
        //respondo al cliente
        res.send(data);
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
