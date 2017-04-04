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

