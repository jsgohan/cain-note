# nginx知识

Nginx——Ngine X，是一款自由的、开源的、高性能HTTP服务器和反向代理服务器；也是一个IMAP、POP3、SMTP代理服务器；也就是说Nginx本身就可以托管网站（类似于Tomcat一样），进行Http服务处理，也可以作为反向代理服务器使用。

Nginx 解决了服务器的 C10K（就是在一秒之内连接客户端的数目为10k即1万）问题。它的设计不像传统的服务器那样使用线程处理请求，而是一个更加高级的机制—事件驱动机制，是一种异步事件驱动结构。

虽然目前Nginx的份额在市场上只占很少部分，但是其高性能和低消耗内存的结构，使得其越来越普遍，典型的一个应用就是我们可以使用Nginx作为反向代理进行网站的负载均衡器。例如：Wordpress、GitHub等知名的网站都使用到了Nginx。

注：C10K问题可以参考： 
http://segmentfault.com/a/1190000000343620

http://www.csdn.net/article/2013-05-16/2815317-The-Secret-to-10M-Concurrent-Connections

## **正向代理和反向代理**

首先，代理服务器一般指局域网内部的机器通过代理服务器发送请求到互联网上的服务器，代理服务器一般作用在客户端。例如：GoAgent翻墙软件。我们的客户端在进行翻墙操作的时候，我们使用的正是正向代理，通过正向代理的方式，在我们的客户端运行一个软件，将我们的HTTP请求转发到其他不同的服务器端，实现请求的分发。

反向代理服务器作用在服务器端，它在服务器端接收客户端的请求，然后将请求分发给具体的服务器进行处理，然后再将服务器的相应结果反馈给客户端。Nginx就是一个反向代理服务器软件。

## **服务器的类型：**

1、Web服务器：提供Http的访问，例如Nginx、Apache、IIS等，虽然Tomcat也能够实现，但这并不是他的主要功能，而且性能也远不如专门的Web服务器； 
2、应用程序服务器：能够用于应用程序的运行； 
3、代理服务器：代理服务器通常是客户端访问的一种行为，在整个客户端访问服务器的过程中有着重要的作用； 
4、反向代理；
5、后台服务器；
6、CDN缓存服务器：它是缓存服务器的角色，而且是反向代理的应用，在网站部署的时候，他算是一种策略，对于远距离访问的解决方案。

## **Nginx的特点**

　　Ø 跨平台：可以在大多数Unix like 系统编译运行。而且也有Windows的移植版本。 
　　Ø 配置异常简单：非常的简单，易上手。 
　　Ø 非阻塞、高并发连接：数据复制时，磁盘I/O的第一阶段是非阻塞的。官方测试能支持5万并发连接，实际生产中能跑2~3万并发连接数（得益于Nginx采用了最新的epoll事件处理模型（消息队列）。 
　　Ø Nginx代理和后端Web服务器间无需长连接； 
　　Ø Nginx接收用户请求是异步的，即先将用户请求全部接收下来，再一次性发送到后端Web服务器，极大减轻后端Web服务器的压力。 
　　Ø 发送响应报文时，是边接收来自后端Web服务器的数据，边发送给客户端。 
　　Ø 网络依赖性低，理论上只要能够ping通就可以实施负载均衡，而且可以有效区分内网、外网流量。 
　　Ø 支持内置服务器检测。Nginx能够根据应用服务器处理页面返回的状态码、超时信息等检测服务器是否出现故障，并及时返回错误的请求重新提交到其它节点上。 
　　Ø 采用Master/worker多进程工作模式 
　　Ø 此外还有内存消耗小、成本低廉（比F5硬件负载均衡器廉价太多）、节省带宽、稳定性高等特点。

## **五、Nginx的基本功能**

Nginx的功能包括基本HTTP功能和扩展功能。和Apache服务器一样，Nginx服务器为了提供更多的功能并且能够有效地扩展这些功能。每一个模块都提供了一个功能，通过编译这些功能模块来实现功能的扩展。

1、基本HTTP功能

