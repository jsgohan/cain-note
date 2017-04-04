# 使用redis存储Nginx+tomcat负载均衡集群的session

环境：Cent OS 7.0（虚拟机环境）、Nginx 1.9.8、Redis 3.2.1

在使用Nginx+Tomcat实现负载均衡的时候，由于Nginx对不同的请求分发到某一个Tomcat，Tomcat在运行的时候分别是不同的容器里，因为会出现session不同步或者丢失的问题。

## Nginx安装与配置

### 1、Nginx安装网上的资源对于安装Nginx的介绍比较多，例如最简单的为：

（1） 获取nginx，在http://nginx.org/download/上可以获取当前最新的版本下载，例如：wget http://nginx.org/download/nginx-1.9.8.tar.gz

（2）解压缩tar -xvf nginx-1.9.8.tar.gz包。

（3）进入解压缩目录，执行./configure --prefix=/usr/local/nginx-1.9.8 将Nginx安装到/usr/local/nginx-1.9.8目录下

（4）make & make install

安装的过程会将Nginx安装到/usr/local/nginx-1.9.8目录下，启动Nginx测试是否可以正常启动。

### 2、修改Nginx配置多Tomcat服务器

#### 2.1、修改conf/nginx.conf文件,在server标签上边添加upstream如下：

```
upstream mynginxserver {
  #weight参数表示权重，权值越高被分配到的几率越大
  #本机上的Squid开启3128端口
  		server 127.0.0.1:8080 weight=1;
  		server 127.0.0.1:8060 weigth=1;
}
```

这里指定了本机下的两个Tomcat实例，端口分别为8080，8060，权重都为1，后边配置Tomcat实例，mynginxserver下边要用到。

#### 2.2、配置server标签：

```
server {
  listen 80;
  server_name 192.168.1.149;
  
  #charset koi8-r;
  
  #access_log logs/host.access.log main;
  
  location / {
    #root html;
    #index index.html index.htm
    proxy_pass http://mynginxserver;
  }
  
  error_page  500 502 503 504 /50x.html;
  location = 50x.html {
    root html;
  }
}
```

#### 2.3、配置之后的完整内容如下（1.9.8版本删去了注释后的配置内容）：

```
worker_processes 1;

events {
  worker_connections 1024;
}

http {
  include    mime.types;
  default_type  application/octet-stream;
  
  sendfile   on;
  
  keepalive_timeout  65;
  
  upstream mynginxserver {
  		server 127.0.0.1:8080 weight=1;
  		server 127.0.0.1:8060 weigth=1;
  }
  
  server {
    listen 80;
   	server_name 192.168.1.149;
   	
   	location / {
      proxy_pass http://mynginxserver;
   	}
   	
   	error_page  500 502 503 504 /50x.html;
    location = 50x.html {
      root html;
    }
  }
}
```

#### 2.4、具体的配置项和配置项的具体意义请参考：

https://www.nginx.com/resources/wiki/start/topics/examples/full/

## Tomcat多实例的配置

### 1、解压apache-tomcat-7.0.67.zip 得到apache-tomcat-7.0.67

**[root@localhost www]# unzip apache-tomcat-7.0.67.zip**

### 2、将apache-tomcat-7.0.67重命名为tomcat1

**[root@localhost www]# mv apache-tomcat-7.0.67 tomcat1**

重复1、2过程得到tomcat1和tomcat2如下所示

### 3、修改Tomcat1的端口为8080和部署项目文件编辑tomcat下的conf/server.xml,修改端口号为8080

创建web项目，并将项目文件放到tomcat1/webapps/ROOT/目录下

### 4、修改Tomcat2的端口为8060和部署项目文件编辑tomcat下的conf/server.xml,修改端口号为8060，然后和上述3中的一样

### 5、分别启动tomcat1和tomcat2。

### 6、重启Nginx服务，访问IP地址：192.168.1.149:80（这个是访问的虚拟机IP地址）

### 7、观看效果

![效果1](D:\worksoft\somethingrepo\simplerepo\redis\效果1.png)

![效果2](D:\worksoft\somethingrepo\simplerepo\redis\效果2.png)

可以看出，Nginx已经进行了请求分发，转发到具体的某一个Tomcat

## 四、Redis的安装与配置（Cent OS 7.0 [Redis](http://lib.csdn.net/base/redis) 3.2.1）

Redis放在/home/software/下，所以在该目录下执行下列命令：

>$ wget http://download.redis.io/releases/redis-3.2.1.tar.gz
>$ tar xzf redis-3.2.1.tar.gz
>$ cd redis-3.2.1
>$ make

启动命令（在/home/software/redis-3.2.1目录下执行）：

