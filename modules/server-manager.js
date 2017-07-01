/**
 * esta clase se encarga de controlar el listado de servidores
 *   la idea es manejar la lista de servidores como una queue para lograr un comportamiento tipo round robin
 */
class ServerManager{
    /**
     * Contructor del server manager
     * @param {Array[String]} serverList La lista de servidores disponibles
     * @param {Number} timeout segundos que tarda un server en volver a ser considerado online
     * @param {Array[Object]} customRequests un mapeo de url => servidores para ruteos especiales
     */
    constructor(serverList, timeout, customRequests){
        this._serverList = serverList;
        this._serverAltList = {};
        //agrego los mapeos alternativos
        if(customRequests.length > 0){
            for(var pCR in customRequests){
                this.addServers(customRequests[pCR].servers, customRequests[pCR].url);
            }
        }
        this._serverStatus = {};
        //por defecto todos los servers online
        for (var pos in serverList){
            this._serverStatus[serverList[pos]] = true;
        }
        this._offlineList = [];
        this._timeout = timeout;
        this._nextPos = -1;         //para que empiece en 0
        this._nextPosAlt = -1;
    }
    /**
     * Devuelve la posición del próximo server de la lista
     * @param {number} pos 
     * @param {number} max 
     * @param {bool} useAltPos 
     */
    getNext(pos, max, useAltPos){
        pos++;        //round robin
        if(pos >= max){
            pos = 0;
        }
        if(useAltPos){
            this._nextPosAlt = pos;
        }
        else{
            this._nextPos = pos;
        }
        return pos;
    }
    /**
     * Devuelve la url del servidor al que se va a hacer el request
     * @param {string} url 
     */
    getServer(url){
        var serverList, cont = 0, result = null, max, pos, useAltPos = false;

        //si hay una lista de servers para el request de url
        if (this._serverAltList[url] != null){
            serverList = this._serverAltList[url];
            pos = this._nextPosAlt;
            useAltPos = true;
        }
        else{
            serverList = this._serverList;
            pos = this._nextPos;
        }

        max = serverList.length;
        while (cont < max){
            pos = this.getNext(pos, max, useAltPos);
            if(this.isServerOnline(serverList[pos])){
                result = serverList[pos];
                break;
            }
            cont++;
        }
        return result;
    }
    /**
     * Agrega servidores con mapeo especial
     * @param {Array} serverList 
     * @param {string} url 
     */
    addServers(serverList, url){
        this._serverAltList[url] = serverList;
    }
    /**
     * devuelve true si el server está online
     * @param {string} host 
     */
    isServerOnline(host) {
        return this._serverStatus[host];
    }
    /**
     * poner online un server
     * @param {string} host 
     */
    setServerOnline(host){
        this._serverStatus[host] = true;
    }
    /**
     * poner offline un server
     * @param {string} host 
     */
    setServerOffline(host){
        this._serverStatus[host] = false;
        var _this = this;
        setTimeout(function() {
            _this.setServerOnline(host);       
        }, this._timeout * 1000);
    }
}

module.exports = ServerManager;