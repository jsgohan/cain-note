# node

### 全局对象和全局变量

Node提供以下几个全局对象，它们是所有模块都可以调用的。

- **global**：表示Node所在的全局环境，类似于浏览器的window对象。需要注意的是，如果在浏览器中声明一个全局变量，实际上是声明了一个全局对象的属性，比如`var x = 1`等同于设置`window.x = 1`，但是Node不是这样，至少在模块中不是这样（REPL环境的行为与浏览器一致）。在模块文件中，声明`var x = 1`，该变量不是`global`对象的属性，`global.x`等于undefined。这是因为模块的全局变量都是该模块私有的，其他模块无法取到。
- **process**：该对象表示Node所处的当前进程，允许开发者与该进程互动。
- **console**：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。

Node还提供一些全局函数。

- **setTimeout()**：用于在指定毫秒之后，运行回调函数。实际的调用间隔，还取决于系统因素。间隔的毫秒数在1毫秒到2,147,483,647毫秒（约24.8天）之间。如果超过这个范围，会被自动改为1毫秒。该方法返回一个整数，代表这个新建定时器的编号。
- **clearTimeout()**：用于终止一个setTimeout方法新建的定时器。
- **setInterval()**：用于每隔一定毫秒调用回调函数。由于系统因素，可能无法保证每次调用之间正好间隔指定的毫秒数，但只会多于这个间隔，而不会少于它。指定的毫秒数必须是1到2,147,483,647（大约24.8天）之间的整数，如果超过这个范围，会被自动改为1毫秒。该方法返回一个整数，代表这个新建定时器的编号。
- **clearInterval()**：终止一个用setInterval方法新建的定时器。
- **require()**：用于加载模块。
- **Buffer()**：用于操作二进制数据。

Node提供两个全局变量，都以两个下划线开头。

- `__filename`：指向当前运行的脚本文件名。
- `__dirname`：指向当前运行的脚本所在的目录。

### 核心模块

如果只是在服务器运行JavaScript代码，用处并不大，因为服务器脚本语言已经有很多种了。Node.js的用处在于，它本身还提供了一系列功能模块，与操作系统互动。这些核心的功能模块，不用安装就可以使用，下面是它们的清单。

- **http**：提供HTTP服务器功能。
- **url**：解析URL。
- **fs**：与文件系统交互。
- **querystring**：解析URL的查询字符串。
- **child_process**：新建子进程。
- **util**：提供一系列实用小工具。
- **path**：处理文件路径。
- **crypto**：提供加密和解密功能，基本上是对OpenSSL的包装。

上面这些核心模块，源码都在Node的lib子目录中。为了提高运行速度，它们安装时都会被编译成二进制文件。

核心模块总是最优先加载的。如果你自己写了一个HTTP模块，`require('http')`加载的还是核心模块。

## require命令

### 基本用法

Node使用CommonJS模块规范，内置的`require`命令用于加载模块文件。

`require`命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。

```
// example.js
var invisible = function () {
  console.log("invisible");
}

exports.message = "hi";

exports.say = function () {
  console.log(message);
}

```

运行下面的命令，可以输出exports对象。

```
var example = require('./example.js');
example
// {
//   message: "hi",
//   say: [Function]
// }

```

如果模块输出的是一个函数，那就不能定义在exports对象上面，而要定义在`module.exports`变量上面。

```
module.exports = function () {
  console.log("hello world")
}

require('./example2.js')()

```

上面代码中，require命令调用自身，等于是执行`module.exports`，因此会输出 hello world。

### 加载规则

`require`命令用于加载文件，后缀名默认为`.js`。

```
var foo = require('foo');
//  等同于
var foo = require('foo.js');

```

根据参数的不同格式，`require`命令去不同路径寻找模块文件。

（1）如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。比如，`require('/home/marco/foo.js')`将加载`/home/marco/foo.js`。

（2）如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，`require('./circle')`将加载当前脚本同一目录的`circle.js`。

（3）如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）。

举例来说，脚本`/home/user/projects/foo.js`执行了`require('bar.js')`命令，Node会依次搜索以下文件。

