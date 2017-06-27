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
### Cluster configuración 1:
* 3 servers (2 levantados, 1 caído)
* 0 segundos de exclusión (sin exclusión) para servidor caído
```
ab -n 1000 -c 100 -l http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   1.091 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      279000 bytes
HTML transferred:       79000 bytes
Requests per second:    916.88 [#/sec] (mean)
Time per request:       109.065 [ms] (mean)
Time per request:       1.091 [ms] (mean, across all concurrent requests)
Transfer rate:          249.81 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.3      0       8
Processing:    33  107 154.4     55     630
Waiting:       33  106 154.3     55     630
Total:         33  107 155.4     55     636

Percentage of the requests served within a certain time (ms)
  50%     55
  66%     60
  75%     64
  80%     69
  90%    523
  95%    568
  98%    600
  99%    607
 100%    636 (longest request)

```
### Cluster configuración 2:
* 3 servers (2 levantados, 1 caído)
* 1 segundos de exclusión para servidor caído
```
ab -n 1000 -c 100 -l http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   0.653 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      280000 bytes
HTML transferred:       80000 bytes
Requests per second:    1531.53 [#/sec] (mean)
Time per request:       65.294 [ms] (mean)
Time per request:       0.653 [ms] (mean, across all concurrent requests)
Transfer rate:          418.78 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0       5
Processing:    29   63  34.5     54     202
Waiting:       29   62  34.4     54     202
Total:         29   63  35.1     54     204

Percentage of the requests served within a certain time (ms)
  50%     54
  66%     61
  75%     65
  80%     71
  90%    110
  95%    159
  98%    174
  99%    182
 100%    204 (longest request)

```

### Cluster configuración 3:
* 3 servers (2 levantados, 1 caído)
* 5 segundos de exclusión para servidor caído
```
ab -n 1000 -c 100 -l http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   0.657 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      280000 bytes
HTML transferred:       80000 bytes
Requests per second:    1522.04 [#/sec] (mean)
Time per request:       65.701 [ms] (mean)
Time per request:       0.657 [ms] (mean, across all concurrent requests)
Transfer rate:          416.18 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.6      0       6
Processing:    34   63  28.6     57     170
Waiting:       34   63  28.5     57     170
Total:         34   64  29.0     57     173

Percentage of the requests served within a certain time (ms)
  50%     57
  66%     64
  75%     67
  80%     70
  90%     99
  95%    145
  98%    162
  99%    167
 100%    173 (longest request)


```
### Cluster configuración 4:
* 5 servers (3 levantados, 2 caídos)
* 10 segundos de exclusión para servidor caído
```
ab -n 1000 -c 100 http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        103 bytes

Concurrency Level:      100
Time taken for tests:   2.637 seconds
Complete requests:      1000
Failed requests:        202
   (Connect: 0, Receive: 0, Length: 202, Exceptions: 0)
Total transferred:      304128 bytes
HTML transferred:       103128 bytes
Requests per second:    379.17 [#/sec] (mean)
Time per request:       263.733 [ms] (mean)
Time per request:       2.637 [ms] (mean, across all concurrent requests)
Transfer rate:          112.61 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   2.2      0      38
Processing:     6  158 316.5     67    2633
Waiting:        2  119 308.7     38    2631
Total:          6  158 317.0     67    2633

Percentage of the requests served within a certain time (ms)
  50%     67
  66%     80
  75%     86
  80%    101
  90%    210
  95%    682
  98%   1565
  99%   1764
 100%   2633 (longest request)
```