```
[root@localhost redis-3.2.1]# ./src/redis-server ../redis.conf
```

![run](D:\worksoft\somethingrepo\simplerepo\redis\run.png)

## 常见问题及解决方法

根据上图中的警告信息，下边是具体的解决方法

1、启动的时候没有设置配置文件

**这个版本的时候需要指定，如果不指定的话，在后期修改了配置文件不会起到对应的效果**

```
11292:C 25 Jul 13:13:58.034 # Warning: no config file specified, using the default config. In order to specify a config file use ./redis-server /path/to/redis.conf11
```

这个说的是在启动的时候要制定配置文件，如果没有指定的话就会按照默认的配置，因此我们要制定具体的位置，具体命令为：

```
[root@localhost src]# ./redis-server ../redis.conf
1212
```

2、启动时报错及解决方法

```
1、WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.

2、WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.123123
```

解决方法其实按照上边的说明就可以解决

第一个警告两个方式解决(overcommit_memory)

```
echo "vm.overcommit_memory=1" > /etc/sysctl.conf  或 vi /etcsysctl.conf11
```

然后reboot重启机器，重启之后执行下边的内容

```
echo 1 > /proc/sys/vm/overcommit_memory  不需要启机器就生效11
```

第二个警告解决

```
echo 511 > /proc/sys/net/core/somaxconn
```

其实在报错信息的时候已经给出了解决的方法，按照给定的具体的方法解决即可。

3、在上述 2 中的解决方法的一些参数说明

（1）overcommit_memory参数说明：

设置内存分配策略（可选，根据服务器的实际情况进行设置） 
/proc/sys/vm/overcommit_memory 
可选值：0、1、2。

```
0， 表示内核将检查是否有足够的可用内存供应用进程使用；如果有足够的可用内存，内存申请允许；否则，内存申请失败，并把错误返回给应用进程。
1， 表示内核允许分配所有的物理内存，而不管当前的内存状态如何。
2， 表示内核允许分配超过所有物理内存和交换空间总和的内存
```

注意：redis在dump数据的时候，会fork出一个子进程，理论上child进程所占用的内存和parent是一样的，比如parent占用 的内存为8G，这个时候也要同样分配8G的内存给child,如果内存无法负担，往往会造成redis服务器的down机或者IO负载过高，效率下降。所 以这里比较优化的内存分配策略应该设置为 1（表示内核允许分配所有的物理内存，而不管当前的内存状态如何）。

