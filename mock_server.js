const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number },
  { name: 'delay', alias: 'd', type: Number }
];

const options = commandLineArgs(optionDefinitions);
console.log(options);

const express = require('express');
var app = express();

//request de prueba
app.get("/", (req, res) => {
    console.log("Recibí un request de " + req.ip);
    res.send("Hola, son las " + (new Date().toString()));
});

//levanto el servidor
app.listen(options.listenPort, () => {
  console.log("Escuchando en " + options.port);
});