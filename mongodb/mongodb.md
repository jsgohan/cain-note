# mongodb

如果你的电脑版本不能安装最新版本的mongodb，可以用如下链接的下载：

[下载可用版本地址](http://blog.csdn.net/marksinoberg/article/details/53489989)

## 配置环境变量

​	将bin目录配置到自己的电脑的环境变量中。

> 计算机–系统属性–高级系统设置–环境变量–path

## 配置数据路径

为了方便MongoDB找到数据位置，我们需要稍微的配置一下。用于临时开启mongodb数据库服务。如果有兴趣的话，也可以将其变为一个系统服务，这样也会更方便于使用。

>mongod –dbpath “数据文件夹路径”

出现下图所示信息说明数据库路径配置成功。

![配置1](D:\worksoft\somethingrepo\simplerepo\mongodb\配置1.png)

## 查看信息

为了更加清晰的开启mongodb神秘的面纱，可以利用浏览器查看详情。

> mongo 127.0.0.1:27017/admin

![配置2](D:\worksoft\somethingrepo\simplerepo\mongodb\连接数据库.png)

## 登陆

> mongo 127.0.0.1:27017/admin

## 显示数据库信息

类比MySQL，查看系统内拥有的数据库信息。

> show databases; 
> mongodb也是类似，只不过命令名称不同罢了。 
> show dbs;

![配置3](D:\worksoft\somethingrepo\simplerepo\mongodb\显示数据库.png)

## 选择数据库

在MySQL中，要想使用一个指定的数据库，可以使用：

> use DatabaseName;

在MongoDB中，同样如此：

> use foobar

![配置4](D:\worksoft\somethingrepo\simplerepo\mongodb\选择数据库.png)

## 显示表/文档信息

在关系型数据库中，查看某一个数据库中有哪些表，可以使用：

> show tables;

在MongoDB这种非关系型数据库中，原理其实是差不多的。但是概念上来讲稍有出入。比如NoSQL中称表为文档（collection）。显示mongodb中文档的命令为：

> show collections; 

![配置5](D:\worksoft\somethingrepo\simplerepo\mongodb\显示表.png)

## 增删改查

与MySQL这种关系型数据库有所不同的是，NoSQL中的增删改查命令都有特定的使用方式。而且都是基于“条件”来实现的，这一点跟SQL语句可没什么关系啦。

- find()
- remove()
- update()
- insert()

## mongodb语法

### 连接

标准 URI 连接语法：

```
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

```

- **mongodb://** 这是固定的格式，必须要指定。
- **username:password@** 可选项，如果设置，在连接数据库服务器之后，驱动都会尝试登陆这个数据库
- **host1** 必须的指定至少一个host, host1 是这个URI唯一要填写的。它指定了要连接服务器的地址。如果要连接复制集，请指定多个主机地址。
- **portX** 可选的指定端口，如果不填，默认为27017
- **/database **如果指定username:password@，连接并验证登陆指定数据库。若不指定，默认打开admin数据库。
- **?options** 是连接选项。如果不使用/database，则前面需要加上/。所有连接选项都是键值对name=value，键值对之间通过&或;（分号）隔开

标准的连接格式包含了多个选项(options)，如下所示：

| 选项                  | 描述                                       |
| ------------------- | ---------------------------------------- |
| replicaSet=name     | 验证replica set的名称。 Impliesconnect=replicaSet. |
| slaveOk=true\|false | true:在connect=direct模式下，驱动会连接第一台机器，即使这台服务器不是主。在connect=replicaSet模式下，驱动会发送所有的写请求到主并且把读取操作分布在其他从服务器。false: 在 connect=direct模式下，驱动会自动找寻主服务器. 在connect=replicaSet 模式下，驱动仅仅连接主服务器，并且所有的读写命令都连接到主服务器。 |
| safe=true\|false    | true: 在执行更新操作之后，驱动都会发送getLastError命令来确保更新成功。(还要参考 wtimeoutMS).false: 在每次更新之后，驱动不会发送getLastError来确保更新成功。 |
| w=n                 | 驱动添加 { w : n } 到getLastError命令. 应用于safe=true。 |
| wtimeoutMS=ms       | 驱动添加 { wtimeout : ms } 到 getlasterror 命令. 应用于 safe=true. |
| fsync=true\|false   | true: 驱动添加 { fsync : true } 到 getlasterror 命令.应用于 safe=true.false: 驱动不会添加到getLastError命令中。 |
| journal=true\|false | 如果设置为 true, 同步到 journal (在提交到数据库前写入到实体中). 应用于 safe=true |
| connectTimeoutMS=ms | 可以打开连接的时间。                               |
| socketTimeoutMS=ms  | 发送和接受sockets的时间。                         |

### 实例

使用默认端口来连接 MongoDB 的服务。

```
mongodb://localhost
```

通过 shell 连接 MongoDB 服务：

```
$ ./mongo
MongoDB shell version: 3.0.6
connecting to: test
... 

```

这时候你返回查看运行 **./mongod** 命令的窗口，可以看到是从哪里连接到MongoDB的服务器，您可以看到如下信息：

```
……省略信息……
2015-09-25T17:22:27.336+0800 I CONTROL  [initandlisten] allocator: tcmalloc
2015-09-25T17:22:27.336+0800 I CONTROL  [initandlisten] options: { storage: { dbPath: "/data/db" } }
2015-09-25T17:22:27.350+0800 I NETWORK  [initandlisten] waiting for connections on port 27017
2015-09-25T17:22:36.012+0800 I NETWORK  [initandlisten] connection accepted from 127.0.0.1:37310 #1 (1 connection now open)  # 该行表明一个来自本机的连接

……省略信息……
```

#### MongoDB 连接命令格式

使用用户名和密码连接到 MongoDB 服务器，你必须使用 '**username:password@hostname/dbname**' 格式，'username'为用户名，'password' 为密码。

使用用户名和密码连接登陆到默认数据库：

```
$ ./mongo
MongoDB shell version: 3.0.6
connecting to: test

```

使用用户 admin 使用密码 123456 连接到本地的 MongoDB 服务上。输出结果如下所示：

```
> mongodb://admin:123456@localhost/
... 

```

使用用户名和密码连接登陆到指定数据库，格式如下：

```
mongodb://admin:123456@localhost/test
```

#### 更多连接实例

连接本地数据库服务器，端口是默认的。

```
mongodb://localhost
```

使用用户名fred，密码foobar登录localhost的admin数据库。

```
mongodb://fred:foobar@localhost
```

使用用户名fred，密码foobar登录localhost的baz数据库。

```
mongodb://fred:foobar@localhost/baz
```

连接 replica pair, 服务器1为example1.com服务器2为example2。

```
mongodb://example1.com:27017,example2.com:27017
```

连接 replica set 三台服务器 (端口 27017, 27018, 和27019):

```
mongodb://localhost,localhost:27018,localhost:27019
```

连接 replica set 三台服务器, 写入操作应用在主服务器 并且分布查询到从服务器。

```
mongodb://host1,host2,host3/?slaveOk=true
```

直接连接第一个服务器，无论是replica set一部分或者主服务器或者从服务器。

```
mongodb://host1,host2,host3/?connect=direct;slaveOk=true
```

当你的连接服务器有优先级，还需要列出所有服务器，你可以使用上述连接方式。

安全模式连接到localhost:

```
mongodb://localhost/?safe=true
```

以安全模式连接到replica set，并且等待至少两个复制服务器成功写入，超时时间设置为2秒。

```
mongodb://host1,host2,host3/?safe=true;w=2;wtimeoutMS=2000
```

### 创建数据库

#### 语法

MongoDB 创建数据库的语法格式如下：

```
use DATABASE_NAME
```

如果数据库不存在，则创建数据库，否则切换到指定数据库。

#### 实例

以下实例我们创建了数据库 runoob:

```
> use runoob
switched to db runoob
> db
runoob
> 
```

如果你想查看所有数据库，可以使用 **show dbs** 命令：

```
> show dbs
local  0.078GB
test   0.078GB
> 
```

可以看到，我们刚创建的数据库 runoob 并不在数据库的列表中， 要显示它，我们需要向 runoob 数据库插入一些数据。

```
> db.runoob.insert({"name":"菜鸟教程"})
WriteResult({ "nInserted" : 1 })
> show dbs
local   0.078GB
runoob  0.078GB
test    0.078GB
> 
```

MongoDB 中默认的数据库为 test，如果你没有创建新的数据库，集合将存放在 test 数据库中。

### 删除数据库

#### 语法

MongoDB 删除数据库的语法格式如下：

```
db.dropDatabase()
```

删除当前数据库，默认为 test，你可以使用 db 命令查看当前数据库名。

#### 实例

以下实例我们删除了数据库 runoob。

首先，查看所有数据库：

```
> show dbs
local   0.078GB
runoob  0.078GB
test    0.078GB
```

接下来我们切换到数据库 runoob：

```
> use runoob
switched to db runoob
> 
```

执行删除命令：

```
> db.dropDatabase()
{ "dropped" : "runoob", "ok" : 1 }
```

最后，我们再通过 show dbs 命令数据库是否删除成功：

```
> show dbs
local  0.078GB
test   0.078GB
> 
```

#### 删除集合

集合删除语法格式如下：

```
db.collection.drop()
```

以下实例删除了 runoob 数据库中的集合 site：

```
> use runoob
switched to db runoob
> show tables
site
> db.site.drop()
true
> show tables
> 
```

### 插入文档

MongoDB 使用 insert() 或 save() 方法向集合中插入文档，语法如下：

```
db.COLLECTION_NAME.insert(document)
```

#### 实例

以下文档可以存储在 MongoDB 的 runoob 数据库 的 col集合中：

```
>db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

以上实例中 col 是我们的集合名，前一章节我们已经创建过了，如果该集合不在该数据库中， MongoDB 会自动创建该集合并插入文档。

查看已插入文档：

```
> db.col.find()
{ "_id" : ObjectId("56064886ade2f21f36b03134"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "mongodb", "database", "NoSQL" ], "likes" : 100 }
> 
```

我们也可以将数据定义为一个变量，如下所示：

```
> document=({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
});
```

执行后显示结果如下：

```
{
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```

执行插入操作：

```
> db.col.insert(document)
WriteResult({ "nInserted" : 1 })
> 
```

插入文档你也可以使用 db.col.save(document) 命令。如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。

### 更新文档

#### update() 方法

update() 方法用于更新已存在的文档。语法格式如下：

```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

##### **参数说明：**

- **query **: update的查询条件，类似sql update查询内where后面的。
- **update **: update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- **upsert **: 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi **: 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern **:可选，抛出异常的级别。

#### 实例

我们在集合 col 中插入如下数据：

```
>db.col.insert({
    title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

接着我们通过 update() 方法来更新标题(title):

```
>db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })   # 输出信息
> db.col.find().pretty()
{
        "_id" : ObjectId("56064f89ade2f21f36b03136"),
        "title" : "MongoDB",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
>
```

可以看到标题(title)由原来的 "MongoDB 教程" 更新为了 "MongoDB"。

以上语句只会修改第一条发现的文档，如果你要修改多条相同的文档，则需要设置 multi 参数为 true。

```
>db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true})
```

#### save() 方法

save() 方法通过传入的文档来替换已有文档。语法格式如下：

```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```

##### **参数说明：**

- **document **: 文档数据。
- **writeConcern **:可选，抛出异常的级别。

#### 实例

以下实例中我们替换了 _id 为 56064f89ade2f21f36b03136 的文档数据：

```
>db.col.save({
	"_id" : ObjectId("56064f89ade2f21f36b03136"),
    "title" : "MongoDB",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Runoob",
    "url" : "http://www.runoob.com",
    "tags" : [
            "mongodb",
            "NoSQL"
    ],
    "likes" : 110
})
```

替换成功后，我们可以通过 find() 命令来查看替换后的数据

```
>db.col.find().pretty()
{
        "_id" : ObjectId("56064f89ade2f21f36b03136"),
        "title" : "MongoDB",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "Runoob",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "NoSQL"
        ],
        "likes" : 110
}
> 
```

### 删除文档

#### 语法

remove() 方法的基本语法格式如下所示：

```
db.collection.remove(
   <query>,
   <justOne>
)
```

如果你的 MongoDB 是 2.6 版本以后的，语法格式如下：

```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

