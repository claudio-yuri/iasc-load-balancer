# iasc-load-balancer
TP Cuatrimestral de la materia Implementación de Arquitecturas Concurrentes

## Miembros
* Tomás Milar
* Juan Pablo de Blass
* Marcos Paulucci
* Claudio Yuri
* Hernán Micelotta

## Consigna
[Link](https://docs.google.com/document/d/1hGKI62Sm0U0BmGuITR31SfEJEYz6LRKKzl7ptXFOrxA/pub)

## Sobre la solución
Decidimos usar nodejs por un tema de familiaridad con el código.

La solución cuenta con un proceso master que levanta tantos procesos workers como CPUs haya disponibles en la computadora donde se corra. Cada uno de estos workers mantiene una lista de servidores disponibles a los cuáles dirigir los requests entrantes.

## Como usarlo

### Load Balancer
Se corre con el comando 
```bash
$ nodejs index.js # versión mono proceso
$ nodejs cluster.js # versión multi proceso
```

### Mock Servers
Se corre con el comando 
```bash
$ nodejs mock_server.js --port NUMERODEPUERTO --delay ENMILISEGUNDOS --name NOMBREDELSERVER
```
### Supervisor
Opcionalmente se puede usar un heartbeat para monitorear los mock servers,
permitiendo que si se caen uno o más servers se marquen como offline para evitar request a servers caídos.
 Cuando el servidor se normaliza se vuelve a poner online para volver a recibir tráfico.
 
 Para registrar el heartbeat, con el load balancer levantado abrir un navegador e ingresar: 
 ```
http://localhost:3000/register
```

### Requisitos
Tener redis corriendo en el servidor donde se despliegue el load balancer

### Cómo lo levanto

Revisás en archivo `config.json`

Ahí vás a ver algo parecido a esto:
``` javascript
{
    "listenPort": 3000,
    "serverTimeout": 10, 
    "serverExclusionTime": 10, //tiempo en segundos que se va a exlcuir a un servidor de la lista
                               //luego de ese tiempo, se lo volverá a considerar para enviarle requests
    "maxRetryCount": 3, //cantidad de retries máximo por request
    "debug": true, //define si muestra o no informaición en la consola
    "cacheTimeout": 10, //duración de la información en caché
    "serverList": [ //esta es la lista de servidores
        "http://localhost:3100",
        "http://localhost:3200",
        "http://localhost:3300"        
    ],
    "heartbeat":{
      "executionInterval":10
    }
}
```

Luego, abrís varias consolas y vas levantando los mock server de la siguiente manera:

``` bash
# consola 1
$ nodejs mock_server.js -p 3100
# consola 2
$ nodejs mock_server.js -p 3200
# consola 3
$ nodejs mock_server.js -p 3300
```
Finalmente, abrimos una consola más y levanamos el load balancer
``` bash
$ nodejs cluster.js
```

Ahora podemos abrir un navegador e intentar ingresar a la url donde está nuestro load balancer: `http://localhost:3000`.


### Pruebas con apache bench
Ejemplo de prueba
```bash
# usamos '-l' porque el contenido es dinámico y si no lo usamos ab interpreta el reqeust como fallido
$ ab -n 1000 -c 100 -l http://localhost:3000/
```

