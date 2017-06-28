//esta clase se encarga de supervisar el listado de servidores para evitar request a servers caídos
//envía un heartbeat a los servidores
//si alguno deja de responder lo marca como offline
//si esta marcado como offline y responde lo marca como online

module.exports = function(serverManager, config) {
    var serverManager = serverManager;
    const Client = require('node-rest-client').Client;

    var express = require('express');
    var schedule = require('node-schedule');

    // var app = express();

    // //levanto el servidor
    // app.listen(config.listenPort, () => {
    //     console.log(`Se levanta el server supervisor`);
    //     console.log(`Escuchando en ${config.heartbeat.port}`);
    // }).on('error', function (err) {
    //     if (err.errno === 'EADDRINUSE')
    //         console.log('Puerto ocupado '+config.listenPort);
    //     else
    //         console.log(err);
    // });

    var interval = config.heartbeat.executionInterval | 10;

    schedule.scheduleJob('*/' + interval + ' * * * * *', function () {
        console.log("Se envian los heartbeat a los servers");
        var servers = config.serverList
        for (var n in servers) {
            console.log("Enviando Hearthbeat al servidor: " + servers[n]);
            sendRequest(servers[n]);
        }
    });

    function sendRequest(theHost) {
        var client = new Client();

        //llamo a algún servidor externo
        var r_req = client.get(theHost+"/heartbeat", {responseConfig: {timeout: 1000}}, (data, response) => {

            //si respondio y estaba offline lo marco online
            if(!serverManager.isServerOnline(theHost)) {

                serverManager.setServerOnline(theHost);
                console.log(theHost + " ahora está online");
            }

            console.log(theHost + " Respuesta: " + data.status);
        });

        r_req.on('error', (err) => {
            console.log(theHost + ' ' + err);
            //si dio error lo pongo offline
            serverManager.setServerOffline(theHost);
            console.log(theHost + " ahora está offline");
        });

        r_req.on('requestTimeout', function (req) {
            console.log('requestTimeout: ' + theHost);
            serverManager.setServerOffline(theHost);
        });

        r_req.on('responseTimeout', function (req) {
            console.log('responseTimeout: ' + theHost);
            serverManager.setServerOffline(theHost);
        });
    }

}
