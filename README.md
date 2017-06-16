# iasc-load-balancer
TP Cuatrimestral de la materia Implementación de Arquitecturas Concurrentes

## Miembros
* Tomás Milar
* Juan Pablo de Blass
* Marcos Paulucci
* Claudio Yuri

## Consigna
[Link](https://docs.google.com/document/d/1hGKI62Sm0U0BmGuITR31SfEJEYz6LRKKzl7ptXFOrxA/pub)

## Sobre la solución
Decidimos usar nodejs por un tema de familiaridad con el código.

La solución cuenta con un proceso master que levanta tantos procesos workers como CPUs haya disponibles en la computadora donde se corra. Cada uno de estos workers mantiene una lista de servidores disponibles a los cuáles dirigir los requests entrantes.

## Como usarlo

### Load Balancer
Se corre con el comando 
```bash
$ nodejs index.js
```

### Mock Servers
Se corre con el comando 
```bash
$ nodejs mock_server.js --port NUMERODEPUERTO --delay ENMILISEGUNDOS --name NOMBREDELSERVER
```

### Cómo lo levanto

Revisás en archivo `config.json`

Ahí vás a ver algo parecido a esto:
``` javascript
{
    "listenPort": 3000,
    "serverTimeout": 60,
    "serverExclusionTime": 120,
    "serverList": [ //esta es la lista de servidores
        "http://localhost:3100",
        "http://localhost:3200",
        "http://localhost:3300"        
    ]
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
$ nodejs index.js
```

Ahora podemos abrir un navegador e intentar ingresar a la url donde está nuestro load balancer: `http://localhost:3000`.