> a）提供静态文件和index文件，处理静态文件，索引文件以及自动索引，打开文件描述符缓存； 
>
> b）使用缓存加速反向代理，反向代理加速（无缓存），简单的负载均衡和容错； 
>
> c）使用缓存机制加速远程FastCGI，简单的负载均衡和容错； 
>
> d）模块化的结构。过滤器包括gzipping,byte ranges,chunked responses，以及 SSI-filter。在SSI过滤器中，到同一个 proxy 或者 FastCGI 的多个子请求并发处理； 
>
> e）支持SSL 和 TLS SNI 支持； 
>
> f）IMAP/POP3代理服务功能； 
>
> g）使用外部 HTTP 认证服务器重定向用户到 IMAP/POP3 后端；
>
>  h）使用外部 HTTP 认证服务器认证用户后连接重定向到内部的 SMTP 后端；

2、其他HTTP功能

> a）基于名称和基于IP的虚拟服务器；
>
>  b）支持Keep-alive和管道连接； 
>
> c）灵活的配置和重新配置、在线升级的时候不用中断客户访问的处理；
>
>  d）访问日志的格式，缓存日志写入和快速日志轮循； 
>
> e）3xx-5xx错误代码重定向；
>
>  f）速度限制

## **六、Nginx的基本模块**

Nginx的核心模块包括内核模块和事件驱动模块，即：**CoreModule**和**EventsModule**；另外还有第三方模块 HTTP内核模块，**HttpCoreModule**，它是Nginx服务器的核心模块。

CoreModule和EventsModule模块的配置相对于HttpCoreModule会少一些，但是它们的配置将会影响系统的性能，而非功能上的差异。

1、CoreModule用于控制Nginx服务器的基本功能； 
2、EventsModule用于控制Nginx如何处理连接。该模块的指令的一些参数会对应用系统的性能产生重要的影响； 
3、HttpCoreModule提供HTTP访问Nginx服务器，该模块是不能缺少的。

## **内部进程模型**

Nginx是以多进程的方式来工作的，当然Nginx也是支持多线程的方式的,只是我们主流的方式还是多进程的方式，也是Nginx的默认方式。Nginx采用多进程的方式有诸多好处。

Nginx在启动后，会有一个master进程和多个worker进程。master进程主要用来管理worker进程，包含：接收来自外界的信号，向各worker进程发送信号，监控 worker进程的运行状态,当worker进程退出后(异常情况下)，会自动重新启动新的worker进程。而基本的网络事件，则是放在worker进程中来处理了。多个worker进程之间是对等的，他们同等竞争来自客户端的请求，各进程互相之间是独立的。一个请求，只可能在一个worker进程中处理，一个worker进程，不可能处理其它进程的请求。worker进程的个数是可以设置的，一般我们会设置与机器CPU核数一致，这里面的原因与Nginx的进程模型以及事件处理模型是分不开的。

## **处理请求**

　　首先，Nginx在启动时，会解析配置文件，得到需要监听的端口与IP地址，然后在Nginx的master进程里面，先初始化好这个监控的socket(创建socket，设置addrreuse等选项，绑定到指定的IP地址端口，再listen)，然后再fork(一个现有进程可以调用fork函数创建一个新进程。由fork创建的新进程被称为子进程 )出多个子进程出来，然后子进程会竞争accept新的连接。 

　　此时，客户端就可以向Nginx发起连接了。当客户端与Nginx进行三次握手，与Nginx建立好一个连接后，某一个子进程会accept成功，得到这个建立好的连接的socket，然后创建Nginx对连接的封装，即ngx_connection_t结构体。 

　　接着，设置读写事件处理函数并添加读写事件来与客户端进行数据的交换。最后，Nginx或客户端来主动关掉连接，到此，一个连接就寿终正寝了。

源码入口

```
//src\/core\/nginx.c

main(int argc, char *const *argv)
{
    ngx_buf_t        *b;
    ngx_log_t        *log;
    ngx_uint_t        i;
    ngx_cycle_t      *cycle, init_cycle;
    ngx_conf_dump_t  *cd;
    ngx_core_conf_t  *ccf;

    ngx_debug_init();
```

## 官方配置案例

### nginx.conf

