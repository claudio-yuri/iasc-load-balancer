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

const express = require('express');
var app = express();

//request de prueba
app.get("/", (req, res) => {
    console.log("Recibí un request de " + req.ip);
    res.send("Hola, son las " + (new Date().toString()));
});

//levanto el servidor
app.listen(config.listenPort, () => {
  console.log("Escuchando en " + config.listenPort);
});