##### **参数说明：**

- **query **:（可选）删除的文档的条件。
- **justOne **: （可选）如果设为 true 或 1，则只删除一个文档。
- **writeConcern **:（可选）抛出异常的级别。

#### 实例

以下文档我们执行两次插入操作：

```
>db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

使用 find() 函数查询数据：

```
> db.col.find()
{ "_id" : ObjectId("56066169ade2f21f36b03137"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "mongodb", "database", "NoSQL" ], "likes" : 100 }
{ "_id" : ObjectId("5606616dade2f21f36b03138"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "mongodb", "database", "NoSQL" ], "likes" : 100 }
```

接下来我们移除 title 为 'MongoDB 教程' 的文档：

```
>db.col.remove({'title':'MongoDB 教程'})
WriteResult({ "nRemoved" : 2 })           # 删除了两条数据
>db.col.find()
……                                        # 没有数据
```

------

如果你只想删除第一条找到的记录可以设置 justOne 为 1，如下所示：

```
>db.COLLECTION_NAME.remove(DELETION_CRITERIA,1)
```

如果你想删除所有数据，可以使用以下方式（类似常规 SQL 的 truncate 命令）：

```
>db.col.remove({})
>db.col.find()
>
```

### 查询文档

#### 语法

MongoDB 查询数据的语法格式如下：

```
>db.COLLECTION_NAME.find()
```

find() 方法以非结构化的方式来显示所有文档。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：

```
>db.col.find().pretty()
```

pretty() 方法以格式化的方式来显示所有文档。

#### 实例

以下实例我们查询了集合 col 中的数据：

```
> db.col.find().pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```

除了 find() 方法之外，还有一个 findOne() 方法，它只返回一个文档。

------

#### MongoDB 与 RDBMS Where 语句比较

如果你熟悉常规的 SQL 数据，通过下表可以更好的理解 MongoDB 的条件语句查询：

| 操作    | 格式                       | 范例                                       | RDBMS中的类似语句         |
| ----- | ------------------------ | ---------------------------------------- | ------------------- |
| 等于    | `{<key>:<value>`}        | `db.col.find({"by":"菜鸟教程"}).pretty()`    | `where by = '菜鸟教程'` |
| 小于    | `{<key>:{$lt:<value>}}`  | `db.col.find({"likes":{$lt:50}}).pretty()` | `where likes < 50`  |
| 小于或等于 | `{<key>:{$lte:<value>}}` | `db.col.find({"likes":{$lte:50}}).pretty()` | `where likes <= 50` |
| 大于    | `{<key>:{$gt:<value>}}`  | `db.col.find({"likes":{$gt:50}}).pretty()` | `where likes > 50`  |
| 大于或等于 | `{<key>:{$gte:<value>}}` | `db.col.find({"likes":{$gte:50}}).pretty()` | `where likes >= 50` |
| 不等于   | `{<key>:{$ne:<value>}}`  | `db.col.find({"likes":{$ne:50}}).pretty()` | `where likes != 50` |

------

#### MongoDB AND 条件

MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，及常规 SQL 的 AND 条件。

语法格式如下：

```
>db.col.find({key1:value1, key2:value2}).pretty()
```

##### 实例

以下实例通过 **by** 和 **title** 键来查询 **菜鸟教程** 中 **MongoDB 教程** 的数据

```
> db.col.find({"by":"菜鸟教程", "title":"MongoDB 教程"}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```

以上实例中类似于 WHERE 语句：**WHERE by='菜鸟教程' AND title='MongoDB 教程'**

------

#### MongoDB OR 条件

MongoDB OR 条件语句使用了关键字 **$or**,语法格式如下：

```
>db.col.find(
   {
      $or: [
	     {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

##### 实例

以下实例中，我们演示了查询键 **by** 值为 菜鸟教程 或键 **title** 值为 **MongoDB 教程** 的文档。

```
>db.col.find({$or:[{"by":"菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
>
```

------

#### AND 和 OR 联合使用

以下实例演示了 AND 和 OR 联合使用，类似常规 SQL 语句为： **'where likes>50 AND (by = '菜鸟教程' OR title = 'MongoDB 教程')'**

```
>db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```

### 条件操作符

MongoDB中条件操作符有：

- (>) 大于 - $gt
- (<) 小于 - $lt
- (>=) 大于等于 - $gte
- (<= ) 小于等于 - $lte

##### MongoDB (>) 大于操作符 - $gt

如果你想获取 "col" 集合中 "likes" 大于 100 的数据，你可以使用以下命令：

```
db.col.find({"likes" : {$gt : 100}})
```

类似于SQL语句：

```
Select * from col where likes > 100;
```

##### MongoDB（>=）大于等于操作符 - $gte

如果你想获取"col"集合中 "likes" 大于等于 100 的数据，你可以使用以下命令：

```
db.col.find({likes : {$gte : 100}})
```

类似于SQL语句：

```
Select * from col where likes >=100;
```

##### MongoDB (<) 小于操作符 - $lt

如果你想获取"col"集合中 "likes" 小于 150 的数据，你可以使用以下命令：

```
db.col.find({likes : {$lt : 150}})
```

类似于SQL语句：

```
Select * from col where likes < 150;
```

##### MongoDB (<=) 小于操作符 - $lte

如果你想获取"col"集合中 "likes" 小于等于 150 的数据，你可以使用以下命令：

```
db.col.find({likes : {$lte : 150}})
```

类似于SQL语句：

```
Select * from col where likes <= 150;
```

##### MongoDB 使用 (<) 和 (>) 查询 - $lt 和 $gt

如果你想获取"col"集合中 "likes" 大于100，小于 200 的数据，你可以使用以下命令：

```
db.col.find({likes : {$lt :200, $gt : 100}})
```

类似于SQL语句：

```
Select * from col where likes>100 AND  likes<200;
```

### $type操作符

MongoDB 中可以使用的类型如下表所示：

| **类型**                  | **数字** | **备注**           |
| ----------------------- | ------ | ---------------- |
| Double                  | 1      |                  |
| String                  | 2      |                  |
| Object                  | 3      |                  |
| Array                   | 4      |                  |
| Binary data             | 5      |                  |
| Undefined               | 6      | 已废弃。             |
| Object id               | 7      |                  |
| Boolean                 | 8      |                  |
| Date                    | 9      |                  |
| Null                    | 10     |                  |
| Regular Expression      | 11     |                  |
| JavaScript              | 13     |                  |
| Symbol                  | 14     |                  |
| JavaScript (with scope) | 15     |                  |
| 32-bit integer          | 16     |                  |
| Timestamp               | 17     |                  |
| 64-bit integer          | 18     |                  |
| Min key                 | 255    | Query with `-1`. |
| Max key                 | 127    |                  |

#### MongoDB 操作符 - $type 实例

如果想获取 "col" 集合中 title 为 String 的数据，你可以使用以下命令：

```
db.col.find({"title" : {$type : 2}})
```

输出结果为：

```
{ "_id" : ObjectId("56066542ade2f21f36b0313a"), "title" : "PHP 教程", "description" : "PHP 是一种创建动态交互性站点的强有力的服务器端脚本语言。", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "php" ], "likes" : 200 }
{ "_id" : ObjectId("56066549ade2f21f36b0313b"), "title" : "Java 教程", "description" : "Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "java" ], "likes" : 150 }
{ "_id" : ObjectId("5606654fade2f21f36b0313c"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "mongodb" ], "likes" : 100 }
```

### limit()方法

limit()方法基本语法如下所示：

```
>db.COLLECTION_NAME.find().limit(NUMBER)
```

### 实例

集合 col 中的数据如下：

```
{ "_id" : ObjectId("56066542ade2f21f36b0313a"), "title" : "PHP 教程", "description" : "PHP 是一种创建动态交互性站点的强有力的服务器端脚本语言。", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "php" ], "likes" : 200 }
{ "_id" : ObjectId("56066549ade2f21f36b0313b"), "title" : "Java 教程", "description" : "Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "java" ], "likes" : 150 }
{ "_id" : ObjectId("5606654fade2f21f36b0313c"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "mongodb" ], "likes" : 100 }
```

以上实例为显示查询文档中的两条记录：

```
> db.col.find({},{"title":1,_id:0}).limit(2)
{ "title" : "PHP 教程" }
{ "title" : "Java 教程" }
```

### Skip()方法

跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数。

skip() 方法脚本语法格式如下：

```
>db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
```

### 实例

以上实例只会显示第二条文档数据

```
>db.col.find({},{"title":1,_id:0}).limit(1).skip(1)
{ "title" : "Java 教程" }
>
```

**注:**skip()方法默认参数为 0 。

### 排序

sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。

sort()方法基本语法如下所示：

```
>db.COLLECTION_NAME.find().sort({KEY:1})
```

### 索引

索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。

这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。

索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构

MongoDB使用 ensureIndex() 方法来创建索引。

#### 语法

ensureIndex()方法基本语法格式如下所示：

```
>db.COLLECTION_NAME.ensureIndex({KEY:1})
```

语法中 Key 值为你要创建的索引字段，1为指定按升序创建索引，如果你想按降序来创建索引指定为-1即可。

#### 实例

```
>db.col.ensureIndex({"title":1})
>
```

ensureIndex() 方法中你也可以设置使用多个字段创建索引（关系型数据库中称作复合索引）。

```
>db.col.ensureIndex({"title":1,"description":-1})
>
```

ensureIndex() 接收可选参数，可选参数列表如下：

| Parameter          | Type          | Description                              |
| ------------------ | ------------- | ---------------------------------------- |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**.   |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | 在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 **false**. |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。         |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。       |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语      |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |

#### 实例

在后台创建索引：

```
db.values.ensureIndex({open: 1, close: 1}, {background: true})
```

通过在创建索引时加background:true 的选项，让创建工作在后台执行

### 聚合

MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)。

#### aggregate() 方法

MongoDB中聚合的方法使用aggregate()。

##### 语法

aggregate() 方法的基本语法格式如下所示：

```
>db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```

使用aggregate()计算结果如下：

```
> db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
{
   "result" : [
      {
         "_id" : "w3cschool.cc",
         "num_tutorial" : 2
      },
      {
         "_id" : "Neo4j",
         "num_tutorial" : 1
      }
   ],
   "ok" : 1
}
>
```

以上实例类似sql语句：* select by_user, count(\*) from mycol group by by_user*

在上面的例子中，我们通过字段by_user字段对数据进行分组，并计算by_user字段相同值的总和。

下表展示了一些聚合的表达式:

| 表达式       | 描述                      | 实例                                       |
| --------- | ----------------------- | ---------------------------------------- |
| $sum      | 计算总和。                   | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| $avg      | 计算平均值                   | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| $min      | 获取集合中所有文档对应值得最小值。       | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max      | 获取集合中所有文档对应值得最大值。       | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| $push     | 在结果文档中插入值到一个数组中。        | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}]) |
| $addToSet | 在结果文档中插入值到一个数组中，但不创建副本。 | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}]) |
| $first    | 根据资源文档的排序获取第一个文档数据。     | db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]) |
| $last     | 根据资源文档的排序获取最后一个文档数据     | db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]) |

