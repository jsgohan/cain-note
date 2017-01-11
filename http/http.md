# http 学习 #
![](http://i.imgur.com/SmcLRqL.png)
![](http://i.imgur.com/awh0LmB.png)
## HTTP协议简介

>http协议(超文本传输协议HyperText Transfer Protocol)，它是基于TCP协议的应用层传输协议，简单来说就是客户端和服务端进行数据传输的一种规则。

## URL
http url包含了用于查找某个资源的详细信息,格式如下

`http://host[":"port][abs_path]`

http表示要通过HTTP协议来定位网络资源，host表示合法的Internet主机域名或者IP地址，port指定一个端口号，为空则使用缺省端口80，abs_path指定请求资源的URI。

##HTTP请求
下图能很好的表达http请求的所发送的数据格式
![](http://i.imgur.com/0ejq5l6.png)
由上图可以看到，http请求由请求行，消息报头，请求正文三部分构成
### 请求行
请求行由请求方法，URL字段和HTTP协议版本三部分构成，总的来说请求行就是定义了本次请求的请求方式，请求的地址，以及所遵循的HTTP协议版本例如：

`GET /example.html HTTP/1.1 (CRLF)`

http协议的方法有
GET 请求获取Request-URI所标识的资源
POST 在Request-URI所标识的资源后附加新的数据
HEAD 请求获取由Request-URI所标识的资源的响应消息报头
PUT 请求服务器存储一个资源，并用Request-URI作为其标识
DELETE 请求服务器删除Request-URI所标识的资源
TRACE 请求服务器回送收到的请求信息，主要用于测试或诊断
CONNECT 保留将来使用
OPTIONS 请求查询服务器的性能，或者查询与资源相关的选项和需求

### 消息报头
消息报头由一系列的键值对组成，允许客户端向服务器端发送一些附加信息或者客户端自身的信息，主要包括
Accept
Accept请求报头域用于指定客户端接受哪些类型的信息。eg：Accept：image/gif，表明客户端希望接受GIF图象格式的资源；Accept：text/html，表明客户端希望接受html文本。
Accept-Charset
Accept-Charset请求报头域用于指定客户端接受的字符集。eg：Accept-Charset:iso-8859-1,gb2312.如果在请求消息中没有设置这个域，缺省是任何字符集都可以接受。
Accept-Encoding
Accept-Encoding请求报头域类似于Accept，但是它是用于指定可接受的内容编码。eg：Accept-Encoding:gzip.deflate.如果请求消息中没有设置这个域服务器假定客户端对各种内容编码都可以接受。
Accept-Language
Accept-Language请求报头域类似于Accept，但是它是用于指定一种自然语言。eg：Accept-Language:zh-cn.如果请求消息中没有设置这个报头域，服务器假定客户端对各种语言都可以接受。
Authorization
Authorization请求报头域主要用于证明客户端有权查看某个资源。当浏览器访问一个页面时，如果收到服务器的响应代码为401（未授权），可以发送一个包含Authorization请求报头域的请求，要求服务器对其进行验证。
Host（发送请求时，该报头域是必需的）
Host请求报头域主要用于指定被请求资源的Internet主机和端口号，它通常从HTTP URL中提取出来的
User-Agent
我们上网登陆论坛的时候，往往会看到一些欢迎信息，其中列出了你的操作系统的名称和版本，你所使用的浏览器的名称和版本，这往往让很多人感到很神奇，实际上，服务器应用程序就是从User-Agent这个请求报头域中获取到这些信息。User-Agent请求报头域允许客户端将它的操作系统、浏览器和其它属性告诉服务器。不过，这个报头域不是必需的，如果我们自己编写一个浏览器，不使用User-Agent请求报头域，那么服务器端就无法得知我们的信息了。

### 请求正文

只有在发送post请求时才会有请求正文，get方法并没有请求正文

## HTTP响应

与http 请求类似，先上一张图

![](http://i.imgur.com/CxYTi4E.png)

http响应也由三部分组成，包括状态行，消息报头，响应正文

### 状态行

状态行也由三部分组成，包括HTTP协议的版本，请求结果即状态码，还有对状态码的文本描述。例如：

`HTTP/1.1 200 OK （CRLF）`

### 状态码

状态代码有三位数字组成，第一个数字定义了响应的类别，且有五种可能取值：
1xx：指示信息--表示请求已接收，继续处理
2xx：成功--表示请求已被成功接收、理解、接受
3xx：重定向--要完成请求必须进行更进一步的操作
4xx：客户端错误--请求有语法错误或请求无法实现
5xx：服务器端错误--服务器未能实现合法的请求
常见状态代码、状态描述、说明：
200 OK //客户端请求成功
400 Bad Request //客户端请求有语法错误，不能被服务器所理解
401 Unauthorized //请求未经授权，这个状态代码必须和WWW-Authenticate报 //头域一起使用
403 Forbidden //服务器收到请求，但是拒绝提供服务
404 Not Found //请求资源不存在，eg：输入了错误的URL
500 Internal Server Error //服务器发生不可预期的错误
503 Server Unavailable //服务器当前不能处理客户端的请求，一段时间后,可能恢复正常

### 消息报头

## 相应正文




>全文摘自[https://segmentfault.com/a/1190000004457479](https://segmentfault.com/a/1190000004457479 "简书")