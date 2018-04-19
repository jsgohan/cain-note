#####标准的css的盒子模型

宽度=内容宽度（content）+border+padding+margin

##### 低版本IE的盒子模型

宽度=内容宽度（content+border+padding）+margin

##### box-sizing属性

默认为content-box：元素的height/width属性指的是content部分的宽度

border-box：IE传统盒子模型。元素的height/width属性指的是border+padding+content部分

##### css选择器

id选择器（#id）、class选择器（.class）、标签选择器（div）、相邻选择器（h1+p）、子选择器（ul>li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a[rel="external"]）、伪类选择器（a:hover）

#####可继承的css属性

font-size、font-family、color

#####不可继承的css属性

border、padding、margin、width、height

##### 选择器优先级

就近原则：!important>[id,class,tag] !important比内联优先级高

##### css优先级算法计算

元素选择符：1

class选择符：10

id选择符：100

元素标签：1000

1. !important声明的样式优先级最高，如果冲突再进行计算
2. 如果优先级相同，则选择最后出现的样式
3. 继承得到的样式的优先级最低

##### css3新增伪类

- P:first-of-type
- P:last-of-type
- P:only-of-type
- P:only-child
- P:nth-child(2)
- :enabled :disabled
- checked

##### css3新特性

1. RGBA和透明度
2. background-image background-origin（content-box/padding-box/border-box） background-size background-repeat
3. word-wrap
4. 文字阴影 text-shadow: 5px 5px 5px #FFF;（水平阴影、垂直阴影、模糊距离、阴影颜色）
5. font-face属性：定义自己的字体
6. 圆角
7. 边框图片：border-image: url(border.png) 30 30 round
8. 盒阴影：box-shadow
9. 媒体查询


1. ​

#####水平垂直居中

```
第一种
#container {
    position: relative;
}
#center {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
第二种
#container {
    position: relative;
}
#center {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
}
第三种
#container {
    position: relative;
}
#center {
    width: 100px;
    height: 100px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
第四种 flex
#container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

##### display值及作用

inline（默认）-内联

none-隐藏

block-块

table-表格显示

list-item-项目列表

inline-block

##### position值

static（默认）：按照正常文档流进行排列

relative（相对定位）：不脱离文档流

absolute（绝对定位）：参考最近一个不为static的父级元素通过top、bottom、left、right定位

fixed（固定定位）：参考可视窗口

##### visibility属性的collapse，在不同浏览器的区别

chorme：collapse值和使用hidden没有区别

firefox、IE、opera：等价于display:none

##### BFC规范（块级格式化上下文：block formatting context）

定位方案：

1. 内部的Box会在垂直方向上一个接一个放置
2. Box垂直方向的距离有margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边，与包含块border box的左边相接触
4. BFC的区域不会与float box重叠
5. BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
6. 计算BFC的高度时，浮动元素也会参与计算

满足下列条件之一就可以出发BFC

1. 根元素，即html
2. float的值不为none（默认）
3. overflow的值不为visible（默认）
4. display的值为inline-block、table-cell、table-caption
5. position的值为absolute或fixed

##### margin上下文重合

在重合元素外包裹一层容器，并触发该容器生成一个BFC

```
<div class="aside"></div>
<div class="text">
	<div class="main"></div>
