# Pruebas
## Escenario 1: todos los servidores funcionado
El objetivo de las pruebas a realizar en este primer escenario apuntan a ver como se comporta nuestra solución contra nginx en un escenario ideal: todos los servidores funcionado.

Además, se medirá como impactan en el rendimiento la modificación de **la cantidad de servidores** y **el tiempo de validez del caché** con el fin de buscar una configuración óptima.

### Cluster Configuración 1:
* 3 servidores
* 10 segundos de caché
```
Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   3.710 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      276000 bytes
HTML transferred:       76000 bytes
Requests per second:    269.51 [#/sec] (mean)
Time per request:       371.046 [ms] (mean)
Time per request:       3.710 [ms] (mean, across all concurrent requests)
Transfer rate:          72.64 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.7      0       8
Processing:   115  359 487.3    211    1959
Waiting:      111  355 487.7    205    1958
Total:        115  360 487.2    212    1959

Percentage of the requests served within a certain time (ms)
  50%    212
  66%    233
  75%    251
  80%    257
  90%   1702
  95%   1818
  98%   1856
  99%   1863
 100%   1959 (longest request)
```
### Cluster Configuración 2:
* 5 servidores
* 10 segundos de caché
```
Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   2.703 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      276000 bytes
HTML transferred:       76000 bytes
Requests per second:    369.98 [#/sec] (mean)
Time per request:       270.283 [ms] (mean)
Time per request:       2.703 [ms] (mean, across all concurrent requests)
Transfer rate:          99.72 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.0      0      13
Processing:    91  256 182.2    198     866
Waiting:       90  252 182.6    193     863
Total:         92  256 182.1    198     866

Percentage of the requests served within a certain time (ms)
  50%    198
  66%    221
  75%    236
  80%    283
  90%    665
  95%    790
  98%    821
  99%    835
 100%    866 (longest request)
```
### Cluster Configuración 3
* 3 servidores
* 30 segundos de cache
```
Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   2.218 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      276000 bytes
HTML transferred:       76000 bytes
Requests per second:    450.79 [#/sec] (mean)
Time per request:       221.834 [ms] (mean)
Time per request:       2.218 [ms] (mean, across all concurrent requests)
Transfer rate:          121.50 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0       9
Processing:    85  207 114.8    177     609
Waiting:       85  202 114.5    174     605
Total:         86  207 114.7    177     610

Percentage of the requests served within a certain time (ms)
  50%    177
  66%    196
  75%    210
  80%    219
  90%    446
  95%    536
  98%    564
  99%    574
 100%    610 (longest request)
```
### Cluster Configuración 4:
* 5 servers
* 10 segundos de cache
* 8 procesos
```
Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   1.642 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      276000 bytes
HTML transferred:       76000 bytes
Requests per second:    609.13 [#/sec] (mean)
Time per request:       164.167 [ms] (mean)
Time per request:       1.642 [ms] (mean, across all concurrent requests)
Transfer rate:          164.18 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.0      0       9
Processing:    75  155  36.4    152     282
Waiting:       57  145  34.9    142     276
Total:         75  156  36.4    153     282

Percentage of the requests served within a certain time (ms)
  50%    153
  66%    169
  75%    177
  80%    183
  90%    202
  95%    225
  98%    240
  99%    257
 100%    282 (longest request)
```
### Nginx configuración 1:
* 3 servers
```
Server Software:        nginx/1.10.0
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   1.759 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      298000 bytes
HTML transferred:       67000 bytes
Requests per second:    568.35 [#/sec] (mean)
Time per request:       175.946 [ms] (mean)
Time per request:       1.759 [ms] (mean, across all concurrent requests)
Transfer rate:          165.40 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0      10
Processing:    11  164  64.2    151     342
Waiting:       10  111  61.9    105     287
Total:         14  164  64.1    151     342

Percentage of the requests served within a certain time (ms)
  50%    151
  66%    185
  75%    202
  80%    222
  90%    249
  95%    294
  98%    311
  99%    332
 100%    342 (longest request)
```

### Nginx configuración 2:
* 5 servers
```
Server Software:        nginx/1.10.0
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   1.950 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      298000 bytes
HTML transferred:       67000 bytes
Requests per second:    512.88 [#/sec] (mean)
Time per request:       194.977 [ms] (mean)
Time per request:       1.950 [ms] (mean, across all concurrent requests)
Transfer rate:          149.26 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.7      0       7
Processing:     4  185 161.8    127     659
Waiting:        4  168 159.9     96     630
Total:          5  185 161.8    127     660
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%    127
  66%    256
  75%    318
  80%    348
  90%    432
  95%    489
  98%    529
  99%    565
 100%    660 (longest request)
```

Como conclusión, podemos decir nuestra solución tiende a ser un poco más lenta que nginx. 

Al aumentar la cantidad de procesos que se deployan con cluster, baja considerablemente el tiempo de respuesta promedio y es en ese contexto en el que llegamos a tiempos similares a los de nginx.

El principal factor que incide en el rendimiento de nuestra solución es el cache de requests implementado con redis. Y en segundo lugar tenemos la cantidad de procesos que atienden requests definidos con cluster.

## Escenario 2: 3 servidores con 1 caído

El objetivo de esta prueba es ver como se comporta nuestra solución frente a nginx cuando uno de los servidores configurados no responde.
> TODO

## Escenario 3: 1 solo servidor destino

El objetivo de esta prueba es comparar como se comportan ambos softwares con un solo servidore de destino, o sea, como un simple pasamanos.

Con esto vamos a poder ver cuánto tiempo de procesamiento se agregra para realizar esta operación.
> TODO