### 管道的概念

管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。

MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

表达式：处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。

这里我们介绍一下聚合框架中常用的几个操作：

- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
- $limit：用来限制MongoDB聚合管道返回的文档数。
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- $group：将集合中的文档分组，可用于统计结果。
- $sort：将输入文档排序后输出。
- $geoNear：输出接近某一地理位置的有序文档。

### 管道操作符实例

1、$project实例

```
db.article.aggregate(
    { $project : {
        title : 1 ,
        author : 1 ,
    }}
 );
```

这样的话结果中就只还有_id,tilte和author三个字段了，默认情况下_id字段是被包含的，如果要想不包含_id话可以这样:

```
db.article.aggregate(
    { $project : {
        _id : 0 ,
        title : 1 ,
        author : 1
    }});
```

2.$match实例

```
db.articles.aggregate( [
                        { $match : { score : { $gt : 70, $lte : 90 } } },
                        { $group: { _id: null, count: { $sum: 1 } } }
                       ] );
```

$match用于获取分数大于70小于或等于90记录，然后将符合条件的记录送到下一阶段$group管道操作符进行处理。

3.$skip实例

```
db.article.aggregate(
    { $skip : 5 });

```

经过$skip管道操作符处理后，前五个文档被"过滤"掉。

### 复制(副本集)