### Nginx configuración 1:
* 3 servers (2 levantados, 1 caído)
```
ab -n 1000 -c 100 -l http://localhost:3005/

Server Software:        nginx/1.10.0
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   0.260 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      301000 bytes
HTML transferred:       70000 bytes
Requests per second:    3850.54 [#/sec] (mean)
Time per request:       25.970 [ms] (mean)
Time per request:       0.260 [ms] (mean, across all concurrent requests)
Transfer rate:          1131.85 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.5      0       8
Processing:     3   24  14.4     22      63
Waiting:        3   24  14.4     22      63
Total:          3   25  14.5     23      64

Percentage of the requests served within a certain time (ms)
  50%     23
  66%     33
  75%     35
  80%     36
  90%     45
  95%     49
  98%     58
  99%     63
 100%     64 (longest request)

```
### Nginx configuración 2:
* 5 servers (3 levantados, 2 caídos)
```
Server Software:        nginx/1.10.0
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   0.252 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      301000 bytes
HTML transferred:       70000 bytes
Requests per second:    3968.08 [#/sec] (mean)
Time per request:       25.201 [ms] (mean)
Time per request:       0.252 [ms] (mean, across all concurrent requests)
Transfer rate:          1166.40 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.8      0       8
Processing:     1   23  22.3     10      77
Waiting:        1   23  22.4      9      77
Total:          1   24  22.3     12      77

Percentage of the requests served within a certain time (ms)
  50%     12
  66%     30
  75%     48
  80%     51
  90%     55
  95%     63
  98%     68
  99%     74
 100%     77 (longest request)

```
Como se observa, al contrario del escenario 1, 
nuestra solución tiene un tiempo de respuesta mayor que nginx, 
ya que en nuestra solución se puede configurar el tiempo que se desea excluir
el servidor caído y a medida que aumentamos el tiempo a exclusión se obtiene
un mejor tiempo de respuesta.


## Escenario 3: 1 solo servidor destino

El objetivo de esta prueba es comparar como se comportan ambos software's con un solo servidor de destino, o sea, como un simple pasamanos.

Con esto vamos a poder ver cuánto tiempo de procesamiento se agregra para realizar esta operación.
### Cluster configuración 1:
* 1 server de pasamanos
```
ab -n 1000 -c 100 -l http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   0.668 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      280000 bytes
HTML transferred:       80000 bytes
Requests per second:    1496.61 [#/sec] (mean)
Time per request:       66.818 [ms] (mean)
Time per request:       0.668 [ms] (mean, across all concurrent requests)
Transfer rate:          409.23 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0       5
Processing:    32   65  35.6     56     201
Waiting:       32   64  35.6     56     201
Total:         32   65  36.2     56     202

Percentage of the requests served within a certain time (ms)
  50%     56
  66%     61
  75%     65
  80%     67
  90%    138
  95%    166
  98%    186
  99%    194
 100%    202 (longest request)

```

### Nginx configuración 1:
* 1 server de pasamanos
```
ab -n 1000 -c 100 -l http://localhost:3005/

Server Software:        nginx/1.10.0
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   0.394 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      301000 bytes
HTML transferred:       70000 bytes
Requests per second:    2538.39 [#/sec] (mean)
Time per request:       39.395 [ms] (mean)
Time per request:       0.394 [ms] (mean, across all concurrent requests)
Transfer rate:          746.15 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.6      0       3
Processing:    27   38   6.7     38      64
Waiting:       27   38   6.7     38      64
Total:         27   38   6.9     38      65

Percentage of the requests served within a certain time (ms)
  50%     38
  66%     43
  75%     44
  80%     45
  90%     47
  95%     48
  98%     51
  99%     56
 100%     65 (longest request)

```
### Server destino:
* Server directo, sin pasamanos
```
ab -n 1000 -c 100 -l http://localhost:3100/

Document Path:          /
Document Length:        Variable

Concurrency Level:      100
Time taken for tests:   0.314 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      270000 bytes
HTML transferred:       70000 bytes
Requests per second:    3180.60 [#/sec] (mean)
Time per request:       31.441 [ms] (mean)
Time per request:       0.314 [ms] (mean, across all concurrent requests)
Transfer rate:          838.63 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.4      1       2
Processing:    14   30   6.2     29      46
Waiting:        9   26   6.2     26      46
Total:         17   31   6.0     30      46

Percentage of the requests served within a certain time (ms)
  50%     30
  66%     31
  75%     31
  80%     32
  90%     45
  95%     46
  98%     46
  99%     46
 100%     46 (longest request)

```

Como podemos ver, existe una diferencia a favor de nginx de 27,423 ms en el tiempo medio por request.
Agregando 39,395 micro segundos usando nuestro load balancer y 7,954 microsegundos
usando ngnix, con respecto al request al server destino sin intermediarios.