- /usr/local/lib/node/bar.js
- /home/user/projects/node_modules/bar.js
- /home/user/node_modules/bar.js
- /home/node_modules/bar.js
- /node_modules/bar.js

这样设计的目的是，使得不同的模块可以将所依赖的模块本地化。

（4）如果参数字符串不以“./“或”/“开头，而且是一个路径，比如`require('example-module/path/to/file')`，则将先找到`example-module`的位置，然后再以它为参数，找到后续路径。

（5）如果指定的模块文件没有发现，Node会尝试为文件名添加`.js`、`.json`、`.node`后，再去搜索。`.js`件会以文本格式的JavaScript脚本文件解析，`.json`文件会以JSON格式的文本文件解析，`.node`文件会以编译后的二进制文件解析。

（6）如果想得到`require`命令加载的确切文件名，使用`require.resolve()`方法。

### 目录的加载规则

通常，我们会把相关的文件会放在一个目录里面，便于组织。这时，最好为该目录设置一个入口文件，让`require`方法可以通过这个入口文件，加载整个目录。

在目录中放置一个`package.json`文件，并且将入口文件写入`main`字段。下面是一个例子。

```
// package.json
{ "name" : "some-library",
  "main" : "./lib/some-library.js" }

```

`require`发现参数字符串指向一个目录以后，会自动查看该目录的`package.json`文件，然后加载`main`字段指定的入口文件。如果`package.json`文件没有`main`字段，或者根本就没有`package.json`文件，则会加载该目录下的`index.js`文件或`index.node`文件。

### 模块的缓存

第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的`module.exports`属性。

```
require('./example.js');
require('./example.js').message = "hello";
require('./example.js').message
// "hello"

```

上面代码中，连续三次使用`require`命令，加载同一个模块。第二次加载的时候，为输出的对象添加了一个`message`属性。但是第三次加载的时候，这个message属性依然存在，这就证明`require`命令并没有重新加载模块文件，而是输出了缓存。

如果想要多次执行某个模块，可以让该模块输出一个函数，然后每次`require`这个模块的时候，重新执行一下输出的函数。

所有缓存的模块保存在`require.cache`之中，如果想删除模块的缓存，可以像下面这样写。

```
// 删除指定模块的缓存
delete require.cache[moduleName];

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key];
})

```

注意，缓存是根据绝对路径识别模块的，如果同样的模块名，但是保存在不同的路径，`require`命令还是会重新加载该模块。

### 环境变量NODE_PATH

Node执行一个脚本时，会先查看环境变量`NODE_PATH`。它是一组以冒号分隔的绝对路径。在其他位置找不到指定模块时，Node会去这些路径查找。

可以将NODE_PATH添加到`.bashrc`。

```
export NODE_PATH="/usr/local/lib/node"

```

所以，如果遇到复杂的相对路径，比如下面这样。

```
var myModule = require('../../../../lib/myModule');

```

有两种解决方法，一是将该文件加入`node_modules`目录，二是修改`NODE_PATH`环境变量，`package.json`文件可以采用下面的写法。

```
{
  "name": "node_path",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "NODE_PATH=lib node index.js"
  },
  "author": "",
  "license": "ISC"
}

```

`NODE_PATH`是历史遗留下来的一个路径解决方案，通常不应该使用，而应该使用`node_modules`目录机制。

### 模块的循环加载

如果发生模块的循环加载，即A加载B，B又加载A，则B将加载A的不完整版本。

```
// a.js
exports.x = 'a1';
console.log('a.js ', require('./b.js').x);
exports.x = 'a2';

// b.js
exports.x = 'b1';
console.log('b.js ', require('./a.js').x);
exports.x = 'b2';

// main.js
console.log('main.js ', require('./a.js').x);
console.log('main.js ', require('./b.js').x);

```

上面代码是三个JavaScript文件。其中，a.js加载了b.js，而b.js又加载a.js。这时，Node返回a.js的不完整版本，所以执行结果如下。

```
$ node main.js
b.js  a1
a.js  b2
main.js  a2
main.js  b2

```

修改main.js，再次加载a.js和b.js。