MongoDB复制是将数据同步在多个服务器的过程。

复制提供了数据的冗余备份，并在多个服务器上存储数据副本，提高了数据的可用性， 并可以保证数据的安全性。

复制还允许您从硬件故障和服务中断中恢复数据。

#### 什么是复制?

- 保障数据的安全性
- 数据高可用性 (24*7)
- 灾难恢复
- 无需停机维护（如备份，重建索引，压缩）
- 分布式读取数据

#### MongoDB复制原理

mongodb的复制至少需要两个节点。其中一个是主节点，负责处理客户端请求，其余的都是从节点，负责复制主节点上的数据。

mongodb各个节点常见的搭配方式为：一主一从、一主多从。

主节点记录在其上的所有操作oplog，从节点定期轮询主节点获取这些操作，然后对自己的数据副本执行这些操作，从而保证从节点的数据与主节点一致。

MongoDB复制结构图如下所示：

![复制(副本集)](D:\worksoft\somethingrepo\simplerepo\mongodb\复制(副本集).png)

以上结构图总，客户端总主节点读取数据，在客户端写入数据到主节点是， 主节点与从节点进行数据交互保障数据的一致性。

### 副本集特征：

- N 个节点的集群
- 任何节点可作为主节点
- 所有写入操作都在主节点上
- 自动故障转移
- 自动恢复