</div>
.aside {
    margin-bottom: 100px;
    width: 100px;
    height: 100px;
    backgroung: #f00;
}
.main {
    margin-top: 100px;
    height: 200px;
    background: #fff;
}
.text {
	/* 盒子main的外面包一个div，通过改变此div的属性使两个盒子属于两个不同的BFC，以此来组织margin重叠*/
    overflow: hidden;
}
```

##### 清除浮动的方式

浮动带来的问题：

1. 父元素的高度无法被撑开，影响与父元素同级的元素
2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后
3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构

清除浮动的方式：

1. 父级div定义height
2. 最后一个浮动元素后加空div标签，并添加样式clear:both
3. 包含浮动元素的父标签添加样式 overflow为hidden或auto（强制开启BFC）
4. 父级div定义zoom

##### 媒体查询

```
1.<head>里边<link rel="stylesheet" type="text/css" href="xxx.css" media="only screen and (max-device-width: 480px)">
2.css: @media only screen and (max-device-width: 480px) {
    // css样式
}
```

##### 浏览器是怎样解析css选择器的

css选择器的解析是从右向左解析的。

先找到所有的最右节点，对于每一个节点，向上寻找其父节点知道找到根元素或满足条件的匹配规则，则结束这个分支的遍历。

在css解析完后，需要将解析的结果与DOM Tree的内容一起进行分析建立一个Render Tree，最终用来进行绘图。在建立Render Tree时，浏览器就要为每个COM Tree中的元素根据css的解析结果来确定生成怎样的Render Tree

##### 元素竖向的百分比设定是相对于容器的宽度设定的

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性。如padding-top、padding-bottom、margin-top、margin-bottom等，当按百分比设定他们时，依据的是父容器的宽度

##### ::before和:after中双冒号和单冒号区别

1. 单冒号用于css3伪类，双冒号用于css3伪元素
2. ::before就是以一个元素的存在，定义在元素主体内容之前的一个伪元素。不存在于dom之中，只存在页面之中

##### 让chrome支持小于12px的文字

1. p {font-size:10px; -webkit-transform: scale(0.8);}
2. -webkit-text-size-adjust: none;

##### 让页面里的字体变清晰，变细

-webkit-font-smoothing: antialiased 灰度平滑

##### css布局解决方案

###### 居中布局

- 水平居中

1. 使用inline-block+text-align

原理：先将子框由块元素变为行内元素，再通过设置行内块元素居中以达到水平居中

用法：对子框设置display:inline-block 父框设置text-align:center;

2. 使用table+text-align

原理：先将子框设置为块级表单来显示，再设置子框居中以达到水平居中

用法：对子框设置display:table; 父框设置text-align:center;

3. 使用absolute+transform

原理：将子框设置为绝对定位，移动子框达到水平居中。父框需要设置为相对定位，是父框成为子框的相对框

用法：父框设置position:relative; 子框设置position:absolute;left:50%;transform:translateX(-50%);

4. flex+margin

原理：通过css3中的布局flex将子框转换为flex item，设置子框居中以达到居中

用法：将父框设置为display:flex; 子框设置margin: 0 auto;

5. flex+justify-content

###### 垂直居中

1. 使用table-cell+vertical-align

原理：通过将父框转化为一个表格单元格显示，再通过设置属性，使表格单元格内容垂直居中

用法：父框设置为display:table-cell;vertical-align:middle;

2. 使用absolute+transform
3. 使用flex+align-items

###### 水平垂直居中

1. absolute+transform
2. inline-block+text-align+table-cell+vertical-align
3. flex+justify-content+align-items

###### 多列布局

- 定宽+自适应

1. 使用float+overflow

用法：将左框设置为float:left;width、margin-left，在设置实际的右框overflow:hidden;

2. float+margin

##### 继承box-sizing

```
html {
    box-sizing: border-box;
}
*, *:before, *:after {
    box-sizing: border-box;
}
```

##### 使用:not()选择器来决定表单是否显示边框

```
不好的写法：
.nav li {
    border-right: 1px solid #eee;
}
.nav li:last-child {
    border-right: none;
}

应该使用以下方式：
.nav li:not(:last-child) {
    border-right: 1px solid #eee;
}
同样也可以使用 .nav li + li 或者 .nav li:first-child ~ li
```

##### 为body元素添加行高

不必为每一个p、h*元素逐一添加line-height，直接添加到body元素，文本元素可以很容易的继承body的样式

```
body {
    line-height: 1.5;
}
```

##### 使用负的nth-child选择元素

```
使用负的nth-child可以选择1至n个元素
li {
    display: none;
}
li:nth-child(-n+3) {
    // 选择1到第3个元素并显示
    display: block;
}
```

##### 使用max-height来建立css的滑块

max-height与overflow:hidden一起建立纯css的滑块

```
.slider {
    max-height: 200px;
    overflow-y: hidden;
    width: 300px;
}
.slider:hover {
    max-height: 600px;
    overflow-y: scroll;
}
```

鼠标移入滑块元素时增大它的max-height值，便可以显示溢出部分

##### 为破碎图像定义样式

```
img {
    display: block;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 300;
    height: auto;
    line-height: 2;
    position: relative;
    text-align: center;
    width: 100%;
}
以添加伪元素的法则来显示用户信息和URL的引用：
img:before {
    content: "we are sorry, the image below is broken(";
    display: block;
    margin-bottom: 10px;
}
img:after {
    content: "(url：)" attr(src) ")";
    display: block;
    font-size: 12px;
}
```

##### 媒体查询常用样式表

```
<link rel="stylesheet" media="all and (orientation: portrait)" href="portrait.css"> // 竖放加载
<link rel="stylesheet" media="all and (orientation: landscape)" href="landscope.css"> // 横放加载
```

##### meta标签

以下标签在开发webapp中起到非常重要的作用

```
<meta content="width=device-width, initial-scale=1.0, maxium-scale=1.0, user-scalable=0" name="viewport" />
<meta content="yes" name="apple-mobile-web-app-capable" />
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
<meta content="telephone=no" name="format-detection" />
```

其中

第二个是safari私有meta标签，表示允许全屏模式浏览

第三个meta标签是iphone的私有标签，指定iphone的safari顶端的状态条的样式

第四个告诉设备忽略将页面中的数字识别为电话号码