```
user       www www;  ## Default: nobody
worker_processes  5;  ## Default: 1
error_log  logs/error.log;
pid        logs/nginx.pid;
worker_rlimit_nofile 8192;

events {
  worker_connections  4096;  ## Default: 1024
}

http {
  include    conf/mime.types;
  include    /etc/nginx/proxy.conf;
  include    /etc/nginx/fastcgi.conf;
  index    index.html index.htm index.php;

  default_type application/octet-stream;
  log_format   main '$remote_addr - $remote_user [$time_local]  $status '
    '"$request" $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log   logs/access.log  main;
  sendfile     on;
  tcp_nopush   on;
  server_names_hash_bucket_size 128; # this seems to be required for some vhosts

  server { # php/fastcgi
    listen       80;
    server_name  domain1.com www.domain1.com;
    access_log   logs/domain1.access.log  main;
    root         html;

    location ~ \.php$ {
      fastcgi_pass   127.0.0.1:1025;
    }
  }

  server { # simple reverse-proxy
    listen       80;
    server_name  domain2.com www.domain2.com;
    access_log   logs/domain2.access.log  main;

    # serve static files
    location ~ ^/(images|javascript|js|css|flash|media|static)/  {
      root    /var/www/virtual/big.server.com/htdocs;
      expires 30d;
    }

    # pass requests for dynamic content to rails/turbogears/zope, et al
    location / {
      proxy_pass      http://127.0.0.1:8080;
    }
  }

  upstream big_server_com {
    server 127.0.0.3:8000 weight=5;
    server 127.0.0.3:8001 weight=5;
    server 192.168.0.1:8000;
    server 192.168.0.1:8001;
  }

  server { # simple load balancing
    listen          80;
    server_name     big.server.com;
    access_log      logs/big.server.access.log main;

    location / {
      proxy_pass      http://big_server_com;
    }
  }
}
```

### proxy_conf

```
proxy_redirect          off;
proxy_set_header        Host            $host;
proxy_set_header        X-Real-IP       $remote_addr;
proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
client_max_body_size    10m;
client_body_buffer_size 128k;
proxy_connect_timeout   90;
proxy_send_timeout      90;
proxy_read_timeout      90;
proxy_buffers           32 4k;
```

### fastcgi_conf

```
fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
fastcgi_param  QUERY_STRING       $query_string;
fastcgi_param  REQUEST_METHOD     $request_method;
fastcgi_param  CONTENT_TYPE       $content_type;
fastcgi_param  CONTENT_LENGTH     $content_length;
fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
fastcgi_param  REQUEST_URI        $request_uri;
fastcgi_param  DOCUMENT_URI       $document_uri;
fastcgi_param  DOCUMENT_ROOT      $document_root;
fastcgi_param  SERVER_PROTOCOL    $server_protocol;
fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;
fastcgi_param  REMOTE_ADDR        $remote_addr;
fastcgi_param  REMOTE_PORT        $remote_port;
fastcgi_param  SERVER_ADDR        $server_addr;
fastcgi_param  SERVER_PORT        $server_port;
fastcgi_param  SERVER_NAME        $server_name;

fastcgi_index  index.php;

fastcgi_param  REDIRECT_STATUS    200;
```

### mime_types

```
types {
  text/html                             html htm shtml;
  text/css                              css;
  text/xml                              xml rss;
  image/gif                             gif;
  image/jpeg                            jpeg jpg;
  application/x-javascript              js;
  text/plain                            txt;
  text/x-component                      htc;
  text/mathml                           mml;
  image/png                             png;
  image/x-icon                          ico;
  image/x-jng                           jng;
  image/vnd.wap.wbmp                    wbmp;
  application/java-archive              jar war ear;
  application/mac-binhex40              hqx;
  application/pdf                       pdf;
  application/x-cocoa                   cco;
  application/x-java-archive-diff       jardiff;
  application/x-java-jnlp-file          jnlp;
  application/x-makeself                run;
  application/x-perl                    pl pm;
  application/x-pilot                   prc pdb;
  application/x-rar-compressed          rar;
  application/x-redhat-package-manager  rpm;
  application/x-sea                     sea;
  application/x-shockwave-flash         swf;
  application/x-stuffit                 sit;
  application/x-tcl                     tcl tk;
  application/x-x509-ca-cert            der pem crt;
  application/x-xpinstall               xpi;
  application/zip                       zip;
  application/octet-stream              deb;
  application/octet-stream              bin exe dll;
  application/octet-stream              dmg;
  application/octet-stream              eot;
  application/octet-stream              iso img;
  application/octet-stream              msi msp msm;
  audio/mpeg                            mp3;
  audio/x-realaudio                     ra;
  video/mpeg                            mpeg mpg;
  video/quicktime                       mov;
  video/x-flv                           flv;
  video/x-msvideo                       avi;
  video/x-ms-wmv                        wmv;
  video/x-ms-asf                        asx asf;
  video/x-mng                           mng;
}
```