## MongoDB副本集设置

在本教程中我们使用同一个MongoDB来做MongoDB主从的实验， 操作步骤如下：

1、关闭正在运行的MongoDB服务器。

现在我们通过指定 --replSet 选项来启动mongoDB。--replSet 基本语法格式如下：

```
mongod --port "PORT" --dbpath "YOUR_DB_DATA_PATH" --replSet "REPLICA_SET_INSTANCE_NAME"
```

### 实例

```
mongod --port 27017 --dbpath "D:\set up\mongodb\data" --replSet rs0
```

以上实例会启动一个名为rs0的MongoDB实例，其端口号为27017。

启动后打开命令提示框并连接上mongoDB服务。

在Mongo客户端使用命令rs.initiate()来启动一个新的副本集。

我们可以使用rs.conf()来查看副本集的配置

查看副本集状态使用 rs.status() 命令

------

#### 副本集添加成员

添加副本集的成员，我们需要使用多条服务器来启动mongo服务。进入Mongo客户端，并使用rs.add()方法来添加副本集的成员。

##### 语法

rs.add() 命令基本语法格式如下：

```
>rs.add(HOST_NAME:PORT)
```

##### 实例

假设你已经启动了一个名为mongod1.net，端口号为27017的Mongo服务。 在客户端命令窗口使用rs.add() 命令将其添加到副本集中，命令如下所示：

