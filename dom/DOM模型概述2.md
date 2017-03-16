# DOM模型概述2

# 属性的操作

## Element.attributes属性

HTML元素对象有一个`attributes`属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。其他类型的节点对象，虽然也有`attributes`属性，但是返回的都是`null`，因此可以把这个属性视为元素对象独有的。

```
document.body.attributes[0]
document.body.attributes.bgcolor
document.body.attributes['ONLOAD']

```

注意，上面代码中，第一行`attributes[0]`返回的是属性节点对象，后两行都返回属性值。

属性节点对象有`name`和`value`属性，对应该属性的属性名和属性值，等同于`nodeName`属性和`nodeValue`属性。

```
// HTML代码为
// <div id="mydiv">
var n = document.getElementById('mydiv');

n.attributes[0].name // "id"
n.attributes[0].nodeName // "id"

n.attributes[0].value // "mydiv"
n.attributes[0].nodeValue // "mydiv"

```

下面代码可以遍历一个元素节点的所有属性。

```
var para = document.getElementsByTagName('p')[0];

if (para.hasAttributes()) {
  var attrs = para.attributes;
  var output = '';
  for(var i = attrs.length - 1; i >= 0; i--) {
    output += attrs[i].name + '->' + attrs[i].value;
  }
  result.value = output;
} else {
  result.value = 'No attributes to show';
}

```

## 元素节点对象的属性

HTML元素节点的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性。

```
var a = document.getElementById('test');
a.id // "test"
a.href // "http://www.example.com/"
```

上面代码中，`a`元素标签的属性`id`和`href`，自动成为节点对象的属性。

这些属性都是可写的。

```
var img = document.getElementById('myImage');
img.src = 'http://www.example.com/image.jpg';

```

上面的写法，会立刻替换掉`img`对象的`src`属性，即会显示另外一张图片。

这样修改HTML属性，常常用于添加表单的属性。

```
var f = document.forms[0];
f.action = 'submit.php';
f.method = 'POST';

```

上面代码为表单添加提交网址和提交方法。

注意，这种用法虽然可以读写HTML属性，但是无法删除属性，`delete`运算符在这里不会生效。

HTML元素的属性名是大小写不敏感的，但是JavaScript对象的属性名是大小写敏感的。转换规则是，转为JavaScript属性名时，一律采用小写。如果属性名包括多个单词，则采用骆驼拼写法，即从第二个单词开始，每个单词的首字母采用大写，比如`onClick`。

有些HTML属性名是JavaScript的保留字，转为JavaScript属性时，必须改名。主要是以下两个。

- `for`属性改为`htmlFor`
- `class`属性改为`className`

另外，HTML属性值一般都是字符串，但是JavaScript属性会自动转换类型。比如，将字符串`true`转为布尔值，将`onClick`的值转为一个函数，将`style`属性的值转为一个`CSSStyleDeclaration`对象。

## 属性操作的标准方法

### 概述

元素节点提供四个方法，用来操作属性。

- `getAttribute()`
- `setAttribute()`
- `hasAttribute()`
- `removeAttribute()`

其中，前两个读写属性的方法，与前一部分HTML标签对象的属性读写，有三点差异。

（1）适用性

`getAttribute()`和`setAttribute()`对所有属性（包括用户自定义的属性）都适用；HTML标签对象的属性，只适用于标准属性。

（2）返回值

`getAttribute()`只返回只字符串，不会返回其他类型的值。HTML标签对象的属性会返回各种类型的值，包括字符串、数值、布尔值或对象。

（3）属性名

这些方法只接受属性的标准名称，不用改写保留字，比如`for`和`class`都可以直接使用。另外，这些方法对于属性名是大小写不敏感的。

```
var image = document.images[0];
image.setAttribute('class', 'myImage');

```

上面代码中，`setAttribute`方法直接使用`class`作为属性名，不用写成`className`。

### Element.getAttribute()

