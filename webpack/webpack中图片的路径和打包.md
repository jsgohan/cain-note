# webpack中图片的路径和打包

在实际生产中有以下几种图片的引用方式：

\1. HTML文件中img标签的src属性引用或者内嵌样式引用

```
<img src="photo.jpg" />
<div style="background:url(photo.jpg)"></div>
```

\2. CSS文件中的背景图等设置

```
.photo {
    background: url(photo.jpg);
}
```

\3. JavaScript文件中动态添加或者改变的图片引用

```
var imgTempl = '<img src="photo.jpg" />';
document.body.innerHTML = imgTempl;
```

\4. ReactJS中图片的引用

```
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (<img src='photo.jpg' />);
    }
}

ReactDom.render(<App />, document.querySelector('#container'));
```

**url-loader**

在 webpack 中引入图片需要依赖 url-loader 这个加载器。

安装：

```
npm install url-loader --save-dev
```

当然你可以将其写入配置中，以后与其他工具模块一起安装。

在 webpack.config.js 文件中配置如下：

```
module: {
　　loaders: [
　　　　{
　　　　　　test: /\.(png|jpg)$/,
　　　　　　loader: 'url-loader?limit=8192'
　　　　}
　　]
}    
```

test 属性代表可以匹配的图片类型，除了 png、jpg 之外也可以添加 gif 等，以竖线隔开即开。

loader 后面 limit 字段代表图片打包限制，这个限制并不是说超过了就不能打包，而是指当图片大小小于限制时会自动转成 base64 码引用。上例中大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用。

url-loader 后面除了 limit 字段，还可以通过 name 字段来指定图片打包的目录与文件名：

```
module: {
　　loaders: [
　　　　{
　　　　　　test: /\.(png|jpg)$/,
　　　　　　loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
　　　　}
　　]
}
```

 上例中的 name 字段指定了在打包根目录（output.path）下生成名为 images 的文件夹，并在原图片名前加上8位 hash 值。

例：工程目录如下

![图片打包1](D:\worksoft\somethingrepo\simplerepo\webpack\图片打包1.png)

在 main.css 中引用了同级 images 文件夹下的 bg.jpg 图片

```
background-image: url(./images/bg.jpg);
```

通过之前的配置，使用 $ webpack 命令对代码进行打包后生成如下目录

![图片打包2](D:\worksoft\somethingrepo\simplerepo\webpack\图片打包2.png)

打包目录中，css 文件和 images 文件夹保持了同样的层级，可以不做任务修改即能访问到图片。区别是打包后的图片加了 hash 值，bundle.css 文件里引入的也是有hash值的图片。

```
background-image: url(images/f593fbb9.bg.jpg);
```

 （上例中，使用了单独打包css的技术，只是为了方便演示）

**publicPath**

output.publicPath 表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。

```
output: {
　　path: 'dist',
　　publicPath: '/assets/',
　　filename: 'bundle.js'
}
```

 main.css

```
background-image: url(./images/bg.jpg);
```

 bundle.css

```
background-image: url(/assets/images/f593fbb9.bg.jpg);
```

该属性的好处在于当你配置了图片 CDN 的地址，本地开发时引用本地的图片资源，上线打包时就将资源全部指向 CDN 了。

但是要注意，如果没有确定的发布地址不建议配置该属性，否则会让你打包后的资源路径很混乱。

**JS中的图片**

初用 webpack 进行项目开发的同学会发现：在 js 或者 react 中引用的图片都没有打包进 bundle 文件夹中。

正确写法应该是通过模块化的方式引用图片路径，这样引用的图片就可以成功打包进 bundle 文件夹里了

**js**

```
var imgUrl = require('./images/bg.jpg'),
    imgTempl = '<img src="'+imgUrl+'" />';
document.body.innerHTML = imgTempl;
```

**react**

```
render() {
    return (<img src={require('./images/bg.jpg')} />);
}
```

**HTML中的图片**

由于 webpack 对 html 的处理不太好，打包 HTML 文件中的图片资源是相对来说最麻烦的。这里需要引用一个插件—— html-withimg-loder

```
$ npm install html-withimg-loader --save-dev
```

 webpack.config.js 添加配置

```
module: {
　　loaders: [
　　　　{
　　　　　　test: /\.html$/,
　　　　　　loader: 'html-withimg-loader'
　　　　}
　　]
}
```

在 bundle.js 中引用 html 文件

```
import '../index.html';
```

这样 html 文件中的图片就可以被打包进 bundle 文件夹里了。