```
>rs.add("mongod1.net:27017")
>
```

MongoDB中你只能通过主节点将Mongo服务添加到副本集中， 判断当前运行的Mongo服务是否为主节点可以使用命令db.isMaster() 。

MongoDB的副本集与我们常见的主从有所不同，主从在主机宕机后所有服务将停止，而副本集在主机宕机后，副本会接管主节点成为主节点，不会出现宕机的情况。

### 分片

在Mongodb里面存在另一种集群，就是分片技术,可以满足MongoDB数据量大量增长的需求。

当MongoDB存储海量的数据时，一台机器可能不足以存储数据，也可能不足以提供可接受的读写吞吐量。这时，我们就可以通过在多台机器上分割数据，使得数据库系统能存储和处理更多的数据。

#### 为什么使用分片

- 复制所有的写入操作到主节点
- 延迟的敏感数据会在主节点查询
- 单个副本集限制在12个节点
- 当请求量巨大时会出现内存不足。
- 本地磁盘不足
- 垂直扩展价格昂贵

下图展示了在MongoDB中使用分片集群结构分布：

![分片](D:\worksoft\somethingrepo\simplerepo\mongodb\分片.png)

上图中主要有如下所述三个主要组件：

- **Shard:**用于存储实际的数据块，实际生产环境中一个shard server角色可由几台机器组个一个replica set承担，防止主机单点故障
- **Config Server:**mongod实例，存储了整个 ClusterMetadata，其中包括 chunk信息。
- **Query Routers:**前端路由，客户端由此接入，且让整个集群看上去像单一数据库，前端应用可以透明使用。