`Element.getAttribute`方法返回当前元素节点的指定属性。如果指定属性不存在，则返回`null`。

```
// HTML代码为
// <div id="div1" align="left">
var div = document.getElementById('div1');
div.getAttribute('align') // "left"

```

### Element.setAttribute()

`Element.setAttribute`方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。

```
var d = document.getElementById('d1');
d.setAttribute('align', 'center');

```

下面是对`img`元素的`src`属性赋值的例子。

```
var myImage = document.querySelector('img');
myImage.setAttribute('src', 'path/to/example.png');

```

### Element.hasAttribute()

`Element.hasAttribute`方法返回一个布尔值，表示当前元素节点是否包含指定属性。

```
var d = document.getElementById('div1');

if (d.hasAttribute('align')) {
  d.setAttribute('align', 'center');
}

```

上面代码检查`div`节点是否含有`align`属性。如果有，则设置为“居中对齐”。

### Element.removeAttribute()

`Element.removeAttribute`方法用于从当前元素节点移除属性。

```
// HTML代码为
// <div id="div1" align="left" width="200px">
document.getElementById('div1').removeAttribute('align');
// 现在的HTML代码为
// <div id="div1" width="200px">

```

## dataset属性

有时，需要在HTML元素上附加数据，供JavaScript脚本使用。一种解决方法是自定义属性。

```
<div id="mydiv" foo="bar">

```

上面代码为`div`元素自定义了`foo`属性，然后可以用`getAttribute()`和`setAttribute()`读写这个属性。

```
var n = document.getElementById('mydiv');
n.getAttribute('foo') // bar
n.setAttribute('foo', 'baz')

```

这种方法虽然可以达到目的，但是会使得HTML元素的属性不符合标准，导致网页的HTML代码通不过校验。

更好的解决方法是，使用标准提供的`data-*`属性。

```
<div id="mydiv" data-foo="bar">

```

然后，使用元素节点对象的`dataset`属性，它指向一个对象，可以用来操作HTML元素标签的`data-*`属性。

```
var n = document.getElementById('mydiv');
n.dataset.foo // bar
n.dataset.foo = 'baz'

```

上面代码中，通过`dataset.foo`读写`data-foo`属性。

删除一个`data-*`属性，可以直接使用`delete`命令。

```
delete document.getElementById('myDiv').dataset.foo;

```

除了`dataset`属性，也可以用`getAttribute('data-foo')`、`removeAttribute('data-foo')`、`setAttribute('data-foo')`、`hasAttribute('data-foo')`等方法操作`data-*`属性。

注意，`data-`后面的属性名有限制，只能包含字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`)。而且，属性名不应该使用`A`到`Z`的大写字母，比如不能有`data-helloWorld`这样的属性名，而要写成`data-hello-world`。

转成`dataset`的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。反过来，`dataset`的键名转成属性名时，所有大写字母都会被转成连词线+该字母的小写形式，其他字符不变。比如，`dataset.helloWorld`会转成`data-hello-world`。

# Text节点和DocumentFragment节点

## Text节点的概念

`Text`节点代表`Element`节点和`Attribute`节点的文本内容。如果一个节点只包含一段文本，那么它就有一个`Text`子节点，代表该节点的文本内容。

通常我们使用`Node`节点的`firstChild`、`nextSibling`等属性获取`Text`节点，或者使用`Document`节点的`createTextNode`方法创造一个`Text`节点。

```
// 获取Text节点
var textNode = document.querySelector('p').firstChild;

// 创造Text节点
var textNode = document.createTextNode('Hi');
document.querySelector('div').appendChild(textNode);
```

浏览器原生提供一个Text构造函数。它返回一个Text节点。它的参数就是该Text节点的文本内容。

```
var text1 = new Text();
var text2 = new Text("This is a text node");

