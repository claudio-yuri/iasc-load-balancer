//esta clase se encarga de controlar el listado de servidores
//la idea es manejar la lista de servidores como una queue para lograr un comportamiento tipo round robin
class ServerManager{
    constructor(serverList, timeout){
        this._serverList = serverList;
        this._serverAltList = {};
        this._serverStatus = {};
        for (var pos in serverList){
            this._serverStatus[serverList[pos]] = true;
        }
        this._offlineList = [];
        this._timeout = timeout;
        this._nextPos = -1;         //para que empiece en 0
        this._nextPosAlt = -1;
    }
    getNext(pos, max){
        pos++;        //round robin
        if(pos >= max){
            pos = 0;
        }
        return pos;
    }
    getServer(url){
        var serverList, cont = 0, result = null, max, pos;

        //si hay una lista de servers para el request de url
        if (this._serverAltList[url] != null){
            serverList = this._serverAltList[url];
            pos = this._nextPosAlt;
        }
        else{
            serverList = this._serverList;
            pos = this._nextPos;
        }

        max = serverList.length;

        while (cont < max){
            pos = this.getNext(pos, max);
            if(this.isServerOnline(serverList[pos])){
                result = serverList[pos];
                break;
            }
            cont++;
        }
        return result;
    }
    addServers(serverList, url){
        this._serverAltList[url] = serverList;
    }
    //devuelve true si el server está online
    isServerOnline(host) {
        return this._serverStatus[host];
    }

    //poner online un server
    setServerOnline(host){
        // console.debug(host + " online");
        this._serverStatus[host] = true;
    }
    //poner offline un server
    setServerOffline(host){
        // console.debug(host + " offline");
        this._serverStatus[host] = false;
        var _this = this;
        setTimeout(function() {
            _this.setServerOnline(host);       
        }, this._timeout * 1000);
    }
}

module.exports = ServerManager;