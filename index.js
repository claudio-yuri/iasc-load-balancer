const ServerManager = require('./modules/server-manager.js');
const fs = require('fs');
var config = null;

//levanto el archivo de configuración
try
{
    const configFile = fs.readFileSync('config.json');
    config = JSON.parse(configFile.toString());
}
catch (err)
{
    console.log("no se pudo abrir el archivo de conifguración\n");
    process.exit();
}
console.log(config);

//reviso que no falten parámetros de configuración ***********************
if(config.hasOwnProperty("listenPort") === false){
    console.log("El archivo de configuración no cuenta con el parámetro listenPort.");
    process.exit();
}

if(config.hasOwnProperty("serverTimeout") === false){
    console.log("El archivo de configuración no cuenta con el parámetro serverTimeout.");
    process.exit();
}

if(config.hasOwnProperty("serverExclusionTime") === false){
    console.log("El archivo de configuración no cuenta con el parámetro serverExclusionTime.");
    process.exit();
}

if(config.hasOwnProperty("serverList") === false){
    console.log("El archivo de configuración no cuenta con el parámetro serverList.");
    process.exit();
}

if(config.serverList.length == 0){
    console.log("Debe haber al menos un servidor disponible");
    process.exit();
}
//************************************************************************ 

var serverList = config.serverList.map(x => { 
    return { host: x, online: true, lastAccess: new Date().getTime() };
});

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
    //TODO: Falta acá llamar al planificador para tomar algún servidor de los seteados en el config
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