#### 分片实例

分片结构端口分布如下：

```
Shard Server 1：27020
Shard Server 2：27021
Shard Server 3：27022
Shard Server 4：27023
Config Server ：27100
Route Process：40000

```

步骤一：启动Shard Server

```
[root@100 /]# mkdir -p /www/mongoDB/shard/s0
[root@100 /]# mkdir -p /www/mongoDB/shard/s1
[root@100 /]# mkdir -p /www/mongoDB/shard/s2
[root@100 /]# mkdir -p /www/mongoDB/shard/s3
[root@100 /]# mkdir -p /www/mongoDB/shard/log
[root@100 /]# /usr/local/mongoDB/bin/mongod --port 27020 --dbpath=/www/mongoDB/shard/s0 --logpath=/www/mongoDB/shard/log/s0.log --logappend --fork
....
[root@100 /]# /usr/local/mongoDB/bin/mongod --port 27023 --dbpath=/www/mongoDB/shard/s3 --logpath=/www/mongoDB/shard/log/s3.log --logappend --fork

```

步骤二： 启动Config Server

```
[root@100 /]# mkdir -p /www/mongoDB/shard/config
[root@100 /]# /usr/local/mongoDB/bin/mongod --port 27100 --dbpath=/www/mongoDB/shard/config --logpath=/www/mongoDB/shard/log/config.log --logappend --fork

```

**注意：**这里我们完全可以像启动普通mongodb服务一样启动，不需要添加—shardsvr和configsvr参数。因为这两个参数的作用就是改变启动端口的，所以我们自行指定了端口就可以。

步骤三： 启动Route Process

```
/usr/local/mongoDB/bin/mongos --port 40000 --configdb localhost:27100 --fork --logpath=/www/mongoDB/shard/log/route.log --chunkSize 500

```

mongos启动参数中，chunkSize这一项是用来指定chunk的大小的，单位是MB，默认大小为200MB.

步骤四： 配置Sharding

接下来，我们使用MongoDB Shell登录到mongos，添加Shard节点

```
[root@100 shard]# /usr/local/mongoDB/bin/mongo admin --port 40000
MongoDB shell version: 2.0.7
connecting to: 127.0.0.1:40000/admin
mongos> db.runCommand({ addshard:"localhost:27020" })
{ "shardAdded" : "shard0000", "ok" : 1 }
......
mongos> db.runCommand({ addshard:"localhost:27029" })
{ "shardAdded" : "shard0009", "ok" : 1 }
mongos> db.runCommand({ enablesharding:"test" }) #设置分片存储的数据库
{ "ok" : 1 }
mongos> db.runCommand({ shardcollection: "test.log", key: { id:1,time:1}})
{ "collectionsharded" : "test.log", "ok" : 1 }

```

步骤五： 程序代码内无需太大更改，直接按照连接普通的mongo数据库那样，将数据库连接接入接口40000

### node.js mongodb

#### 安装驱动