```
// main.js
console.log('main.js ', require('./a.js').x);
console.log('main.js ', require('./b.js').x);
console.log('main.js ', require('./a.js').x);
console.log('main.js ', require('./b.js').x);

```

执行上面代码，结果如下。

```
$ node main.js
b.js  a1
a.js  b2
main.js  a2
main.js  b2
main.js  a2
main.js  b2

```

上面代码中，第二次加载a.js和b.js时，会直接从缓存读取exports属性，所以a.js和b.js内部的console.log语句都不会执行了。

### require.main

`require`方法有一个`main`属性，可以用来判断模块是直接执行，还是被调用执行。

直接执行的时候（`node module.js`），`require.main`属性指向模块本身。

```
require.main === module
// true

```

调用执行的时候（通过`require`加载该脚本执行），上面的表达式返回false。

## 模块的加载机制

CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个例子。

下面是一个模块文件`lib.js`。

```
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

```

上面代码输出内部变量`counter`和改写这个变量的内部方法`incCounter`。

然后，加载上面的模块。

```
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
console.log(counter); // 3

```

上面代码说明，`counter`输出以后，`lib.js`模块内部的变化就影响不到`counter`了。

### require的内部处理流程

`require`命令是CommonJS规范之中，用来加载其他模块的命令。它其实不是一个全局命令，而是指向当前模块的`module.require`命令，而后者又调用Node的内部命令`Module._load`。

```
Module._load = function(request, parent, isMain) {
  // 1. 检查 Module._cache，是否缓存之中有指定模块
  // 2. 如果缓存之中没有，就创建一个新的Module实例
  // 3. 将它保存到缓存
  // 4. 使用 module.load() 加载指定的模块文件，
  //    读取文件内容之后，使用 module.compile() 执行文件代码
  // 5. 如果加载/解析过程报错，就从缓存删除该模块
  // 6. 返回该模块的 module.exports
};

```

上面的第4步，采用`module.compile()`执行指定模块的脚本，逻辑如下。

```
Module.prototype._compile = function(content, filename) {
  // 1. 生成一个require函数，指向module.require
  // 2. 加载其他辅助方法到require
  // 3. 将文件内容放到一个函数之中，该函数可调用 require
  // 4. 执行该函数
};

```

上面的第1步和第2步，`require`函数及其辅助方法主要如下。

- `require()`: 加载外部模块
- `require.resolve()`：将模块名解析到一个绝对路径
- `require.main`：指向主模块
- `require.cache`：指向所有缓存的模块
- `require.extensions`：根据文件的后缀名，调用不同的执行函数

一旦`require`函数准备完毕，整个所要加载的脚本内容，就被放到一个新的函数之中，这样可以避免污染全局环境。该函数的参数包括`require`、`module`、`exports`，以及其他一些参数。

```
(function (exports, require, module, __filename, __dirname) {
  // YOUR CODE INJECTED HERE!
});

```

`Module._compile`方法是同步执行的，所以`Module._load`要等它执行完成，才会向用户返回`module.exports`的值。

# package.json文件

## dependencies字段，devDependencies字段

`dependencies`字段指定了项目运行所依赖的模块，`devDependencies`指定项目开发所需要的模块。

它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围。

```
{
  "devDependencies": {
    "browserify": "~13.0.0",
    "karma-browserify": "~5.0.1"
  }
}

```

对应的版本可以加上各种限定，主要有以下几种：

- **指定版本**：比如`1.2.2`，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
- **波浪号（tilde）+指定版本**：比如`~1.2.2`，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。
- **插入号（caret）+指定版本**：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。
- **latest**：安装最新版本。

## peerDependencies

有时，你的项目和所依赖的模块，都会同时依赖另一个模块，但是所依赖的版本不一样。比如，你的项目依赖A模块和B模块的1.0版，而A模块本身又依赖B模块的2.0版。

大多数情况下，这不构成问题，B模块的两个版本可以并存，同时运行。但是，有一种情况，会出现问题，就是这种依赖关系将暴露给用户。

