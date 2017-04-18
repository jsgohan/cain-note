反向代理配置：

    <proxy balancer://cluster>  
    #这些参数我们可以自己设定，ajp要和tomcat对应，我这里做了三个tomcat  
    BalancerMember ajp://localhost:8009 loadfactor=1 route=tomcat_1  smax=5 max=20 ttl=120 retry=300 timeout=15  
    BalancerMember ajp://localhost:9009 loadfactor=1 route=tomcat_2  smax=5 max=20 ttl=120 retry=300 timeout=15  
    BalancerMember ajp://localhost:7009 loadfactor=1 route=tomcat_3  smax=5 max=20 ttl=120 retry=300 timeout=15  
    # status=+H为配置热备，当所有机器都over时，才会请求该机器  
    #BalancerMember http://192.168.1.218:8009 status=+H  
    ProxySet lbmethod=bytraffic  
    </proxy> 
但是以上配置并没有解决session共享的问题，可以参考nginx+redis的形式实现session共享

配置静态服务器

```
#修改静态文件的路径指向
#DocumentRoot "D:/Apache2.2/htdocs" 默认指向
DocumentRoot "D:/Apache2.2/download" 
 
#配置权限
<Directory />
   Options Indexes FollowSymLinks
    AllowOverride None
    Order deny,allow
    Allow from all
</Directory>
```