使用了[淘宝定制的 cnpm 命令](http://www.runoob.com/nodejs/nodejs-npm.html#taobaonpm)进行安装：

```
$ cnpm install mongodb
```

## 数据库操作( CURD )

与 MySQL 不同的是 MongoDB 会自动创建数据库和集合，所以使用前我们不需要手动去创建。

### 插入数据

以下实例我们连接数据库 runoob 的 site 表，并插入两条数据：

## 插入数据

```
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; # 数据库为 runoob 
var insertData = function(db, callback) {      
  //连接到表 site    
  var collection = db.collection('site');    
  //插入数据    
  var data = [{"name":"菜鸟教程","url":"www.runoob.com"},
              {"name":"菜鸟工具","url":"c.runoob.com"}];  
  collection.insert(data, function(err, result) {         
    if(err) {            
        console.log('Error:'+ err);            
        return;        
    }             
    callback(result);    
  });
} 
MongoClient.connect(DB_CONN_STR, function(err, db) {    
	console.log("连接成功！");    
	insertData(db, function(result) {        
		console.log(result);        
		db.close();    
	});
});
```

执行以下命令输出就结果为：

```
$ node test.js
连接成功！
{ result: { ok: 1, n: 2 },
  ops: 
   [ { name: '菜鸟教程',
       url: 'www.runoob.com',
       _id: 58c25e13a08de70d3b9d4116 },
     { name: '菜鸟工具',
       url: 'c.runoob.com',
       _id: 58c25e13a08de70d3b9d4117 } ],
  insertedCount: 2,
  insertedIds: [ 58c25e13a08de70d3b9d4116, 58c25e13a08de70d3b9d4117 ] }
```

从输出结果来看，数据已插入成功。

我们也可以打开 MongoDB 的客户端查看数据，如：

```
> show dbs
admin   0.000GB
local   0.000GB
runoob  0.000GB          # 自动创建了 runoob 数据库
> show tables
site                     # 自动创建了 site 集合（数据表）
> db.site.find()         # 查看集合中的数据
{ "_id" : ObjectId("58c25f300cd56e0d7ddfc0c8"), "name" : "菜鸟教程", "url" : "www.runoob.com" }
{ "_id" : ObjectId("58c25f300cd56e0d7ddfc0c9"), "name" : "菜鸟工具", "url" : "c.runoob.com" }
> 
```

## 在node项目中使用monogDB

1、导入monogDB连接模块，express 官方介绍的是mongoskin模块，这个我就不说了，这里介绍通过mongoose安装

2、在myapp项目下执行命令 npm install mongoose -save 安装保存到node_modules，也可以在package.json中配置"mongoose": "^4.4.12",然后命令npm install 安装。

3、在app.js文件中

　a、导入mongoose模块：  

var mongoose = require('mongoose');
  b、创建数据库连接

mongoose.connect('mongodb://localhost/myDB') //连接本地数据库
 4、在项目根目录下新建文件夹schemas，这个是数据集模块，在模块下新建users.js文件

```
var mongoose = require('mongoose');

//申明一个mongoons对象
var UsersSchema = new mongoose.Schema({
 name: String,
 paw: String,
 meta: { 
  createAt: {
   type: Date,
   default: Date.now()
  },
  updateAt: {
   type: Date,
   default: Date.now()
  }
 }
})

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function(next) {
 if(this.isNew) {
  this.meta.createAt = this.meta.updateAt = Date.now();
 }else {
  this.meta.updateAt = Date.now();
 }

 next();
})

//查询的静态方法
UsersSchema.statics = {
 fetch: function(cb) { //查询所有数据
  return this
   .find()
   .sort('meta.updateAt') //排序
   .exec(cb) //回调
 },
 findById: function(id, cb) { //根据id查询单条数据
  return this
   .findOne({_id: id})   
   .exec(cb)
 }
}

//暴露出去的方法
module.exports = UsersSchema 

```

5、在根目录新增models文件，这个是数据模型模块，在模块下新增users.js文件

```
 var mongoose = require('mongoose')
 var UsersSchema = require('../schemas/users') //拿到导出的数据集模块
 var Users = mongoose.model('Users', UsersSchema) // 编译生成Model模型
 
 module.exports = Users
```

 6、在routes文件中的users.js文件中添加路由控制器代码

```
var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块

var Users = require('../models/users');//导入模型数据模块

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.send('respond with a resource');
});

//查询所有用户数据
router.get('/users', function(req, res, next) {
 Users.fetch(function(err, users) {
  if(err) {
   console.log(err);
  }  
  res.render('users',{title: '用户列表', users: users}) //这里也可以json的格式直接返回数据res.json({data: users});
 })
})
module.exports = router;

```

7、在views文件下新增users.jade

```
extends layout

block content
 h1= title //jade取值方式
 ul
 each user in users //jade模版的遍历方式
  li
  h4 #{user.name} 
  span #{user.paw}

```

8、最后在浏览器中打开网址：http://localhost:3000/users/users，查看效果。到这里一个从数据库到前端展现的项目就完成了。