# windows下nginx安装、配置和使用

- 启动

　　解压至c:\nginx，运行nginx.exe(即nginx -c conf\nginx.conf)，默认使用80端口，日志见文件夹C:\nginx\logs

start nginx.exe

- 使用

　　[http://localhost](http://localhost/)

- 关闭

　　nginx -s stop 或taskkill /F /IM nginx.exe > nul 

- 常用配置

 　　C:\nginx\conf\nginx.conf,使用自己定义的conf文件如my.conf，命令为nginx -c conf\my.conf

常用配置如下： 
　　Nginx.conf代码 
　　http { 
　　 server { 

​	//1.侦听80端口

　　 listen 80; 
　　 location / { 

​	//2. 默认主页目录在nginx安装目录的html子目录。

　　 root html; 
　　 index index.html index.htm; 

​	//3. 没有索引页时，罗列文件和子目录

　　 autoindex on; 
　　 autoindex_exact_size on; 
　　 autoindex_localtime on; 
　　 } 

​	//4.指定虚拟目录

　　 location /tshirt { 
　　 alias D:\programs\Apache2\htdocs\tshirt; 
　　 index index.html index.htm; 
　　 } 
　　 } 

​	//5.虚拟主机www.emb.info配置

　　 server { 
　　 listen 80; 
　　 server_name www.emb.info; 
　　 access_log emb.info/logs/access.log; 
　　 location / { 
　　 index index.html; 
　　 root emb.info/htdocs; 
　　 } 
　　 } 
　　} 

- 查看nginx进程

　　tasklist /fi "imagename eq nginx.exe"，如下显示：
映像名称                       PID 会话名              会话#       内存使用
========================= ======== ================ =========== ============
nginx.exe                     8944 Console                    1      5,128 K
nginx.exe                     6712 Console                    1      5,556 K

- nginx常用命令

nginx -s stop 强制关闭 
nginx -s quit 安全关闭 
nginx -s reload 改变配置文件的时候，重启nginx工作进程，来时配置文件生效 
nginx -s reopen 打开日志文件

- 其它

　　可以通过配置文件开启多个nginx工作进程，但同时只有其中一个nginx工作进程在工作，其他的阻塞等待。
　　一个nginx工作进程最多同时可以处理1024个连接。
　　nginx中需要共享内存的cache或者模块无法在windows下正常使用。
　　不过，nginx官方正在改进，将来nginx会以服务的方式运行，使用 I/O completion ports代替select方法，使多个工作进程能并发工作。
　　要使用nginx配合php-cgi使用，需要修改环境变量，否则，php-cgi运行一定次数就推出，需要重启，设置PHP_FCGI_MAX_REQUESTS这个变量为0即可。

　　以上在win7上通过。 

- nginx以windows服务形式启动

　　1.下载微软两个工具：

　　　　instsrv.exe srvay.exe

　　2.执行命令:

　　　　instsrv Nginxc:/nginx/srvany.exe

　　3.配置Nginx的运行参数

　　可以直接将配置导入到注册表

Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Services/NGINX/Parameters]
"Application"="C://nginx//nginx.exe"
"AppParameters"=""
"AppDirectory"="C://nginx//"

　　注意：windows 下的Nginx 内置的module 很多没有，用Nginx -V 命令查看。