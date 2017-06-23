const ServerManager = require('./modules/server-manager.js');
const fs = require('fs');
const configReader = require('./modules/config-reader.js');
//levanto el config file
var config = configReader('./config.json');
// const Client = require('node-rest-client').Client;

//instancio el server manager
const srvMan = new ServerManager(config.serverList, config.serverTimeout);
// console.log(srvMan);

const express = require('express');
const Client = require('node-rest-client').Client;
var client = new Client();
var app = express();

//request de prueba
app.get("/", (req, res) => {
    console.log(`Recibí un request de ${req.ip}`);
    makeRequest(srvMan, req, res, 0);
});

//levanto el servidor
app.listen(config.listenPort, () => {
    console.log(`Escuchando en ${config.listenPort}`);
});


function makeRequest(srvMan, req, res, retries){
    console.log("retries: ", retries, "max:", config.maxRetryCount);
    var theHost = srvMan.getServer();
    console.log(`Se va a hacer un request al servidor ${theHost}`);

    if(theHost == null) {
        console.log(`chau count ${srvMan._offlineList.length}`);
        res.sendStatus(500);
    }
    else{
        //llamo a algún servidor externo
        var r_req = client.get(theHost, { /*requestConfig: { timeout: 1000 },*/ responseConfig: { timeout: 1000 } }, (data, response) => {
            //parseo la respuesta
            if(Buffer.isBuffer(data)){
                data = data.toString('utf8');
            }
            //respondo al cliente
            res.send(`${data}`);
        });

        r_req.on('error', (err) => {
            console.log('pucha request error');
            srvMan.setServerOffline(theHost);
            if(retries < config.maxRetryCount){
                makeRequest(srvMan, req, res, (retries + 1));
            }else{
                res.sendStatus(400);
            }
        });

        r_req.on('requestTimeout', function (req) {
            console.log('requestTimeout');
            // res.sendStatus(400);
            // req.abort();
            srvMan.setServerOffline(theHost);
            if(retries < 3){
                makeRequest(srvMan, req, res, (retries + 1));
            }else{
                res.sendStatus(400);
            }
        });

        r_req.on('responseTimeout', function (req) {
            console.log('responseTimeout');
            // res.sendStatus(400);
            // req.abort();
            srvMan.setServerOffline(theHost);
            if(retries < 3){
                makeRequest(srvMan, req, res, (retries + 1));
            }else{
                res.sendStatus(400);
            }
        });
    }
}