（2）这里又涉及到Overcommit和OOM。 
什么是Overcommit和OOM，在Unix中，当一个用户进程使用malloc()函数申请内存时，假如返回值是NULL，则这个进程知道当前没有可用内存空间，就会做相应的处理工作。许多进程会打印错误信息并退出。 
[Linux](http://lib.csdn.net/base/linux)使用另外一种处理方式，它对大部分申请内存的请求都回复”yes”，以便能跑更多更大的程序。因为申请内存后，并不会马上使用内存。这种技术叫做Overcommit。 
当内存不足时，会发生OOM killer(OOM=out-of-memory)。它会选择杀死一些进程(用户态进程，不是内核线程)，以便释放内存。

（3）Overcommit的策略

Linux下overcommit有三种策略(Documentation/vm/overcommit-accounting)：

- 启发式策略。合理的overcommit会被接受，不合理的overcommit会被拒绝。
- 任何overcommit都会被接受。
- 当系统分配的内存超过swap+N%*物理RAM(N%由vm.overcommit_ratio决定)时，会拒绝commit。

overcommit的策略通过vm.overcommit_memory设置。 
overcommit的百分比由vm.overcommit_ratio设置。

```
echo 2 > /proc/sys/vm/overcommit_memory
echo 80 > /proc/sys/vm/overcommit_ratio
```

​	当oom-killer发生时，linux会选择杀死哪些进程选择进程的函数是oom_badness函数(在mm/oom_kill.c中)，该函数会计算每个进程的点数(0~1000)。点数越高，这个进程越有可能被杀死。每个进程的点数跟oom_score_adj有关，而且oom_score_adj可以被设置(-1000最低，1000最高)。

## 设置Redis外网可访问

值得注意的是在3.2.0以后的新版本中引入了一种`proteced mode` 模式，详见：[http://redis.io/topics/security](http://redis.io/topics/security)

在不修改配置文件任何内容的情况下，有以下几个默认的配置：

```
# By default, if no "bind" configuration directive is specified, Redis listens
# for connections from all the network interfaces available on the server.
# It is possible to listen to just one or multiple selected interfaces using
# the "bind" configuration directive, followed by one or more IP addresses.
#
# Examples:
#
# bind 192.168.1.100 10.0.0.1
# bind 127.0.0.1 ::1
#
# ~~~ WARNING ~~~ If the computer running Redis is directly exposed to the
# internet, binding to all the interfaces is dangerous and will expose the
# instance to everybody on the internet. So by default we uncomment the
# following bind directive, that will force Redis to listen only into
# the IPv4 lookback interface address (this means Redis will be able to
# accept connections only from clients running into the same computer it
# is running).
#
# IF YOU ARE SURE YOU WANT YOUR INSTANCE TO LISTEN TO ALL THE INTERFACES
# JUST COMMENT THE FOLLOWING LINE.
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
bind 127.0.0.1


# By default protected mode is enabled. You should disable it only if
# you are sure you want clients from other hosts to connect to Redis
# even if no authentication is configured, nor a specific set of interfaces
# are explicitly listed using the "bind" directive.
protected-mode yes


# Require clients to issue AUTH <PASSWORD> before processing any other
# commands.  This might be useful in environments in which you do not trust
# others with access to the host running redis-server.
#
# This should stay commented out for backward compatibility and because most
# people do not need auth (e.g. they run their own servers).
#
# Warning: since Redis is pretty fast an outside user can try up to
# 150k passwords per second against a good box. This means that you should
# use a very strong password otherwise it will be very easy to break.
#
# requirepass foobared
```

简单的就是：

```
bind 127.0.0.1
protected-mode yes
# requirepass foobared
```

默认绑定的是127.0.01，默认开启了：protected-mode模式，按照官方的说法，如果默认开启了protected-mode模式在没有配置绑定IP和密码的情况下，是只允许回环地址进行访问的，就只允许127.0.0.1进行访问，那我们就在默认的配置下进行启动，通过SSH工具在其他机器上进行访问，看看运行的效果：

```
[root@localhost redis-3.2.1]# ./src/redis-server ../redis.conf
```

![error](D:\worksoft\somethingrepo\simplerepo\redis\error.png)

很显然是没有办法访问到，在3.2.0以前的版本中可以将绑定的IP进行修改为本机IP

通过外网访问Redis可能会遇到这个问题，Redis protected-mode 是3.2 之后加入的新特性，在redis.conf的注释中，我们可以了解到，他的具体作用和启用条件：

```
# Protected mode is a layer of security protection, in order to avoid that
# Redis instances left open on the internet are accessed and exploited.
#
# When protected mode is on and if:
#
# 1) The server is not binding explicitly to a set of addresses using the
#    "bind" directive.
# 2) No password is configured.
#
# The server only accepts connections from clients connecting from the
# IPv4 and IPv6 loopback addresses 127.0.0.1 and ::1, and from Unix domain
# sockets.
#
# By default protected mode is enabled. You should disable it only if
# you are sure you want clients from other hosts to connect to Redis
# even if no authentication is configured, nor a specific set of interfaces
# are explicitly listed using the "bind" directive.
protected-mode yes123456789101112131415161718123456789101112131415161718
```

可以看到 protected-mode 是为了禁止公网访问redis cache，加强redis安全的。它启用的条件，有两个： 
1） 没有bind IP 
2） 没有设置访问密码

如果启用了，则只能够通过lookback ip（127.0.0.1）访问Redis cache，如果从外网访问，则会返回相应的错误信息，就是上图中的信息。

因此在新的版本中，应该配置绑定IP和访问密码，这样的话才不会报错误，在Redis的一个论坛中，老外也探讨了这个问题，可以参考：[https://www.reddit.com/r/redis/comments/3zv85m/new_security_feature_redis_protected_mode/](https://www.reddit.com/r/redis/comments/3zv85m/new_security_feature_redis_protected_mode/)

![外网访问报错](D:\worksoft\somethingrepo\simplerepo\redis\外网访问报错.png)

## Redis常用命令

1、启动Redis，这里指定具体的配置文件

```
[root@localhost redis-3.2.1]# ./redis-server ../redis.conf
1212
```

2、查看Redis服务和进程

```
[root@localhost redis-3.2.1]# ps -ef | grep redis
[root@localhost redis-3.2.1]# netstat -ano | grep 6379
```

![查看服务指令](D:\worksoft\somethingrepo\simplerepo\redis\查看服务指令.png)

3、访问客户端Cli

```
[root@localhost redis-3.2.1]# ./src/redis-cli
1212
```

如果设置密码，用参数 -a指定密码

```
[root@localhost redis-3.2.1]# ./src/redis-cli -a yourpassword
```

注意：上述的操作过程中，始终是关闭了防火墙的，关闭的命令如下：

```
centos 7：
systemctl stop firewalld.service #停止
systemctl disable firewalld.service #禁用

centos 7之前的版本：
service iptables stop #停止
chkconfig iptables off #禁用
```

五、tomcat-redis-session-manager开源项目的使用

1、开源项目地址：

https://github.com/jcoleman/tomcat-redis-session-manager

2、下载代码之后需要进行重新编译，生成所需要的jar，任意创建maven项目，将src下的代码拷贝到具体位置，如下：

![img](D:\worksoft\somethingrepo\simplerepo\redis\1.png)

maven的pom.xml文件如下：

![2](D:\worksoft\somethingrepo\simplerepo\redis\2.png)

3、然后打开terminal，执行mvn clean 和mvn install 将编译好的代码打包为：tomcat-redis-session-1.0-SNAPSHOT.jar

4、将**tomcat-redis-session-1.0-SNAPSHOT.jar、jedis-2.7.2.jar、commons-pool2-2.0.jar** 三个jar包分别放在tomcat1和tomcat2实例下的lib目录下。

5、修改tomcat实例下conf/contex.xml文件

```
<?xml version='1.0' encoding='utf-8'?>  
<Context>      
	<WatchedResource>WEB-INF/web.xml</WatchedResource>      <!-- tomcat-redis-session共享配置 -->      
	<Valve className="com.orangefunction.tomcat.redissessions.RedisSessionHandlerValve" />          			
	<Manager className="com.orangefunction.tomcat.redissessions.RedisSessionManager"           host="192.168.1.149"            port="6379"            database="0"            maxInactiveInterval="60" />  
</Context> 
```

如果不设置密码会报错，如下：

![3](D:\worksoft\somethingrepo\simplerepo\redis\3.png)

六、效果演示

案例演示的一个登陆请求，登陆成功之后将用户信息放在session中，在界面中显示出来（tomcat1实例，tomcat2的实例中只是在 **h2** 标签中做了一下标识）

1、login.jsp文件：

<body>

<h2>Session Demo in Tomcat1</h2>

​    <form action="/user?type=login" method="post">               

​		用户名：<input type="text" name="userName"/><br/>               

​		密码：<input type="password" name="userPassword"/><br/>                         

​		<input type="submit" value="login">

​    </form>

</body>

2、index.jsp 将登录之后的信息显示在界面上

<body><h2>Session Demo in Tomcat1</h2>

​      <%    User user = (User) request.getSession().getAttribute("USER");    

​          if (user == null) {    %>用户为空，没有登录！！！<%    } else {    %>欢迎： <%=user.getUserName()%><%    }%></body>

3、servlet处理请求代码

public class UserServlet extends BaseServlet {

​    public String login(HttpServletRequest request, HttpServletResponse response)      throws ServletException, IOException {

​        User user = new User();        user.setUserName(request.getParameter("userName"));        user.setUserPassword(request.getParameter("userPassword"));        request.getSession().setAttribute("USER", user);        return "index.jsp";    }}

可以看出在登录界面的时候刷新请求的tomcat已经由Nginx进行分发请求，登录之后再两个tomcta中已经共享了session

5、查看Redis对session的存储在对contex.xml文件进行配置的时候默认使用的database为0，通过redis-cli工具可看到

![4](D:\worksoft\somethingrepo\simplerepo\redis\4.png)

七、总结

tomcat-redis-session-manager是一个对用户完全透明的分布式session存储框架，用户只需要在tomcat中进行简单的配置，就可以使用，我们的业务代码是完全和单实例的时候的代码是一样的的，也就是写代码的时候完全不用担心你写的是一个多tomcat实例的代码，完全透明。

如何对框架的原理进行简单的理解，我们首先要知道，在请求过程中的session操作，首先要解析请求中的sessionId信息，然后将sessionId存储到request的参数列表中。然后再从 request获取session的时候，如果存在sessionId那么就根据Id从session池中获取session，如果sessionId不存在或者session失效，那么则新建session并且将session信息放入session池，供下次使用。

如果我们想自己写一个类似于tomcat-redis-session-manager的项目，我们应该知道Tomcat的Session管理机制，在默认的情况下Tomcat的Session管理，如果不进行设置的话是由Tomcat自带的StandardManager类进行控制的，我们可以根据这个类自定义一个Manager，**主要重写的就是org.apache.catalina.session.ManagerBase里边的具体写的操作**，这也是tomcat-redis-session-manager的基本原理，将tomcat的session存储位置指向了Redis

![5](D:\worksoft\somethingrepo\simplerepo\redis\5.png)

RedisSessionManager继承了org.apache.catalina.session.ManagerBase并重写了add、findSession、createEmptySession、remove等方法，并将对session的增删改查操作指向了对Redis数据存储的操作有兴趣可参考一篇Tomcat中session的管理机制：

http://www.cnblogs.com/interdrp/p/4935614.html