```

注意，由于空格也是一个字符，所以哪怕只有一个空格，也会形成Text节点。

Text节点除了继承Node节点的属性和方法，还继承了CharacterData接口。Node节点的属性和方法请参考《Node节点》章节，这里不再重复介绍了，以下的属性和方法大部分来自CharacterData接口。

## Text节点的属性

### data

`data`属性等同于`nodeValue`属性，用来设置或读取Text节点的内容。

```
// 读取文本内容
document.querySelector('p').firstChild.data
// 等同于
document.querySelector('p').firstChild.nodeValue

// 设置文本内容
document.querySelector('p').firstChild.data = 'Hello World';

```

### wholeText

wholeText属性将当前Text节点与毗邻的Text节点，作为一个整体返回。大多数情况下，wholeText属性的返回值，与data属性和textContent属性相同。但是，某些特殊情况会有差异。

举例来说，HTML代码如下。

```
<p id="para">A <em>B</em> C</p>

```

这时，Text节点的wholeText属性和data属性，返回值相同。

```
var el = document.getElementById("para");
el.firstChild.wholeText // "A "
el.firstChild.data // "A "

```

但是，一旦移除em节点，wholeText属性与data属性就会有差异，因为这时其实P节点下面包含了两个毗邻的Text节点。

```
el.removeChild(para.childNodes[1]);
el.firstChild.wholeText // "A C"
el.firstChild.data // "A "

```

### length

length属性返回当前Text节点的文本长度。

```
(new Text('Hello')).length // 5

```

### nextElementSibling

nextElementSibling属性返回紧跟在当前Text节点后面的那个同级Element节点。如果取不到这样的节点，则返回null。

```
// HTML为
// <div>Hello <em>World</em></div>

var tn = document.querySelector('div').firstChild;
tn.nextElementSibling
// <em>World</em>

```

### previousElementSibling

previousElementSibling属性返回当前Text节点前面最近的那个Element节点。如果取不到这样的节点，则返回null。

## Text节点的方法

### appendData()，deleteData()，insertData()，replaceData()，subStringData()

以下5个方法都是编辑Text节点文本内容的方法。

appendData方法用于在Text节点尾部追加字符串。

deleteData方法用于删除Text节点内部的子字符串，第一个参数为子字符串位置，第二个参数为子字符串长度。

insertData方法用于在Text节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。

replaceData方法用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。

subStringData方法用于获取子字符串，第一个参数为子字符串在Text节点中的开始位置，第二个参数为子字符串长度。

```
// HTML代码为
// <p>Hello World</p>
var pElementText = document.querySelector('p').firstChild;

pElementText.appendData('!');
// 页面显示 Hello World!
pElementText.deleteData(7,5);
// 页面显示 Hello W
pElementText.insertData(7,'Hello ');
// 页面显示 Hello WHello
pElementText.replaceData(7,5,'World');
// 页面显示 Hello WWorld
pElementText.substringData(7,10);
// 页面显示不变，返回"World "
```

### remove()

remove方法用于移除当前Text节点。

```
// HTML代码为
// <p>Hello World</p>

document.querySelector('p').firstChild.remove()
// 现在页面代码为
// <p></p>

```

### splitText()，normalize()

splitText方法将Text节点一分为二，变成两个毗邻的Text节点。它的参数就是分割位置（从零开始），分割到该位置的字符前结束。如果分割位置不存在，将报错。

分割后，该方法返回分割位置后方的字符串，而原Text节点变成只包含分割位置前方的字符串。

```
// html代码为 <p id="p">foobar</p>
var p = document.getElementById('p');
var textnode = p.firstChild;

var newText = textnode.splitText(3);
newText // "bar"
textnode // "foo"
```

normalize方法可以将毗邻的两个Text节点合并。

接上面的例子，splitText方法将一个Text节点分割成两个，normalize方法可以实现逆操作，将它们合并。

```
p.childNodes.length // 2

// 将毗邻的两个Text节点合并
p.normalize();
p.childNodes.length // 1

