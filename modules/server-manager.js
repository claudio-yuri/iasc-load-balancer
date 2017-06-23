var redis = require("redis");

//esta clase se encarga de controlar el listado de servidores
//la idea es manejar la lista de servidores como una queue para lograr un comportamiento tipo round robin
class ServerManager{
    constructor(serverList){
        // this._redisClient = redis.createClient();
        this._serverList = serverList;/*.map(x => { 
            // this._redisClient.rpush("server_list", x);
            return { x };
        });*/
        this._offlineList = [];
    }
    //devuelve el host del primer servidor online
    // getServer(){
    //     //busco el primer servidor online
    //     var srv = this._serverList.filter(x => x.online).shift();
    //     if(srv != null){
    //         //lo saco de la lista
    //         var pos = this._serverList.indexOf(srv);
    //         this._serverList.splice(pos, 1);
            
    //         //actualizo la fecha de último acceso
    //         srv.lastAccess = new Date().getTime();
    //         //lo mando al final de la cola
    //         this._serverList.push(srv);
            
    //         return srv.host;
    //     } else {
    //         //TODO: tirar exception
    //     }
    // }
    getServer(){
        //busco el primer servidor online
        // var srv = this._serverList.filter(x => x.online).shift();
        var srv = this._serverList.shift();
        if(srv != null){
            //lo saco de la lista
            // var pos = this._serverList.indexOf(srv);
            // this._serverList.splice(pos, 1);
            
            //actualizo la fecha de último acceso
            // srv.lastAccess = new Date().getTime();
            //lo mando al final de la cola
            this._serverList.push(srv);
            
            return srv;
        } else {
            console.log("lalalaalalalallalalalala", this._offlineList.length);
            return null;
            //TODO: tirar exception
        }
    }
    //poner offline un server
    setServerOffline(host){
        // var servOff = this._serverList.filter(x => x.host == host);
        // if(servOff != null && servOff.length > 0){
        //     var pos = this._serverList.indexOf(servOff[0]);
        //     this._serverList[pos].online = false;
        // }
        if(this._offlineList.indexOf(host) == -1) this._offlineList.push(host);
        var pos = this._serverList.indexOf(host);
        this._serverList.splice(pos, 1);
    }
    //poner online un server
    setServerOnline(host){
        this._serverList.push(host);
        var pos = this._offlineList.indexOf(host);
        if(pos != -1){
            this._serverList.splice(pos, 1);
        }
    }
}

module.exports = ServerManager;