## nginx使用ssl模块配置https支持

默认情况下ssl模块并未被安装，如果要使用该模块则需要在编译时指定–with-http_ssl_module参数，安装模块依赖于OpenSSL库和一些引用文件，通常这些文件并不在同一个软件包中。通常这个文件名类似libssl-dev。

### 生成证书

可以通过以下步骤生成一个简单的证书：
首先，进入你想创建证书和私钥的目录，例如：

1. $ cd /usr/local/nginx/conf

创建服务器私钥，命令会让你输入一个口令：

1. $ openssl genrsa -des3 -out server.key 1024

创建签名请求的证书（CSR）：

1. $ openssl req -new -key server.key -out server.csr

在加载SSL支持的[Nginx](http://www.centos.bz/category/web-server/nginx/)并使用上述私钥时除去必须的口令：

1. $ cp server.key server.key.org
2. $ openssl rsa -in server.key.org -out server.key

### 配置nginx

最后标记证书使用上述私钥和CSR：

1. $ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

修改Nginx配置文件，让其包含新标记的证书和私钥：

1. server {
2. ​    server_name YOUR_DOMAINNAME_HERE;
3. ​    listen 443;
4. ​    ssl on;
5. ​    ssl_certificate /usr/local/nginx/conf/server.crt;
6. ​    ssl_certificate_key /usr/local/nginx/conf/server.key;
7. }

重启nginx。
这样就可以通过以下方式访问：

https://YOUR_DOMAINNAME_HERE

另外还可以加入如下代码实现80端口重定向到443[IT人乐园](http://%2A%2A%2A/)

1. server {
2. listen 80;
3. server_name www.centos.bz;
4. rewrite ^(.*) https://$server_name$1 permanent;
5. }



## 相当好的资料

Nginx配置文件主要分为四部分：main(全局设置)、server(主机设置)、upstream(上游服务器设置，主要为反向代理、负载均衡相关配置)和location(URL匹配特定位置后的设置)，每部分包含若干个指令。

- main部分设置的指令将影响其他所有部分的设置
- server部分的指令主要用于指定虚拟主机域名、IP和端口
- upstream指令用于设置一系列的后端服务器，设置反向代理及后端服务器的负载均衡
- location部分用于匹配网页位置（比如，根目录“/”,"/images",等等）

他们之间的关系是：server继承main，location继承server，upstream既不会继承指令也不会被继承。

下面的nginx.conf简单的实现nginx在前端做反向代理服务器的例子，处理js、png等静态文件，jsp等动态请求转发到其他服务器tomcat：

```
user  www www;
worker_processes  2;
error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
pid        logs/nginx.pid;
events {
    use epoll;
    worker_connections  2048;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    # tcp_nopush     on;
    keepalive_timeout  65;
  # gzip压缩功能设置
    gzip on;
    gzip_min_length 1k;
    gzip_buffers    4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 6;
    gzip_types text/html text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;

  # http_proxy 设置
    client_max_body_size   10m;
    client_body_buffer_size   128k;
    proxy_connect_timeout   75;
    proxy_send_timeout   75;
    proxy_read_timeout   75;
    proxy_buffer_size   4k;
    proxy_buffers   4 32k;
    proxy_busy_buffers_size   64k;
    proxy_temp_file_write_size  64k;
    proxy_temp_path   /usr/local/nginx/proxy_temp 1 2;
  # 设定负载均衡后台服务器列表 
    upstream  backend  { 
              #ip_hash; 
              server   192.168.10.100:8080 max_fails=2 fail_timeout=30s ;  
              server   192.168.10.101:8080 max_fails=2 fail_timeout=30s ;  
    }
  # 很重要的虚拟主机配置
    server {
        listen       80;
        server_name  itoatest.example.com;
        root   /apps/oaapp;
        charset utf-8;
        access_log  logs/host.access.log  main;
        #对 / 所有做负载均衡+反向代理
        location / {
            root   /apps/oaapp;
            index  index.jsp index.html index.htm;
            proxy_pass        http://backend;  
            proxy_redirect off;
            # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;  
            proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;

        }
        #静态文件，nginx自己处理，不去backend请求tomcat
        location  ~* /download/ {  
            root /apps/oa/fs;  

        }
        location ~ .*\.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$   
        {   
            root /apps/oaapp;   
            expires      7d; 
        }
           location /nginx_status {
            stub_status on;
            access_log off;
            allow 192.168.10.0/24;
            deny all;
        }
        location ~ ^/(WEB-INF)/ {   
            deny all;   
        }
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
  ## 其它虚拟主机，server 指令开始
}
```

### 常用指令说明

#### main全局配置

nginx在运行时与具体业务功能（比如http服务或者email服务代理）无关的一些参数，比如工作进程数，运行的身份等。

**woker_processes 2**

在配置文件的顶级main部分，worker角色的工作进程的个数，master进程是接收并分配请求给worker处理。这个数值简单一点可以设置为cpu的核数`grep ^processor /proc/cpuinfo | wc -l`，也是 auto 值，如果开启了ssl和gzip更应该设置成与逻辑CPU数量一样甚至为2倍，可以减少I/O操作。如果nginx服务器还有其它服务，可以考虑适当减少。

**worker_cpu_affinity**

也是写在main部分。在高并发情况下，通过设置cpu粘性来降低由于多CPU核切换造成的寄存器等现场重建带来的性能损耗。如worker_cpu_affinity 0001 0010 0100 1000; （四核）。

**worker_connections 2048**

写在events部分。每一个worker进程能并发处理（发起）的最大连接数（包含与客户端或后端被代理服务器间等所有连接数）。nginx作为反向代理服务器，计算公式 最大连接数 = worker_processes * worker_connections/4，所以这里客户端最大连接数是1024，这个可以增到到8192都没关系，看情况而定，但不能超过后面的worker_rlimit_nofile。当nginx作为http服务器时，计算公式里面是除以2。

**worker_rlimit_nofile 10240**

写在main部分。默认是没有设置，可以限制为操作系统最大的限制65535。

**use epoll**

写在events部分。在Linux操作系统下，nginx默认使用epoll事件模型，得益于此，nginx在Linux操作系统下效率相当高。同时Nginx在OpenBSD或FreeBSD操作系统上采用类似于epoll的高效事件模型kqueue。在操作系统不支持这些高效模型时才使用select。

#### http服务器

与提供http服务相关的一些配置参数。例如：是否使用keepalive啊，是否使用gzip进行压缩等。

**sendfile on**

开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，减少用户空间到内核空间的上下文切换。对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。

**keepalive_timeout 65**

长连接超时时间，单位是秒，这个参数很敏感，涉及浏览器的种类、后端服务器的超时设置、操作系统的设置，可以另外起一片文章了。长连接请求大量小文件的时候，可以减少重建连接的开销，但假如有大文件上传，65s内没上传完成会导致失败。如果设置时间过长，用户又多，长时间保持连接会占用大量资源。

**send_timeout**

用于指定响应客户端的超时时间。这个超时仅限于两个连接活动之间的时间，如果超过这个时间，客户端没有任何活动，Nginx将会关闭连接。

**client_max_body_size 10m**

允许客户端请求的最大单文件字节数。如果有上传较大文件，请设置它的限制值

**client_body_buffer_size 128k**

缓冲区代理缓冲用户端请求的最大字节数

#### 模块http_proxy

这个模块实现的是nginx作为反向代理服务器的功能，包括缓存功能。

**proxy_connect_timeout 60**

nginx跟后端服务器连接超时时间(代理连接超时)

**proxy_read_timeout 60**

连接成功后，与后端服务器两个成功的响应操作之间超时时间(代理接收超时)

**proxy_buffer_size 4k**

设置代理服务器（nginx）从后端realserver读取并保存用户头信息的缓冲区大小，默认与proxy_buffers大小相同，其实可以将这个指令值设的小一点

**proxy_buffers 4 32k**

proxy_buffers缓冲区，nginx针对单个连接缓存来自后端realserver的响应，网页平均在32k以下的话，这样设置

**proxy_busy_buffers_size 64k**

高负荷下缓冲大小（proxy_buffers*2）

**proxy_max_temp_file_size**

当 proxy_buffers 放不下后端服务器的响应内容时，会将一部分保存到硬盘的临时文件中，这个值用来设置最大临时文件大小，默认1024M，它与 proxy_cache 没有关系。大于这个值，将从upstream服务器传回。设置为0禁用。

**proxy_temp_file_write_size 64k**

当缓存被代理的服务器响应到临时文件时，这个选项限制每次写临时文件的大小。proxy_temp_path（可以在编译的时候）指定写到哪那个目录。

proxy_pass，proxy_redirect见 location 部分。

#### 模块http_gzip

**gzip on**

开启gzip压缩输出，减少网络传输。

**gzip_min_length 1k**

设置允许压缩的页面最小字节数，页面字节数从header头得content-length中进行获取。默认值是20。建议设置成大于1k的字节数，小于1k可能会越压越大。

**gzip_buffers 4 16k**

设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。4 16k代表以16k为单位，安装原始数据大小以16k为单位的4倍申请内存。

**gzip_http_version 1.0**

用于识别 http 协议的版本，早期的浏览器不支持 Gzip 压缩，用户就会看到乱码，所以为了支持前期版本加上了这个选项，如果你用了 Nginx 的反向代理并期望也启用 Gzip 压缩的话，由于末端通信是 http/1.0，故请设置为 1.0。

**gzip_comp_level 6**

gzip压缩比，1压缩比最小处理速度最快，9压缩比最大但处理速度最慢(传输快但比较消耗cpu)

**gzip_types**

匹配mime类型进行压缩，无论是否指定,”text/html”类型总是会被压缩的。

**gzip_proxied any**

Nginx作为反向代理的时候启用，决定开启或者关闭后端服务器返回的结果是否压缩，匹配的前提是后端服务器必须要返回包含”Via”的 header头。

**gzip_vary on**

和http头有关系，会在响应头加个 Vary: Accept-Encoding ，可以让前端的缓存服务器缓存经过gzip压缩的页面，例如，用Squid缓存经过Nginx压缩的数据。。

### server虚拟主机

http服务上支持若干虚拟主机。每个虚拟主机一个对应的server配置项，配置项里面包含该虚拟主机相关的配置。在提供mail服务的代理时，也可以建立若干server。每个server通过监听地址或端口来区分。

**listen**

监听端口，默认80，小于1024的要以root启动。可以为`listen *:80`、`listen 127.0.0.1:80`等形式。

**server_name**

服务器名，如`localhost、www.example.com`，可以通过正则匹配。

#### 模块http_stream

这个模块通过一个简单的调度算法来实现客户端IP到后端服务器的负载均衡，upstream后接负载均衡器的名字，后端realserver以`host:port options`; 方式组织在 {} 中。如果后端被代理的只有一台，也可以直接写在 proxy_pass 。

### location

http服务中，某些特定的URL对应的一系列配置项。

**root /var/www/html**

定义服务器的默认网站根目录位置。如果locationURL匹配的是子目录或文件，root没什么作用，一般放在server指令里面或/下。

**index index.jsp index.html index.htm**

定义路径下默认访问的文件名，一般跟着root放

**proxy_pass http:/backend**

请求转向backend定义的服务器列表，即反向代理，对应upstream负载均衡器。也可以`proxy_pass http://ip:port`。

```
proxy_redirect off;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

### 其它

#### 访问控制 allow/deny

Nginx 的访问控制模块默认就会安装，而且写法也非常简单，可以分别有多个allow,deny，允许或禁止某个ip或ip段访问，依次满足任何一个规则就停止往下匹配。如：

```
location /nginx-status {
  stub_status on;
  access_log off;
#  auth_basic   "NginxStatus";
#  auth_basic_user_file   /usr/local/nginx-1.6/htpasswd;
  allow 192.168.10.100;
  allow 172.29.73.0/24;
  deny all;
}
```

我们也常用 httpd-devel 工具的 htpasswd 来为访问的路径设置登录密码：

```
# htpasswd -c htpasswd admin
New passwd:
Re-type new password:
Adding password for user admin
# htpasswd htpasswd admin    //修改admin密码
# htpasswd htpasswd sean    //多添加一个认证用户
```

这样就生成了默认使用CRYPT加密的密码文件。打开上面nginx-status的两行注释，重启nginx生效。

#### 列出目录 autoindex

Nginx默认是不允许列出整个目录的。如需此功能，打开nginx.conf文件，在location，server 或 http段中加入`autoindex on`;，另外两个参数最好也加上去:

**autoindex_exact_size off**

默认为on，显示出文件的确切大小，单位是bytes。改为off后，显示出文件的大概大小，单位是kB或者MB或者GB

**autoindex_localtime on**

默认为off，显示的文件时间为GMT时间。改为on后，显示的文件时间为文件的服务器时间

```
location /images {
  root   /var/www/nginx-default/images;
  autoindex on;
  autoindex_exact_size off;
  autoindex_localtime on;
}
```

## location正则语法

> 语法:location [=|~|~*|^~] /uri/ { … }
> 默认:否
>
> 上下文:server

- ~* 前缀选择不区分大小写的匹配
-  ~ 选择区分大小写的匹配
-  = 将只执行严格匹配.例子：如果经常发生”/”请求，那么使用 “location = /” 将加速处理这个请求。
- ^~ 如果路径匹配那么不测试正则表达式

```
location = / {
# 只匹配 / 查询。
[ configuration A ]
}

location / {
# 匹配任何查询，因为所有请求都已 / 开头。但是正则表达式规则和长的块规则将被优先和查询匹配。
[ configuration B ]
}

location ^~ /images/ {
# 匹配任何已 /images/ 开头的任何查询并且停止搜索。任何正则表达式将不会被测试。
[ configuration C ]
}

location ~* \.(gif|jpg|jpeg)$ {
# 匹配任何已 gif、jpg 或 jpeg 结尾的请求。然而所有 /images/ 目录的请求将使用 Configuration C。
[ configuration D ]
}

例子请求:

/ -> configuration A

/documents/document.html -> configuration B

/images/1.gif -> configuration C

/documents/1.jpg -> configuration D
注意：按任意顺序定义这4个配置结果将仍然一样。
```

## nginx虚拟目录alias和root目录

nginx是通过alias设置虚拟目录，在nginx的配置中，alias目录和root目录是有区别的：

- alias指定的目录是准确的，即location匹配访问的path目录下的文件直接是在alias目录下查找的
- root指定的目录是location匹配访问的path目录的上一级目录，这个path目录一定要是真实存在root指定目录下的
- 使用alias标签的目录块中不能使用rewrite的break；另外，alias指定的目录后面必须要加上"/"符号
- alias虚拟目录配置中，location匹配的path目录如果后面不带"/"，那么访问的url地址中这个path目录后面加不加"/"不影响访问，访问时会自动加上"/"；但是如果location匹配的path目录后面加上"/"，那么访问的url地址中这个path目录必须要加上"/"，访问时不会自动加"/"
- root目录配置中，location匹配的path目录后带不带"/"，都不会影响访问

```
举例说明（比如nginx配置的域名是www.wangshibo.com）：
（1）
location /huan/ {
      alias /home/www/huan/;
}

在上面alias虚拟目录配置下，访问http://www.wangshibo.com/huan/a.html实际指定的是/home/www/huan/a.html。
注意：alias指定的目录后面必须要加上"/"，即/home/www/huan/不能改成/home/www/huan

上面的配置也可以改成root目录配置，如下，这样nginx就会去/home/www/huan下寻找http://www.wangshibo.com/huan的访问资源，两者配置后的访问效果是一样的！
location /huan/ {
       root /home/www/;
}

上面的例子中alias设置的目录名和location匹配访问的path目录名一致，这样可以直接改成root目录配置；那要是不一致呢？
再看一例：
location /web/ {
      alias /home/www/html/;
}

访问http://www.wangshibo.com/web的时候就会去/home/www/html/下寻找访问资源。
这样的话，还不能直接改成root目录配置。
如果非要改成root目录配置，就只能在/home/www下将html->web（做软连接，即快捷方式），如下：
location /web/ {
     root /home/www/;
}

# ln -s /home/www/web /home/www/html       //即保持/home/www/web和/home/www/html内容一直
```

所以，一般情况下，在nginx配置中的良好习惯是：

- **在location /中配置root目录**；
- **在location /path中配置alias虚拟目录**。

以下例子解释虚拟目录alias和root的区别

```
server {
          listen 80;
          server_name www.wangshibo.com;
          index index.html index.php index.htm;
          access_log /usr/local/nginx/logs/image.log;

    location / {
        root /var/www/html;
        }

   location /haha {                                          //匹配的path目录haha不需要真实存在alias指定的目录中
       alias /var/www/html/ops/;                       //后面的"/"符号一定要带上
       rewrite ^/opp/hen.php(.*)$ /opp/hen.php?s=$1 last;
    # rewrite ^/opp/(.*)$ /opp/hen.php?s=$1 last;
       }

   location /wang {                    //匹配的path目录wang一定要真实存在root指定的目录中（就/var/www/html下一定要有wang目录存在）
      root /var/www/html;
     }

 }
```