```

## DocumentFragment节点

`DocumentFragment`节点代表一个文档的片段，本身就是一个完整的DOM树形结构。它没有父节点，`parentNode`返回`null`，但是可以插入任意数量的子节点。它不属于当前文档，操作`DocumentFragment`节点，要比直接操作DOM树快得多。

它一般用于构建一个DOM结构，然后插入当前文档。`document.createDocumentFragment`方法，以及浏览器原生的`DocumentFragment`构造函数，可以创建一个空的`DocumentFragment`节点。然后再使用其他DOM方法，向其添加子节点。

```
var docFrag = document.createDocumentFragment();
// or
var docFrag = new DocumentFragment();

var li = document.createElement('li');
li.textContent = 'Hello World';
docFrag.appendChild(li);

document.queryselector('ul').appendChild(docFrag);

```

上面代码创建了一个`DocumentFragment`节点，然后将一个`li`节点添加在它里面，最后将`DocumentFragment`节点移动到原文档。

注意，`DocumentFragment`节点本身不能被插入当前文档。当它作为`appendChild()`、`insertBefore()`、`replaceChild()`等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦`DocumentFragment`节点被添加进当前文档，它自身就变成了空节点（`textContent`属性为空字符串），可以被再次使用。如果想要保存`DocumentFragment`节点的内容，可以使用`cloneNode`方法。

```
document
  .queryselector('ul')
  .appendChild(docFrag.cloneNode(true));

```

下面是一个例子，使用`DocumentFragment`反转一个指定节点的所有子节点的顺序。

```
function reverse(n) {
  var f = document.createDocumentFragment();
  while(n.lastChild) f.appendChild(n.lastChild);
  n.appendChild(f);
}

```

`DocumentFragment`节点对象没有自己的属性和方法，全部继承自`Node`节点和`ParentNode`接口。也就是说，`DocumentFragment`节点比`Node`节点多出以下四个属性。

- `children`：返回一个动态的`HTMLCollection`集合对象，包括当前`DocumentFragment`对象的所有子元素节点。
- `firstElementChild`：返回当前`DocumentFragment`对象的第一个子元素节点，如果没有则返回`null`。
- `lastElementChild`：返回当前`DocumentFragment`对象的最后一个子元素节点，如果没有则返回`null`。
- `childElementCount`：返回当前`DocumentFragment`对象的所有子元素数量。

# 事件模型

## 事件冒泡（IE提出）

IE的事件流，即事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点（文档）。

所有的现代浏览器都支持事件冒泡，但在具体实现上还是有一些差别。IE5.5及更早版本中的事件冒泡会跳过<html>元素(从<body>直接跳到document)。IE9、Firefox、Chrome和Safari则将事件一直冒泡到window元素。

## 事件捕获（Netscape Communicator团队提出）

不太具体的节点应该更早接收到事件，而最具体的节点应该最后接受到事件。

## 事件处理程序

### DOM0级事件处理程序

```
var btn = document.getElementById("mybtn");
btn.onclick = function() {
 alert("clicked");
 alert(this.id);//"mybtn"
}
```

使用DOM0级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在元素的作用域中运行；换句话说，程序中的this引用当前元素。

删除通过DOM0级方法指定的事件处理程序，只要将事件处理程序属性的值设置为null即可：

btn.onclick = null;//删除事件处理程序

将事件处理程序设置为null之后，再单击按钮将不会有任何动作发生

### DOM2级事件处理程序

DOM2级事件定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()。接受3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。布尔值参数如果是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序。

添加的事件处理程序是在其依附的元素的作用域中运行。使用DOM2级方法添加事件处理程序的主要好处是可以添加多个事件处理程序。

移除时传入的参数与添加处理程序时使用的参数相同。意味着通过addEventListener()添加的匿名函数将无法移除。如下面的例子：

```
var btn = document.getElementById("mybtn");
btn.addEventListener("click",function(){alert(this.id);},false);

