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
ab -n 1000 -c 100 http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        104 bytes

Concurrency Level:      100
Time taken for tests:   1.828 seconds
Complete requests:      1000
Failed requests:        56
   (Connect: 0, Receive: 0, Length: 56, Exceptions: 0)
Total transferred:      304944 bytes
HTML transferred:       103944 bytes
Requests per second:    547.02 [#/sec] (mean)
Time per request:       182.808 [ms] (mean)
Time per request:       1.828 [ms] (mean, across all concurrent requests)
Transfer rate:          162.90 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   2.8      0      63
Processing:     6  151 239.1     94    1821
Waiting:        3  104 238.3     54    1814
Total:          7  152 239.5     94    1821

Percentage of the requests served within a certain time (ms)
  50%     94
  66%    109
  75%    126
  80%    135
  90%    174
  95%    446
  98%    847
  99%   1673
 100%   1821 (longest request)
```
### Cluster configuración 2:
* 3 servers (2 levantados, 1 caído)
* 1 segundos de exclusión para servidor caído
```
ab -n 1000 -c 100 http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        103 bytes

Concurrency Level:      100
Time taken for tests:   1.742 seconds
Complete requests:      1000
Failed requests:        884
   (Connect: 0, Receive: 0, Length: 884, Exceptions: 0)
Total transferred:      304586 bytes
HTML transferred:       103586 bytes
Requests per second:    573.91 [#/sec] (mean)
Time per request:       174.244 [ms] (mean)
Time per request:       1.742 [ms] (mean, across all concurrent requests)
Transfer rate:          170.71 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0      10
Processing:     6  145 181.2    105    1736
Waiting:        3   96 178.6     59    1708
Total:          6  146 181.2    106    1736

Percentage of the requests served within a certain time (ms)
  50%    106
  66%    113
  75%    118
  80%    122
  90%    216
  95%    406
  98%    743
  99%   1413
 100%   1736 (longest request)
```

### Cluster configuración 3:
* 3 servers (2 levantados, 1 caído)
* 5 segundos de exclusión para servidor caído
```
ab -n 1000 -c 100 http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        103 bytes

Concurrency Level:      100
Time taken for tests:   1.151 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      304000 bytes
HTML transferred:       103000 bytes
Requests per second:    868.91 [#/sec] (mean)
Time per request:       115.087 [ms] (mean)
Time per request:       1.151 [ms] (mean, across all concurrent requests)
Transfer rate:          257.96 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0       4
Processing:     7  106  29.9    109     243
Waiting:        3   56  32.2     54     143
Total:          7  106  29.9    109     243

Percentage of the requests served within a certain time (ms)
  50%    109
  66%    116
  75%    122
  80%    125
  90%    129
  95%    134
  98%    185
  99%    217
 100%    243 (longest request)
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
ab -n 1000 -c 100 http://localhost:3005/

Server Software:        nginx/1.4.6
Server Hostname:        localhost
Server Port:            3005

Document Path:          /
Document Length:        94 bytes

Concurrency Level:      100
Time taken for tests:   2.479 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      324000 bytes
HTML transferred:       94000 bytes
Requests per second:    403.39 [#/sec] (mean)
Time per request:       247.898 [ms] (mean)
Time per request:       2.479 [ms] (mean, across all concurrent requests)
Transfer rate:          127.64 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.6      0       7
Processing:    10  243 293.4    147    1365
Waiting:        6  181 301.5     89    1225
Total:         10  244 293.3    148    1365
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%    148
  66%    152
  75%    155
  80%    162
  90%   1006
  95%   1106
  98%   1173
  99%   1187
 100%   1365 (longest request)
```
### Nginx configuración 2:
* 5 servers (3 levantados, 2 caídos)
```
ab -n 1000 -c 100 http://localhost:3005/

Server Software:        nginx/1.4.6
Server Hostname:        localhost
Server Port:            3005

Document Path:          /
Document Length:        94 bytes

Concurrency Level:      100
Time taken for tests:   3.464 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      324000 bytes
HTML transferred:       94000 bytes
Requests per second:    288.66 [#/sec] (mean)
Time per request:       346.426 [ms] (mean)
Time per request:       3.464 [ms] (mean, across all concurrent requests)
Transfer rate:          91.33 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.5      0       5
Processing:     8  342 601.8    140    2707
Waiting:        4  284 611.1     87    2620
Total:          9  342 601.7    141    2707
ERROR: The median and mean for the initial connection time are more than twice the standard
       deviation apart. These results are NOT reliable.

Percentage of the requests served within a certain time (ms)
  50%    141
  66%    145
  75%    149
  80%    171
  90%   1149
  95%   2113
  98%   2172
  99%   2205
 100%   2707 (longest request)
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
ab -n 1000 -c 100 http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        103 bytes

Concurrency Level:      100
Time taken for tests:   1.801 seconds
Complete requests:      1000
Failed requests:        5
   (Connect: 0, Receive: 0, Length: 5, Exceptions: 0)
Total transferred:      304005 bytes
HTML transferred:       103005 bytes
Requests per second:    555.17 [#/sec] (mean)
Time per request:       180.124 [ms] (mean)
Time per request:       1.801 [ms] (mean, across all concurrent requests)
Transfer rate:          164.82 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.9      0      43
Processing:     7  141 110.0    115     864
Waiting:        3   87 105.8     65     746
Total:          7  141 110.2    116     864

Percentage of the requests served within a certain time (ms)
  50%    116
  66%    128
  75%    134
  80%    150
  90%    194
  95%    392
  98%    609
  99%    724
 100%    864 (longest request)
```

### Nginx configuración 1:
* 1 server de pasamanos
```
ab -n 1000 -c 100 http://localhost:3005/

Server Software:        nginx/1.4.6
Server Hostname:        localhost
Server Port:            3005

Document Path:          /
Document Length:        94 bytes

Concurrency Level:      100
Time taken for tests:   1.355 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      324000 bytes
HTML transferred:       94000 bytes
Requests per second:    737.98 [#/sec] (mean)
Time per request:       135.505 [ms] (mean)
Time per request:       1.355 [ms] (mean, across all concurrent requests)
Transfer rate:          233.50 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.6      0       6
Processing:     9  127  37.3    125     257
Waiting:        5   71  35.8     71     142
Total:          9  128  37.3    126     258
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%    126
  66%    129
  75%    132
  80%    134
  90%    158
  95%    227
  98%    239
  99%    247
 100%    258 (longest request)
```
### Server destino:
* Server directo, sin pasamanos
```
ab -n 1000 -c 100 http://localhost:3100/

Server Software:
Server Hostname:        localhost
Server Port:            3100

Document Path:          /
Document Length:        94 bytes

Concurrency Level:      100
Time taken for tests:   0.801 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      294000 bytes
HTML transferred:       94000 bytes
Requests per second:    1247.92 [#/sec] (mean)
Time per request:       80.133 [ms] (mean)
Time per request:       0.801 [ms] (mean, across all concurrent requests)
Transfer rate:          358.29 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       3
Processing:    16   76  21.8     77     157
Waiting:        3   43  19.9     42      83
Total:         16   76  21.8     77     157

Percentage of the requests served within a certain time (ms)
  50%     77
  66%     79
  75%     81
  80%     82
  90%    110
  95%    126
  98%    136
  99%    139
 100%    157 (longest request)
```

Como podemos ver, existe una diferencia a favor de nginx de 1/2 segundo.
Agregando 1 segundo usando nuestro load balancer y 0.554 segundos
usando ngnix, con respecto al request al server destino sin intermediarios.