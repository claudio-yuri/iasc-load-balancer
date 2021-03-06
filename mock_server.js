const commandLineArgs = require('command-line-args');

//opciones de los parámetros
const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number },
  { name: 'delay', alias: 'd', type: Number },
  { name: 'name', alias: 'n', type: String }
];

const options = commandLineArgs(optionDefinitions);
console.log("server configuration", options);

const listenPort = options.port || 3010;
const serverName = options.name || 'default';
const delay = options.delay || 0;

var express = require('express');
var app = express();

app.all('/', function (req, res) {
  console.log(`[${serverName}] - Recibí un request de tipo ${req.method} de ${req.ip}`);
  setTimeout(function() {
    res.send(`Saludos desde ${serverName}, son las ${(new Date().toString())}`);
  }, delay);
});

// Respuesta para el Heartbeat

app.route('/heartbeat').get(function (req, res) {
    console.log('me llego un heartbeat request - respondo ok');
    res.json({status: 'ok'})
});

//cualquier otra ruta
app.all('*', function (req, res) {
    console.log(`[${serverName}] - Recibí un request de tipo ${req.method} de ${req.ip}`);
    setTimeout(function() {
        res.send(`Saludos desde ${serverName}, son las ${(new Date().toString())}`);
    }, delay);
});


app.listen(listenPort, function () {
  console.log(`[${serverName}] - Escuchando en ${listenPort}!`);
}).on('error', function(err) {
    if (err.errno === 'EADDRINUSE')
        console.log('Puerto ocupado '+listenPort);
    else
        console.log(err);
});