btn.removeEventListener("click",function(){alert(this.id);},false);//没有用！
```

用以下的方式才能移除：

```
var btn = document.getElementById("mybtn");
var handler = function() {alert(this.id);}
btn.addEventListener("click",handler,false);

btn.removeEventListener("click",handler,false);//没有用！
```

### IE事件处理程序

IE实现了与DOM中类似的两个方法：attachEvent()和detachEvent()。由于IE8及更早版本只支持事件冒泡，所以通过attachEvent()添加的事件处理程序都会 被添加到冒泡阶段。

```
var btn = document.getElementById("mybtn");
btn.attachEvent("onclick",function() {
  alert("clicked");
})
```

注意，attachEvent()的第一个参数是“onclick”。

在使用attachEvent()方法的情况下，事件处理程序会在`全局作用域`中运行，因此this等于window。

在编写跨浏览器的代码时，牢记这个区别。

使用attachEvent()添加的事件可以通过detachEvent()来移除，条件是必须提供相同的参数。与DOM方法一样，匿名函数不能被移除。

### 跨浏览器的时间处理程序

可以创建一个方法addHandler()，它的职责是视情况分别使用DOM0级方法、DOM2级方法或IE方法添加事件。

```
var EventUtil = {
  addHandler : function(element, type, handler) {
  	if(element.addEventListener) {
      element.addEventListener(type, handler, false);
  	}   else if(element.attachEvent) {
      element.attachEvent("on"+type, handler);
  	} else {
      element["on"+type] = handler;
  	}
  },
  removeHandler: function(element, type, handler) {
  	if(element.removeEventListener) {
      element.removeEventListener(type, handler, false);
  	}   else if(element.detachEvent) {
      element.detachEvent("on"+type, handler);
  	} else {
      element["on"+type] = null;
  	}
  }
}
```

## 事件对象

### DOM中的事件对象

event对象包含与创建它的特定事件有关的属性和方法。

| 属性/方法                      | 类型           | 读/写  | 说明                                       |
| -------------------------- | ------------ | ---- | ---------------------------------------- |
| bubbles                    | Boolean      | 只读   | 表明事件是否冒泡                                 |
| cancelable                 | Boolean      | 只读   | 表明是否可以取消事件的默认行为                          |
| currentTarget              | Element      | 只读   | 其事件处理程序当前正在处理事件的那个元素                     |
| defaultPrevented           | Boolean      | 只读   | 为true表示已经调用了preventDefault()             |
| detail                     | Integer      | 只读   | 与事件相关的细节信息                               |
| eventPhase                 | Integer      | 只读   | 调用事件处理程序的阶段：1表示捕获阶段，2表示“处于目标”，3表示冒泡阶段    |
| preventDefault()           | Function     | 只读   | 取消事件的默认行为。如果cancelable是true，则可以使用这个方法    |
| stopImmediatePropagation() | Function     | 只读   | 取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用            |
| stopPropagation()          | Function     | 只读   | 取消事件 的进一步捕获或冒泡，如果bubbles为true，则可以使用这个方法  |
| target                     | Element      | 只读   | 事件的目标                                    |
| trusted                    | Boolean      | 只读   | 为true表示事件是浏览器生成的。为false表示事件是有开发人员通过js创建的 |
| type                       | String       | 只读   | 被触发的的类型                                  |
| view                       | AbstractView | 只读   | 与事件关联的抽象视图。                              |

对象this始终等于currentTarget的值，而target则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则this,currentTarget和target包含相同的值。

（target为实际目标，currentTarget为绑定事件的目标）

### IE中的事件对象

在使用DOM0级方法添加事件处理程序时，event对象作为window对象的一个属性存在。

```
var btn = document.getElementById("mybtn");
btn.onclick = function(){
  var event = window.event;
  alert(event.type);//"click"
}
```

在使用attachEvent()的情况下，也可以通过window对象来访问event对象。也可以通过event变量来访问event对象(与DOM中的事件模型相同)。

IE的event对象都会包含下面所列的属性和方法

| 属性/方法        | 类型      | 读/写  | 说明                                       |
| ------------ | ------- | ---- | ---------------------------------------- |
| cancelBubble | Boolean | 读/写  | 默认为false，但将其设置为true就可以取消事件冒泡（与DOM中的stopPropagation()方法的作用相同） |
| returnValue  | Boolean | 读/写  | 默认值为true，但将其设置为false就可以取消事件的默认行为(与DOM中的preventDefault()方法的作用相同) |
| srcElement   | Element | 只读   | 事件的目标（与DOM的target属性相同）                   |
| type         | String  | 只读   | 被触发的时间的类型                                |

### 跨浏览器的事件对象

```
var EventUtil = {
  addHandler : function(element, type, handler) {},
  getEvent : function(event) {
    return event? event : window.event;
  },
  getTarget : function(event) {
    return event.target || event.srcElement;
  },
  preventDefault : function(event) {
    if(event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  removeHandler: function(element, type, handler) {},
  stopPropagation : function(event) {
    if(event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
}
```

## 事件类型

### UI事件

#### load事件

当页面完全加载后（包括所有图像、js文件、css文件等外部资源），就会触发window上面的load事件。两种方式定义onload事件：

第一种方式是使用js。

第二种方式是在body元素添加一个onload特性。

#### unload事件

事件在文档被完全卸载后触发。

#### resize事件

当浏览器窗口被调整到一个新的高度活宽度时，就会触发resize事件。

#### scroll事件

在混杂模式下，可以通过<body>元素的scrollLefth和scrollTop来监控这一变化；而在标准模式下，除Safari之外的所有浏览器都会通过<html>元素来反映这一变化(Safari仍然基于<body>跟踪滚动位置)例子如下：

```
EventUtil.addHandler(window, "scroll", function(event) {
  if(document.compatMode == "CSS1Compat") {
    alert(document.documentElement.scrollTop);
  } else {
    alert(document.body.scrollTop);
  }
})
```

### 焦点事件

利用焦点事件与document.hasFocus()方法及document.activeElement 属性配合使用。

焦点事件有：

- blur（在元素中失去焦点时触发，不会冒泡）
- DOMFocusIn（在元素获得焦点时触发，会冒泡，只有opera支持）（DOM3废除）
- DOMFousOut（在元素失去焦点时触发，会冒泡，只有opera支持）（DOM3废除）
- focus（在元素获得焦点时触发，不会冒泡）
- focusin（在元素获得焦点时触发，会冒泡，支持IE5.5+、Safari 5.1+、Opera11.5+和Chrome）
- focusout（在元素失去焦点时触发，会冒泡，支持IE5.5+、Safari 5.1+、Opera11.5+和Chrome）

### 鼠标与滚轮事件

#### 客户区坐标位置

鼠标事件在浏览器视口中的特定位置上发生的。这个位置信息保存在事件对象的clientX和clientY属性中。

```
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  alert(event.clientX + event.clientY);
})
```

#### 页面坐标位置

通过客户区坐标能够知道鼠标是在视口中什么位置发生的，而页面坐标通过事件对象的pageX和pageY属性，能告诉事件是在页面中的什么位置发生的.

```
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  alert(event.pageX + event.pageY);
})
```

在页面没有滚动条的情况，pageX和pageY的值分别和clientX和clientY的值相等。

也可以通过使用客户区坐标和滚动信息计算出页面坐标的位置。需要使用document.body(混杂模式)或document.documentElement(标准模式)中的scrollTop和scrollLeft属性。

```
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  var pageX = event.pageX,pageY = event.pageY;
  if(pageX === undefined) {
    pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
  }
  if(pageY === undefined) {
    pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
  }
  alert(event.pageX + event.pageY);
})
```

#### 屏幕坐标位置

通过screenX和screenY属性可以确定鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息。

```
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  alert(event.screenX + event.screenY);
})
```

#### 修改键

DOM规定了4个属性，表示修改键的状态：shiftKey、ctrlKey、altKey和metaKey。这些属性中包含的都是布尔值，按下为true。

```
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  var keys = new Array();
  if(event.shiftKey) {
    keys.push("shift");
  }
  ...
})
```

### html5事件

#### contextmenu事件

contextmenu事件是冒泡的。

```
EventUtil.addHandler(div, "load", function(event) {
  var div = document.getElementById("myDiv");
  
  EventUtil.addHandler(div, "click", function(event) {
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
    var menu = document.getElementById('mymenu');
    menu.style.left = event.clientX + "px";
    menu.style.top = event.clientY + "px";
    menu.style.visibility = "visible";
  })
  
  EventUtil.removeHandler(div, "click", function(event) {
    document.getElementById("mymenu").style.visibility = "hidden";
  })
})
```

支持：IE、FireFox、Safari、Chrome和Opera11+

#### beforeunload事件

为了让开发人员有可能在页面写在前阻止这一操作。这个事件会在浏览器卸载页面之前触发，可以通过它来取消卸载并继续使用原有页面。

为了显示这个弹出对话框，必须将event.returnValue的值设置为要显示给客户的字符串（对IE及Firefox而言），同时作为函数的值返回（对Safari和Chrome而言）。

```
EventUtil.addHandler(window, "beforeunload", function(event) {
  event = EventUtil.getEvent(event);
  var message = "I`m really going to miss you if you go";
  event.returnValue = message;
  return message;
})
```

支持：IE和Firefox、Safari和Chrome。Opera11及之前的版本不支持

#### DOMContentLoaded事件

DOMContentLoaded事件在形成完整的DOM树之后就会触发，不理会图像、js文件、css文件或其他资源是否已经下载完毕。与load事件不同，DOMContentLoaded支持在页面下载的早起添加事件处理程序，这也就意味着用户能够尽早地与页面进行交互。

可以为document或window添加相应的事件处理程序(尽管这个事件会冒泡到window，但他的目标实际上是document)

```
EventUtil.addHandler(document, "DOMContentLoaded", function(event) {
  alert("Content loaded");
})
```

DOMContentLoaded事件不会提供任何额外的信息（其target属性是document）

支持：IE9+、Firefox、Chrome、Safari 3.1+ 和Opera 9+

对于 不支持DOMContentLoaded的浏览器，建议在页面加载期间设置一个时间为0毫秒的超时调用。但是即便如此，也还是无法保证在所有环境中该超时调用一定会早于load事件被触发。

#### readystatechange事件

这个事件的目的是提供与文档或元素的加载状态有关的信息，支持readystatechange事件的每个对象都有一个readystate属性，可能包含5个值：

- uninitialized（未初始化）：对象存在但尚未初始化
- loading（正在加载）：对象正在加载数据
- loaded（加载完毕）：对象加载数据完成
- interactive（交互）：可以操作对象了，但还没有完全加载
- complete（完成）：对象已经加载完毕

对于document而言，值为“interactive”的readystate会在与DOMContentLoaded大致相同的时刻触发readystatechange事件。此时，DOM树已经完全加载完毕，可以操作它了。但此时，图像及其他外部文件不一定可用。

```
EventUtil.addHandler(document, "readystatechange", function(event) {
	if(document.readystate == "interactive") {
      alert("Content loaded");
	}
})
```

这个事件的event对象不会提供任何信息，也没有目标对象。

在与load事件一起使用时，无法预测两个事件触发的先后顺序。

交互阶段有可能会早于也有可能会晚于完成阶段出现，无法确保顺序。在包含较多外部资源的页面中，交互阶段更有可能早于完成阶段出现；而在页面中包含较少外部资源的情况下，完成阶段先于交互阶段出现的可能性更大。因此，为了尽可能抢到先机，有必要同时检测交互和完成阶段，如下

```
EventUtil.addHandler(document, "readystatechange", function(event) {
	if(document.readystate == "interactive" || document.readystate == "complete") {
	EventUtil.removeHandler(document, "readystatechange", arguments.callee);
      alert("Content loaded");
	}
})
```

支持：IE、Firefox 4+ 和 Opera

<script>(在IE和Opera中)和<link>（仅 IE中）元素也会触发readystatechange事件，可以用来确定外部的js和css文件是否已经加载完成。

#### pageshow和pagehide事件

Firefox和Opera的特性，“往返缓存”（back-forward cache，或bfcache），可以在用户用浏览器的“后退”和“前进”按钮时加快页面的转换速度。这个缓存保存页面数据、DOM和js的状态。实际上是将整个页面保存在内存中。如果页面在bfcache中，那么再次打开页面时就 不会触发load事件。

#### hashchange事件

在url的参数列表（及url中“#”号后面的所有字符串）发生变化时通知开发人员。

必须要 把hashchange事件处理程序添加给window对象，此时的event对象应该额外的增加两个属性：oldURL和newURL

支持：IE8+、Firefox 3.6+、Safari 5+、Chrome和Opera 10.6+

只有Firefox 6+、Chrome和Opera支持oldURL和newURL属性。最好是使用location对象来确定当前的参数列表

```
EventUtil.addHandler(window, "hashchange", function(event) {
	alert(document.location.hash)
})
```

如果IE8是在IE7文档模式下运行，即使功能无效它也会返回true。为了解决这个问题，可以使用更稳妥的检测方式：

```
var isSupported = ("onhashchange" in window) && (document.documentMode === undefined || document.documentMode > 7);
```

## 设备事件

### orientationchange事件

window.orientation属性包含3个值：0表示肖像模式，90表示向左旋转的横向模式（“主屏幕”按钮在右侧），-90表示向右旋转的横向模式（"主屏幕"按钮在左侧）

```
EventUtil.addHandler(window, "load", function(event) {
	var div = document.getElementById("mydiv");
	div.innerHTML = "current orientation is" + window.orientation;
	EventUtil.addHandler(window, "orientationchange", function(event) {
      div.innerHTML = "current orientation is" + window.orientation;
	})
})
```

## 触摸与手势事件



## 内存和性能

js中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。导致的原因：1.每个函数都是对象，都会占用内存，内存中的对象越多，性能就越差。2。必须事先指定所有事件处理程序而导致的DOM访问次数，会延迟整个页面的交互就绪时间

#### 事件委托

利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件

使用事件委托，只需在DOM树中尽量最高的层次上添加一个事件处理程序

```
HTML代码
<ul id="mylinks">
	<li id="goSomething">Go something</li>
	<li id="doSomething">Do something</li>
	<li id="SayHi">Say Hi</li>
</ul>
```

```
js代码
var list = document.getElementById("mylinks");
EventUtil.addHandler(list, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  
  switch(target.id) {
    case "doSomething":break;
    case "goSomething":break;
    case "SayHi":break;
  }
})
```

如果可行的话，可以考虑为document对象添加一个事件处理程序，用以处理页面上发生的某种特定类型的事件。

#### 移除事件处理程序

每当将事件处理程序制定给元素时，运行中的浏览器代码与支持页面交互的js代码之间就会建立一个连接。这种连接越多，页面执行起来就越慢。

内存中留有那些过时不用的“空事件处理程序”，也会造成web应用程序内存与性能问题的主要原因

## 模拟事件

#### DOM中的事件模拟

可以在document对象上使用createEvent()方法创建event对象。这个方法接收一个参数，即表示要创建的事件类型的字符串。

##### 模拟鼠标事件

##### 模拟键盘事件

##### 模拟其他事件

##### 自定义DOM事件