最典型的场景就是插件，比如A模块是B模块的插件。用户安装的B模块是1.0版本，但是A插件只能和2.0版本的B模块一起使用。这时，用户要是将1.0版本的B的实例传给A，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果A和B一起安装，那么B必须是2.0模块。

`peerDependencies`字段，就是用来供插件指定其所需要的主工具的版本。

```
{
  "name": "chai-as-promised",
  "peerDependencies": {
    "chai": "1.x"
  }
}

```

上面代码指定，安装`chai-as-promised`模块时，主程序`chai`必须一起安装，而且`chai`的版本必须是`1.x`。如果你的项目指定的依赖是`chai`的2.0版本，就会报错。

注意，从npm 3.0版开始，`peerDependencies`不再会默认安装了。

## peerDependencies

有时，你的项目和所依赖的模块，都会同时依赖另一个模块，但是所依赖的版本不一样。比如，你的项目依赖A模块和B模块的1.0版，而A模块本身又依赖B模块的2.0版。

大多数情况下，这不构成问题，B模块的两个版本可以并存，同时运行。但是，有一种情况，会出现问题，就是这种依赖关系将暴露给用户。

最典型的场景就是插件，比如A模块是B模块的插件。用户安装的B模块是1.0版本，但是A插件只能和2.0版本的B模块一起使用。这时，用户要是将1.0版本的B的实例传给A，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果A和B一起安装，那么B必须是2.0模块。

`peerDependencies`字段，就是用来供插件指定其所需要的主工具的版本。

```
{
  "name": "chai-as-promised",
  "peerDependencies": {
    "chai": "1.x"
  }
}

```

上面代码指定，安装`chai-as-promised`模块时，主程序`chai`必须一起安装，而且`chai`的版本必须是`1.x`。如果你的项目指定的依赖是`chai`的2.0版本，就会报错。

注意，从npm 3.0版开始，`peerDependencies`不再会默认安装了。

## bin字段

bin项用来指定各个内部命令对应的可执行文件的位置。

```
"bin": {
  "someTool": "./bin/someTool.js"
}

```

上面代码指定，someTool 命令对应的可执行文件为 bin 子目录下的 someTool.js。Npm会寻找这个文件，在`node_modules/.bin/`目录下建立符号链接。在上面的例子中，someTool.js会建立符号链接`npm_modules/.bin/someTool`。由于`node_modules/.bin/`目录会在运行时加入系统的PATH变量，因此在运行npm时，就可以不带路径，直接通过命令来调用这些脚本。

因此，像下面这样的写法可以采用简写。

```
scripts: {  
  start: './node_modules/someTool/someTool.js build'
}

// 简写为

scripts: {  
  start: 'someTool build'
}


```

所有`node_modules/.bin/`目录下的命令，都可以用`npm run [命令]`的格式运行。在命令行下，键入`npm run`，然后按tab键，就会显示所有可以使用的命令。

## main字段

`main`字段指定了加载的入口文件，`require('moduleName')`就会加载这个文件。这个字段的默认值是模块根目录下面的`index.js`。

## config字段

config字段用于向环境变量输出值。

下面是一个package.json文件。

```
{
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}

```

然后，在`server.js`脚本就可以引用config字段的值。

```
http.createServer(...).listen(process.env.npm_package_config_port)

```

用户可以改变这个值。

```
$ npm config set foo:port 80
```

## 其他

### browser字段

browser指定该模板供浏览器使用的版本。Browserify这样的浏览器打包工具，通过它就知道该打包那个文件。

```
"browser": {
  "tipso": "./node_modules/tipso/src/tipso.js"
},

```

### engines字段

engines指明了该项目所需要的node.js版本。

### man字段

man用来指定当前模块的man文档的位置。

```
"man" :[ "./doc/calc.1" ]

```

### preferGlobal字段

preferGlobal的值是布尔值，表示当用户不将该模块安装为全局模块时（即不用–global参数），要不要显示警告，表示该模块的本意就是安装为全局模块。

### style字段

style指定供浏览器使用时，样式文件所在的位置。样式文件打包工具parcelify，通过它知道样式文件的打包位置。

```
"style": [
  "./node_modules/tipso/src/tipso.css"
]
```