# Primeras pruebas
Resultados sin cluster (sin output por pantalla):
```
Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        67 bytes

Concurrency Level:      100
Time taken for tests:   4.295 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      267000 bytes
HTML transferred:       67000 bytes
Requests per second:    232.82 [#/sec] (mean)
Time per request:       429.514 [ms] (mean)
Time per request:       4.295 [ms] (mean, across all concurrent requests)
Transfer rate:          60.71 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       6
Processing:   172  417 107.3    406     745
Waiting:      169  416 107.9    404     745
Total:        172  417 107.2    406     745

Percentage of the requests served within a certain time (ms)
  50%    406
  66%    446
  75%    474
  80%    494
  90%    568
  95%    635
  98%    691
  99%    708
 100%    745 (longest request)
```
Resultados con cluster:
* sin output por pantalla
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
Como conclusión, podemos decir que con cluster los requests tienden a tardar lo mismo (se aprecia en el menor desvío standard). En cuanto a tiempos son más o menos similares.

Además probamos una arquitectura un poco más compleja: solo el nodo master se encargaba de mantener el listado de servidores y los clientes debían pedirle (por medio de IPC) al master cuál era el servidor al que debían hacer el request. Esto generaba mayor latencia e incluso algunos errores bastante frecuentes (tasas de error de más del 50%).

Con un cache de 