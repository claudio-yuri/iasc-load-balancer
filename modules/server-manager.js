
//esta clase se encarga de controlar el listado de servidores
//la idea es manejar la lista de servidores como una queue para lograr un comportamiento tipo round robin
class ServerManager{
    constructor(serverList){
        this._serverList = serverList.map(x => { 
            return { host: x, online: true, lastAccess: new Date().getTime() };
        });
    }
    //devuelve el host del primer servidor online
    getServer(){
        //busco el primer servidor online
        var srv = this._serverList.filter(x => x.online).shift();
        if(srv != null){
            //lo saco de la lista
            var pos = this._serverList.indexOf(srv);
            this._serverList.splice(pos, 1);
            
            //actualizo la fecha de último acceso
            srv.lastAccess = new Date().getTime();
            //lo mando al final de la cola
            this._serverList.push(srv);
            
            return srv.host;
        } else {
            //TODO: tirar exception
        }
    }
    //poner offline un server
    setServerOffline(host){
        var servOff = this._serverList.filter(x => x.host == host);
        if(servOff != null && servOff.length > 0){
            var pos = this._serverList.indexOf(servOff[0]);
            this._serverList[pos].online = false;
        }
    }
    //poner online un server
    setServerOnline(host){
        var servOff = this._serverList.filter(x => x.host == host);
        if(servOff != null && servOff.length > 0){
            var pos = this._serverList.indexOf(servOff[0]);
            this._serverList[pos].online = true;
        }
    }
}

module.exports = ServerManager;