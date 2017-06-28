//esta clase se encarga de controlar el listado de servidores
//la idea es manejar la lista de servidores como una queue para lograr un comportamiento tipo round robin
class ServerManager{
    constructor(serverList, timeout){
        this._serverList = serverList;
        this._serverStatus = {};
        for (var pos in serverList){
            this._serverStatus[serverList[pos]] = true;
        }
        this._offlineList = [];
        this._timeout = timeout;
        this._nextPos = 0;
    }
    getNextPos(){
        this._nextPos++;
        if(this._nextPos >= this._serverList.length){
            this._nextPos = 0;
        }
        return this._nextPos;
    }
    getServer(){
        var max = this._serverList.length;
        var cont = 0;
        var result = null;
        while (cont < max){
            var pos = this.getNextPos();
            if(this.isServerOnline(this._serverList[pos])){
                result = this._serverList[pos];
                break;
            }
            cont++;
        }
        return result;
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