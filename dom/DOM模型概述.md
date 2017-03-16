# DOM模型概述

## 节点

DOM的最小组成单位叫做节点（node）。文档的树形结构（DOM树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

节点的类型有七种。

- `Document`：整个文档树的顶层节点
- `DocumentType`：`doctype`标签（比如`<!DOCTYPE html>`）
- `Element`：网页的各种HTML标签（比如`<body>`、`<a>`等）
- `Attribute`：网页元素的属性（比如`class="right"`）
- `Text`：标签之间或标签包含的文本
- `Comment`：注释
- `DocumentFragment`：文档的片段

这七种节点都属于浏览器原生提供的节点对象的派生对象，具有一些共同的属性和方法。

## 节点树

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是DOM。

最顶层的节点就是`document`节点，它代表了整个文档。文档里面最高一层的HTML标签，一般是`<html>`，它构成树结构的根节点（root node），其他HTML标签节点都是它的下级。

除了根节点以外，其他节点对于周围的节点都存在三种关系。

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点

DOM提供操作接口，用来获取三种关系的节点。其中，子节点接口包括`firstChild`（第一个子节点）和`lastChild`（最后一个子节点）等属性，同级节点接口包括`nextSibling`（紧邻在后的那个同级节点）和`previousSibling`（紧邻在前的那个同级节点）属性。

## 特征相关的属性

所有节点对象都是浏览器内置的`Node`对象的实例，继承了`Node`属性和方法。这是所有节点的共同特征。

以下属性与节点对象本身的特征相关。

### Node.nodeName,Node.nodeType

`nodeName`属性返回节点的名称，`nodeType`属性返回节点类型的常数值。具体的返回值，可查阅下方的表格。

| 类型                     | nodeName             | nodeType |
| ---------------------- | -------------------- | -------- |
| ELEMENT_NODE           | 大写的HTML元素名           | 1        |
| ATTRIBUTE_NODE         | 等同于Attr.name         | 2        |
| TEXT_NODE              | #text                | 3        |
| COMMENT_NODE           | #comment             | 8        |
| DOCUMENT_NODE          | #document            | 9        |
| DOCUMENT_FRAGMENT_NODE | #document-fragment   | 11       |
| DOCUMENT_TYPE_NODE     | 等同于DocumentType.name | 10       |

以`document`节点为例，它的`nodeName`属性等于`#document`，`nodeType`属性等于9。

如果是一个`<p>`节点，它的`nodeName`是`P`，`nodeType`是1。文本节点的`nodeName`是`#text`，`nodeType`是3。

### Node.nodeValue

`Node.nodeValue`属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

由于只有Text节点、Comment节点、XML文档的CDATA节点有文本值，因此只有这三类节点的`nodeValue`可以返回结果，其他类型的节点一律返回`null`。同样的，也只有这三类节点可以设置`nodeValue`属性的值。对于那些返回`null`的节点，设置`nodeValue`属性是无效的。

### Node.textContent

`Node.textContent`属性返回当前节点和它的所有后代节点的文本内容。

```
// HTML代码为
// <div id="divA">This is <span>some</span> text</div>

document.getElementById('divA').textContent
// This is some text
```

对于Text节点和Comment节点，该属性的值与`nodeValue`属性相同。对于其他类型的节点，该属性会将每个子节点的内容连接在一起返回，但是不包括Comment节点。如果一个节点没有子节点，则返回空字符串。

document`节点和`doctype`节点的`textContent`属性为`null`。如果要读取整个文档的内容，可以使用`document.documentElement.textContent。

### Node.baseURI

`Node.baseURI`属性返回一个字符串，表示当前网页的绝对路径。如果无法取到这个值，则返回`null`。浏览器根据这个属性，计算网页上的相对路径的URL。该属性为只读。

不同节点都可以调用这个属性（比如`document.baseURI`和`element.baseURI`），通常它们的值是相同的。

该属性的值一般由当前网址的URL（即`window.location`属性）决定，但是可以使用HTML的`<base>`标签，改变该属性的值。

```
<base href="http://www.example.com/page.html">
<base target="_blank" href="http://www.example.com/page.html">

```

设置了以后，`baseURI`属性就返回`<base>`标签设置的值。

## 相关节点的属性

以下属性返回当前节点的相关节点。

### Node.ownerDocument

`Node.ownerDocument`属性返回当前节点所在的顶层文档对象，即`document`对象。

```
var d = p.ownerDocument;
d === document // true

```

`document`对象本身的`ownerDocument`属性，返回`null`。

### Node.nextSibling

`Node.nextSibling`属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回`null`。注意，该属性还包括文本节点和评论节点。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。

```
var el = document.getElementById('div-01').firstChild;
var i = 1;

while (el) {
  console.log(i + '. ' + el.nodeName);
  el = el.nextSibling;
  i++;
}

```

上面代码遍历`div-01`节点的所有子节点。

下面两个表达式指向同一个节点。

```
document.childNodes[0].childNodes[1]
document.firstChild.firstChild.nextSibling
```

### Node.previousSibling

previousSibling属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回null。

```
// html代码如下
// <a><b1 id="b1"/><b2 id="b2"/></a>

document.getElementById("b1").previousSibling // null
document.getElementById("b2").previousSibling.id // "b1"

```

对于当前节点前面有空格，则`previousSibling`属性会返回一个内容为空格的文本节点。

### Node.parentNode

`parentNode`属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：`element`节点、`document`节点和`documentfragment`节点。

下面代码是如何从父节点移除指定节点。

```
if (node.parentNode) {
  node.parentNode.removeChild(node);
}

```

对于document节点和documentfragment节点，它们的父节点都是null。另外，对于那些生成后还没插入DOM树的节点，父节点也是null。

### Node.parentElement

parentElement属性返回当前节点的父Element节点。如果当前节点没有父节点，或者父节点类型不是Element节点，则返回null。

```
if (node.parentElement) {
  node.parentElement.style.color = "red";
}

```

上面代码设置指定节点的父Element节点的CSS属性。

在IE浏览器中，只有Element节点才有该属性，其他浏览器则是所有类型的节点都有该属性。

### Node.childNodes

childNodes属性返回一个NodeList集合，成员包括当前节点的所有子节点。注意，除了HTML元素节点，该属性返回的还包括Text节点和Comment节点。如果当前节点不包括任何子节点，则返回一个空的NodeList集合。由于NodeList对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。

```
var ulElementChildNodes = document.querySelector('ul').childNodes;

```

### Node.firstChild，Node.lastChild

`firstChild`属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回`null`（注意，不是`undefined`）。

```
<p id="para-01"><span>First span</span></p>

<script type="text/javascript">
  console.log(
    document.getElementById('para-01').firstChild.nodeName
  ) // "span"
</script>

```

上面代码中，`p`元素的第一个子节点是`span`元素。

注意，`firstChild`返回的除了HTML元素子节点，还可能是文本节点或评论节点。

```
<p id="para-01">
  <span>First span</span>
</p>

<script type="text/javascript">
  console.log(
    document.getElementById('para-01').firstChild.nodeName
  ) // "#text"
</script>

```

上面代码中，`p`元素与`span`元素之间有空白字符，这导致`firstChild`返回的是文本节点。

`Node.lastChild`属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回null。

## 节点对象的方法

### Node.appendChild()

`Node.appendChild`方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。

```
var p = document.createElement('p');
document.body.appendChild(p);

```

如果参数节点是DOM中已经存在的节点，`appendChild`方法会将其从原来的位置，移动到新位置。

### Node.hasChildNodes()

`Node.hasChildNodes`方法返回一个布尔值，表示当前节点是否有子节点。

```
var foo = document.getElementById("foo");

if (foo.hasChildNodes()) {
  foo.removeChild(foo.childNodes[0]);
}

```

上面代码表示，如果foo节点有子节点，就移除第一个子节点。

`hasChildNodes`方法结合`firstChild`属性和`nextSibling`属性，可以遍历当前节点的所有后代节点。

```
function DOMComb(parent, callback) {
  if (parent.hasChildNodes()) {
    for (var node = parent.firstChild; node; node = node.nextSibling) {
      DOMComb(node, callback);
    }
  }
  callback.call(parent);
}

```

上面代码的`DOMComb`函数的第一个参数是某个指定的节点，第二个参数是回调函数。这个回调函数会依次作用于指定节点，以及指定节点的所有后代节点。

```
function printContent() {
  if (this.nodeValue) {
    console.log(this.nodeValue);
  }
}

DOMComb(document.body, printContent);
```

### Node.cloneNode()

`Node.cloneNode`方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点，默认是`false`，即不克隆子节点。

```
var cloneUL = document.querySelector('ul').cloneNode(true);

```

需要注意的是，克隆一个节点，会拷贝该节点的所有属性，但是会丧失`addEventListener`方法和`on-`属性（即`node.onclick = fn`），添加在这个节点上的事件回调函数。

克隆一个节点之后，DOM树有可能出现两个有相同ID属性（即`id="xxx"`）的HTML元素，这时应该修改其中一个HTML元素的ID属性。

### Node.insertBefore()

`Node.insertBefore`方法用于将某个节点插入当前节点的指定位置。它接受两个参数，第一个参数是所要插入的节点，第二个参数是当前节点的一个子节点，新的节点将插在这个节点的前面。该方法返回被插入的新节点。

```
var text1 = document.createTextNode('1');
var li = document.createElement('li');
li.appendChild(text1);

var ul = document.querySelector('ul');
ul.insertBefore(li, ul.firstChild);

```

上面代码使用当前节点的`firstChild`属性，在`<ul>`节点的最前面插入一个新建的`<li>`节点，新节点变成第一个子节点。

```
parentElement.insertBefore(newElement, parentElement.firstChild);
```

上面代码中，如果当前节点没有任何子节点，`parentElement.firstChild`会返回`null`，则新节点会成为当前节点的唯一子节点。

如果`insertBefore`方法的第二个参数为`null`，则新节点将插在当前节点的最后位置，即变成最后一个子节点。

注意，如果所要插入的节点是当前DOM现有的节点，则该节点将从原有的位置移除，插入新的位置。

注意，如果所要插入的节点是当前DOM现有的节点，则该节点将从原有的位置移除，插入新的位置。

由于不存在`insertAfter`方法，如果要插在当前节点的某个子节点后面，可以用`insertBefore`方法结合`nextSibling`属性模拟。

```
parentDiv.insertBefore(s1, s2.nextSibling);
```

上面代码可以将`s1`节点，插在`s2`节点的后面。如果`s2`是当前节点的最后一个子节点，则`s2.nextSibling`返回`null`，这时`s1`节点会插在当前节点的最后，变成当前节点的最后一个子节点，等于紧跟在`s2`的后面。

### Node.removeChild()

`Node.removeChild`方法接受一个子节点作为参数，用于从当前节点移除该子节点。它返回被移除的子节点。

```
var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);

```

上面代码是如何移除一个指定节点。

注意，这个方法是在父节点上调用的，不是在被移除的节点上调用的。

下面是如何移除当前节点的所有子节点。

```
var element = document.getElementById('top');
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

被移除的节点依然存在于内存之中，但不再是DOM的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。

### Node.replaceChild()

`Node.replaceChild`方法用于将一个新的节点，替换当前节点的某一个子节点。它接受两个参数，第一个参数是用来替换的新节点，第二个参数将要被替换走的子节点。它返回被替换走的那个节点。

```
replacedNode = parentNode.replaceChild(newChild, oldChild);

```

下面是一个例子。

```
var divA = document.getElementById('A');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan, divA);

```

上面代码是如何替换指定节点。

### Node.contains()

`Node.contains`方法接受一个节点作为参数，返回一个布尔值，表示参数节点是否为当前节点的后代节点。

```
document.body.contains(node)
```

上面代码检查某个节点，是否包含在当前文档之中。

注意，如果将当前节点传入contains方法，会返回true。虽然从意义上说，一个节点不应该包含自身。

```
nodeA.contains(nodeA) // true
```

### Node.isEqualNode()

isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

```
var targetEl = document.getElementById("targetEl");
var firstDiv = document.getElementsByTagName("div")[0];

targetEl.isEqualNode(firstDiv)
```

### Node.normalize()

normailize方法用于清理当前节点内部的所有Text节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。

```
var wrapper = document.createElement("div");

wrapper.appendChild(document.createTextNode("Part 1 "));
wrapper.appendChild(document.createTextNode("Part 2 "));

wrapper.childNodes.length // 2

wrapper.normalize();

wrapper.childNodes.length // 1
```

上面代码使用normalize方法之前，wrapper节点有两个Text子节点。使用normalize方法之后，两个Text子节点被合并成一个。

该方法是`Text.splitText`的逆方法

## NodeList对象，HTMLCollection对象

节点都是单个对象，有时会需要一种数据结构，能够容纳多个节点。DOM提供两种集合对象，用于实现这种节点的集合：`NodeList`和`HTMLCollection`。

这两个对象都是构造函数。

```
typeof NodeList // "function"
typeof HTMLCollection // "function"

```

但是，一般不把它们当作函数使用，甚至都没有直接使用它们的场合。主要是许多DOM属性和方法，返回的结果是`NodeList`实例或`HTMLCollection`实例，所以一般只使用它们的实例。

### NodeList对象

`NodeList`实例对象是一个类似数组的对象，它的成员是节点对象。`Node.childNodes`、`document.querySelectorAll()`返回的都是`NodeList`实例对象。

```
document.childNodes instanceof NodeList // true

```

`NodeList`实例对象可能是动态集合，也可能是静态集合。所谓动态集合就是一个活的集合，DOM树删除或新增一个相关节点，都会立刻反映在NodeList接口之中。`Node.childNodes`返回的，就是一个动态集合。

```
var parent = document.getElementById('parent');
parent.childNodes.length // 2
parent.appendChild(document.createElement('div'));
parent.childNodes.length // 3

```

上面代码中，`parent.childNodes`返回的是一个`NodeList`实例对象。当`parent`节点新增一个子节点以后，该对象的成员个数就增加了1。

`document.querySelectorAll`方法返回的是一个静态集合。DOM内部的变化，并不会实时反映在该方法的返回结果之中。

`NodeList`接口实例对象提供`length`属性和数字索引，因此可以像数组那样，使用数字索引取出每个节点，但是它本身并不是数组，不能使用`pop`或`push`之类数组特有的方法。

```
// 数组的继承链
myArray --> Array.prototype --> Object.prototype --> null

// NodeList的继承链
myNodeList --> NodeList.prototype --> Object.prototype --> null

```

从上面的继承链可以看到，`NodeList`实例对象并不继承`Array.prototype`，因此不具有数组的方法。如果要在`NodeList`实例对象使用数组方法，可以将`NodeList`实例转为真正的数组。

```
var div_list = document.querySelectorAll('div');
var div_array = Array.prototype.slice.call(div_list);

```

注意，采用上面的方法将`NodeList`实例转为真正的数组以后，`div_array`就是一个静态集合了，不再能动态反映DOM的变化。

另一种方法是通过`call`方法，间接在`NodeList`实例上使用数组方法。

```
var forEach = Array.prototype.forEach;

forEach.call(element.childNodes, function(child){
  child.parentNode.style.color = '#0F0';
});

```

上面代码让数组的`forEach`方法在`NodeList`实例对象上调用。注意，Chrome浏览器在`NodeList.prototype`上部署了`forEach`方法，所以可以直接使用，但它是非标准的。

遍历`NodeList`实例对象的首选方法，是使用`for`循环。

```
for (var i = 0; i < myNodeList.length; ++i) {
  var item = myNodeList[i];
}

```

不要使用`for...in`循环去遍历`NodeList`实例对象，因为`for...in`循环会将非数字索引的`length`属性和下面要讲到的`item`方法，也遍历进去，而且不保证各个成员遍历的顺序。

ES6新增的`for...of`循环，也可以正确遍历`NodeList`实例对象。

```
var list = document.querySelectorAll('input[type=checkbox]');
for (var item of list) {
  item.checked = true;
}

```

`NodeList`实例对象的`item`方法，接受一个数字索引作为参数，返回该索引对应的成员。如果取不到成员，或者索引不合法，则返回`null`。

```
nodeItem = nodeList.item(index)

// 实例
var divs = document.getElementsByTagName("div");
var secondDiv = divs.item(1);
```

上面代码中，由于数字索引从零开始计数，所以取出第二个成员，要使用数字索引`1`。

所有类似数组的对象，都可以使用方括号运算符取出成员，所以一般情况下，都是使用下面的写法，而不使用`item`方法。

```
nodeItem = nodeList[index]
```

### HTMLCollection对象

`HTMLCollection`实例对象与`NodeList`实例对象类似，也是节点的集合，返回一个类似数组的对象。`document.frames、document.links`、`docuement.forms`、`document.images`、`document.scripts`、`parentNode.children`等属性，返回的都是`HTMLCollection`实例对象。

`HTMLCollection`与`NodeList`的区别有以下几点。

（1）`HTMLCollection`实例对象的成员只能是`Element`节点，`NodeList`实例对象的成员可以包含其他节点。

（2）`HTMLCollection`实例对象都是动态集合，节点的变化会实时反映在集合中。`NodeList`实例对象可以是静态集合。

（3）`HTMLCollection`实例对象可以用`id`属性或`name`属性引用节点元素，`NodeList`只能使用数字索引引用。

`HTMLCollection`实例的`item`方法，可以根据成员的位置参数（从`0`开始），返回该成员。如果取不到成员或数字索引不合法，则返回`null`。

```
var c = document.images;
var img1 = c.item(1);

// 等价于下面的写法
var img1 = c[1];
```

`HTMLCollection`实例的`namedItem`方法根据成员的`ID`属性或`name`属性，返回该成员。如果没有对应的成员，则返回`null`。这个方法是`NodeList`实例不具有的。

```
// HTML代码为
// <form id="myForm"></form>
var elem = document.forms.namedItem('myForm');
// 等价于下面的写法
var elem = document.forms['myForm'];
```

由于`item`方法和`namedItem`方法，都可以用方括号运算符代替，所以建议一律使用方括号运算符。

## ParentNode接口，ChildNode接口

不同的节点除了继承Node接口以外，还会继承其他接口。ParentNode接口用于获取当前节点的Element子节点，ChildNode接口用于处理当前节点的子节点（包含但不限于Element子节点）。

### ParentNode接口

ParentNode接口用于获取Element子节点。Element节点、Document节点和DocumentFragment节点，部署了ParentNode接口。凡是这三类节点，都具有以下四个属性，用于获取Element子节点。

**（1）children**

children属性返回一个动态的HTMLCollection集合，由当前节点的所有Element子节点组成。

下面代码遍历指定节点的所有Element子节点。

```
if (el.children.length) {
  for (var i = 0; i < el.children.length; i++) {
    // ...
  }
}

```

**（2）firstElementChild**

firstElementChild属性返回当前节点的第一个Element子节点，如果不存在任何Element子节点，则返回null。

```
document.firstElementChild.nodeName
// "HTML"

```

上面代码中，document节点的第一个Element子节点是<HTML>。

**（3）lastElementChild**

lastElementChild属性返回当前节点的最后一个Element子节点，如果不存在任何Element子节点，则返回null。

```
document.lastElementChild.nodeName
// "HTML"

```

上面代码中，document节点的最后一个Element子节点是<HTML>。

**（4）childElementCount**

childElementCount属性返回当前节点的所有Element子节点的数目。

### ChildNode 接口

`ChildNode`接口用于处理子节点（包含但不限于`Element`子节点）。`Element`节点、`DocumentType`节点和`CharacterData`接口，部署了`ChildNode`接口。凡是这三类节点（接口），都可以使用下面四个方法。

**（1）remove()**

remove方法用于移除当前节点。

```
el.remove()

```

上面方法在DOM中移除了`el`节点。注意，调用这个方法的节点，是被移除的节点本身，而不是它的父节点。

**（2）before()**

before方法用于在当前节点的前面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

**（3）after()**

after方法用于在当前节点的后面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

**（4）replaceWith()**

replaceWith方法使用参数指定的节点，替换当前节点。如果参数是节点对象，替换当前节点的就是该节点对象；如果参数是文本，替换当前节点的就是参数对应的文本节点。

# document节点

`document`节点是文档的根节点，每张网页都有自己的`document`节点。`window.document`属性就指向这个节点。只要浏览器开始载入HTML文档，这个节点对象就存在了，可以直接调用。

`document`节点有不同的办法可以获取。

- 对于正常的网页，直接使用`document`或`window.document`。
- 对于`iframe`载入的网页，使用`iframe`节点的`contentDocument`属性。
- 对Ajax操作返回的文档，使用XMLHttpRequest对象的`responseXML`属性。
- 对于包含某个节点的文档，使用该节点的`ownerDocument`属性。

上面这四种`document`节点，都部署了[Document接口](http://dom.spec.whatwg.org/#interface-document)，因此有共同的属性和方法。当然，各自也有一些自己独特的属性和方法，比如HTML和XML文档的`document`节点就不一样。

## 内部节点属性

`document`节点有很多属性，其中相当一部分属于快捷方式，指向文档内部的某个节点。

### document.doctype，document.documentElement，document.defaultView

对于HTML文档来说，`document`对象一般有两个子节点。第一个子节点是`document.doctype`，它是一个对象，包含了当前文档类型（Document Type Declaration，简写DTD）信息。对于HTML5文档，该节点就代表`<!DOCTYPE html>`。如果网页没有声明DTD，该属性返回`null`。

```
var doctype = document.doctype;
doctype // "<!DOCTYPE html>"
doctype.name // "html"

```

`document.firstChild`通常就返回这个节点。

`document.documentElement`属性返回当前文档的根节点（root）。它通常是`document`节点的第二个子节点，紧跟在`document.doctype`节点后面。对于HTML网页，该属性返回`<html>`节点。

`document.defaultView`属性，在浏览器中返回`document`对象所在的`window`对象，否则返回`null`。

```
document.defaultView === window // true
```

### document.body，document.head

`document.head`属性返回当前文档的`<head>`节点，`document.body`属性返回当前文档的`<body>`。

```
document.head === document.querySelector('head') // true
document.body === document.querySelector('body') // true

```

这两个属性总是存在的，如果网页源码里面省略了`<head>`或`<body>`，浏览器会自动创造。另外，这两个属性是可写的，如果对其写入一个新的节点，会导致原有的所有子节点被移除。

### document.activeElement

`document.activeElement`属性返回当前文档中获得焦点的那个元素。用户通常可以使用Tab键移动焦点，使用空格键激活焦点。比如，如果焦点在一个链接上，此时按一下空格键，就会跳转到该链接。

## 节点集合属性

以下属性返回文档内部特定元素的集合，都是类似数组的对象。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。

### document.links，document.forms，document.images，document.embeds，document.frames，document.srcipts

`document.links`属性返回当前文档所有设定了`href`属性的`a`及`area`元素。

`document.forms`属性返回页面中所有表单元素`form`。

```
var selectForm = document.forms[0];

```

上面代码获取文档第一个表单。

`document.images`属性返回页面所有图片元素（即`img`标签）。

```
var imglist = document.images;

for(var i = 0; i < imglist.length; i++) {
  if (imglist[i].src === 'banner.gif') {
    // ...
  }
}

```

上面代码在所有`img`标签中，寻找特定图片。

`document.embeds`属性返回网页中所有嵌入对象，即`embed`标签。

以上四个属性返回的都是`HTMLCollection`对象实例。

```
document.links instanceof HTMLCollection // true
document.images instanceof HTMLCollection // true
document.forms instanceof HTMLCollection // true
document.embeds instanceof HTMLCollection // true

```

由于`HTMLCollection`实例可以用HTML元素的`id`或`name`属性引用，因此如果一个元素有`id`或`name`属性，就可以在上面这四个属性上引用。

```
// HTML代码为
// <form name="myForm" >

document.myForm === document.forms.myForm === document.forms.namedItem('myForm') === document.forms[0] === document.forms.item(0)// true
```

### document.scripts，document.styleSheets

`document.scripts`属性返回当前文档的所有脚本（即`script`标签）。

```
var scripts = document.scripts;
if (scripts.length !== 0 ) {
  console.log('当前网页有脚本');
}

```

`document.scripts`返回的也是`HTMLCollection`实例。

```
document.scripts instanceof HTMLCollection // true

```

因此，如果一个`script`标签有`id`或`name`属性，就可以在`document.scripts`上引用。

```
// HTML代码为
// <script id="myScript" >

document.scripts.myScript
// <script id="myScript"></script>
```

`document.styleSheets`属性返回一个类似数组的对象，代表当前网页的所有样式表。每个样式表对象都有`cssRules`属性，返回该样式表的所有CSS规则，这样这可以操作具体的CSS规则了。

```
var allSheets = [].slice.call(document.styleSheets);

```

上面代码中，使用`slice`方法将`document.styleSheets`转为数组，以便于进一步处理。

## 文档信息属性

以下属性返回文档信息。

### document.documentURI，document.URL

`document.documentURI`属性和`document.URL`属性都返回一个字符串，表示当前文档的网址。不同之处是`documentURI`属性是所有文档都具备的，`URL`属性则是HTML文档独有的。

```
document.documentURI === document.URL
// true

```

另外，如果文档的锚点（`#anchor`）变化，这两个属性都不会跟着变化，它们的值是静态的。但是，`document.location`会跟着变化，`document.location`总是返回最新的URL，会跟踪锚点的变化。

### document.domain

`document.domain`属性返回当前文档的域名。比如，某张网页的网址是 `http://www.example.com/hello.html` ，`domain`属性就等于`www.example.com`。如果无法获取域名，该属性返回`null`。

```
var badDomain = 'www.example.xxx';
if (document.domain === badDomain)
  window.close();

```

上面代码判断，如果当前域名等于指定域名，则关闭窗口。

二级域名的情况下，domain属性可以设置为对应的一级域名。比如，当前域名是sub.example.com，则domain属性可以设置为example.com。除此之外的写入，都是不可以的。

### document.lastModified

`document.lastModified`属性返回当前文档最后修改的时间戳，格式为字符串。

```
document.lastModified
// Tuesday, July 10, 2001 10:19:42

```

注意，`lastModified`属性的值是字符串，所以不能用来直接比较，两个文档谁的日期更新，需要用`Date.parse`方法转成时间戳格式，才能进行比较。

```
if (Date.parse(doc1.lastModified) > Date.parse(doc2.lastModified)) {
  // ...
}

```

### document.location

`document.location`属性返回`location`对象，提供了当前文档的URL信息。

```
// 当前网址为 http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.href // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol // "http:"
document.location.host // "www.example.com:4097"
document.location.hostname // "www.example.com"
document.location.port // "4097"
document.location.pathname // "/path/a.html"
document.location.search // "?x=111"
document.location.hash // "#part1"
document.location.user // "user"
document.location.password // "passed"

```

`location`对象有以下方法。

- `location.assign()`
- `location.reload()`
- `location.toString()`

```
// 跳转到另一个网址
document.location.assign('http://www.google.com')
// 优先从服务器重新加载
document.location.reload(true)
// 优先从本地缓存重新加载（默认值）
document.location.reload(false)
// 跳转到新网址，并将取代掉history对象中的当前记录
document.location.replace('http://www.google.com');
// 将location对象转为字符串，等价于document.location.href
document.location.toString()

```

如果将新的网址赋值给`location`对象，网页就会自动跳转到新网址。

```
document.location = 'http://www.example.com';
// 等同于
document.location.href = 'http://www.example.com';

```

也可以指定相对URL。

```
document.location = 'page2.html';

```

如果指定的是锚点，浏览器会自动滚动到锚点处。

```
document.location = '#top';

```

注意，采用上面的方法重置URL，跟用户点击链接跳转的效果是一样的。上一个网页依然将保存在浏览器历史之中，点击“后退”按钮就可以回到前一个网页。

如果不希望用户看到前一个网页，可以使用`location.replace`方法，浏览器`history`对象就会用新的网址，取代当前网址，这样的话，“后退”按钮就不会回到当前网页了。它的一个应用就是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。

`document.location`属性与`window.location`属性等价。

```
document.location === window.location // true

```

历史上，IE曾经不允许对`document.location`赋值，为了保险起见，建议优先使用`window.location`。如果只是单纯地获取当前网址，建议使用`document.URL`，语义性更好。

### document.referrer，document.title，document.characterSet

`document.referrer`属性返回一个字符串，表示当前文档的访问来源，如果是无法获取来源或是用户直接键入网址，而不是从其他网页点击，则返回一个空字符串。

`document.referrer`的值，总是与HTTP头信息的`Referer`保持一致，但是它的拼写有两个`r`。

`document.title`属性返回当前文档的标题，该属性是可写的。

```
document.title = '新标题';

```

`document.characterSet`属性返回渲染当前文档的字符集，比如UTF-8、ISO-8859-1。

### document.readyState

`document.readyState`属性返回当前文档的状态，共有三种可能的值。

- `loading`：加载HTML代码阶段（尚未完成解析）
- `interactive`：加载外部资源阶段时
- `complete`：加载完成时

这个属性变化的过程如下。

1. 浏览器开始解析HTML文档，`document.readyState`属性等于`loading`。
2. 浏览器遇到HTML文档中的`<script>`元素，并且没有`async`或`defer`属性，就暂停解析，开始执行脚本，这时`document.readyState`属性还是等于`loading`。
3. HTML文档解析完成，`document.readyState`属性变成`interactive`。
4. 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，`document. readyState`属性变成`complete`。

下面的代码用来检查网页是否加载成功。

```
// 基本检查
if (document.readyState === 'complete') {
  // ...
}

// 轮询检查
var interval = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(interval);
    // ...
  }
}, 100);
```

### document.designMode

`document.designMode`属性控制当前文档是否可编辑，通常用在制作所见即所得编辑器。打开`iframe`元素包含的文档的`designMode`属性，就能将其变为一个所见即所得的编辑器。

```
<iframe id="editor" src="about:blank"></iframe>
<script>
!(function () {
  var editor = document.getElementById('editor');
  editor.contentDocument.designMode = 'on';
})();
</script>

```

### document.implementation

`document.implementation`属性返回一个对象，用来甄别当前环境部署了哪些DOM相关接口。`implementation`属性的`hasFeature`方法，可以判断当前环境是否部署了特定版本的特定接口。

```
document.implementation.hasFeature('HTML', '2.0')
// true

document.implementation.hasFeature('MutationEvents','2.0')
// true

```

上面代码表示，当前环境部署了DOM HTML 2.0版和MutationEvents的2.0版。

### document.compatMode

`compatMode`属性返回浏览器处理文档的模式，可能的值为`BackCompat`（向后兼容模式）和`CSS1Compat`（严格模式）。

一般来说，如果网页代码的第一行设置了明确的`DOCTYPE`（比如`<!doctype html>`），`document.compatMode`的值都为`CSS1Compat`。

### document.cookie

`document.cookie`属性用来操作浏览器Cookie

## 读写相关的方法

### document.open()，document.close()

`document.open`方法用于新建一个文档，供write方法写入内容。它实际上等于清除当前文档，重新写入内容。不要将此方法与`window.open()`混淆，后者用来打开一个新窗口，与当前文档无关。

`document.close`方法用于关闭`open`方法所新建的文档。一旦关闭，`write`方法就无法写入内容了。如果再调用`write`方法，就等同于又调用`open`方法，新建一个文档，再写入内容。

### document.write()，document.writeln()

`document.write`方法用于向当前文档写入内容。只要当前文档还没有用`close`方法关闭，它所写入的内容就会追加在已有内容的后面。

```
// 页面显示“helloworld”
document.open();
document.write('hello');
document.write('world');
document.close();

```

注意，`document.write`会当作HTML代码解析，不会转义。

```
document.write('<p>hello world</p>');

```

如果页面已经解析完成（`DOMContentLoaded`事件发生之后），再调用`write`方法，它会先调用`open`方法，擦除当前文档所有内容，然后再写入。

```
document.addEventListener('DOMContentLoaded', function (event) {
  document.write('<p>Hello World!</p>');
});

// 等同于

document.addEventListener('DOMContentLoaded', function (event) {
  document.open();
  document.write('<p>Hello World!</p>');
  document.close();
});

```

如果在页面渲染过程中调用`write`方法，并不会调用`open`方法。（可以理解成，`open`方法已调用，但`close`方法还未调用。）

```
<html>
<body>
hello
<script type="text/javascript">
  document.write("world")
</script>
</body>
</html>

```

在浏览器打开上面网页，将会显示`hello world`。

`document.write`是JavaScript语言标准化之前就存在的方法，现在完全有更符合标准的方法向文档写入内容（比如对`innerHTML`属性赋值）。所以，除了某些特殊情况，应该尽量避免使用`document.write`这个方法。

`document.writeln`方法与`write`方法完全一致，除了会在输出内容的尾部添加换行符。

```
document.write(1);
document.write(2);
// 12

document.writeln(1);
document.writeln(2);
// 1
// 2
//

```

注意，`writeln`方法添加的是ASCII码的换行符，渲染成HTML网页时不起作用，即在网页上显示不出换行。

## 查找节点的方法

以下方法用来查找某个节点。

### document.querySelector()，document.querySelectorAll()

`document.querySelector`方法接受一个CSS选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回`null`。

```
var el1 = document.querySelector('.myclass');
var el2 = document.querySelector('#myParent > [ng-click]');

```

`document.querySelectorAll`方法与`querySelector`用法类似，区别是返回一个`NodeList`对象，包含所有匹配给定选择器的节点。

```
elementList = document.querySelectorAll('.myclass');

```

这两个方法的参数，可以是逗号分隔的多个CSS选择器，返回匹配其中一个选择器的元素节点。

```
var matches = document.querySelectorAll('div.note, div.alert');

```

上面代码返回`class`属性是`note`或`alert`的`div`元素。

这两个方法都支持复杂的CSS选择器。

```
// 选中data-foo-bar属性等于someval的元素
document.querySelectorAll('[data-foo-bar="someval"]');

// 选中myForm表单中所有不通过验证的元素
document.querySelectorAll('#myForm :invalid');

// 选中div元素，那些class含ignore的除外
document.querySelectorAll('DIV:not(.ignore)');

// 同时选中div，a，script三类元素
document.querySelectorAll('DIV, A, SCRIPT');

```

但是，它们不支持CSS伪元素的选择器（比如`:first-line`和`:first-letter`）和伪类的选择器（比如`:link`和`:visited`），即无法选中伪元素和伪类。

如果`querySelectorAll`方法的参数是字符串`*`，则会返回文档中的所有HTML元素节点。另外，`querySelectorAll`的返回结果不是动态集合，不会实时反映元素节点的变化。

最后，这两个方法除了定义在`document`对象上，还定义在元素节点上，即在元素节点上也可以调用。

### document.getElementsByTagName()

`document.getElementsByTagName`方法返回所有指定HTML标签的元素，返回值是一个类似数组的`HTMLCollection`对象，可以实时反映HTML文档的变化。如果没有任何匹配的元素，就返回一个空集。

```
var paras = document.getElementsByTagName('p');

paras instanceof HTMLCollection // true

```

上面代码返回当前文档的所有`p`元素节点。

HTML标签名是大小写不敏感的，因此`getElementsByTagName`方法也是大小写不敏感的。另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序。

如果传入`*`，就可以返回文档中所有HTML元素。

```
var allElements = document.getElementsByTagName('*');

```

注意，HTML元素本身也定义了`getElementsByTagName`方法，返回该元素的后代元素中符合指定标签的元素。也就是说，这个方法不仅可以在`document`对象上调用，也可以在任何元素节点上调用。

```
var firstPara = document.getElementsByTagName('p')[0];
var spans = firstPara.getElementsByTagName('span');

```

上面代码选中第一个`p`元素内部的所有`span`元素。

### document.getElementsByClassName()

`document.getElementsByClassName`方法返回一个类似数组的对象（`HTMLCollection`实例对象），包括了所有`class`名字符合指定条件的元素，元素的变化实时反映在返回结果中。

```
var elements = document.getElementsByClassName(names);

```

由于`class`是保留字，所以JavaScript一律使用`className`表示CSS的`class`。

如果参数是一个空格分隔的字符串，元素的`class`必须符合所有字符串之中所有的`class`才会返回。

```
var elements = document.getElementsByClassName('foo bar');

```

上面代码返回同时具有`foo`和`bar`两个`class`的元素，`foo`和`bar`的顺序不重要。

注意，正常模式下，CSS的`class`是大小写敏感的。（`quirks mode`下，大小写不敏感。）

与`getElementsByTagName`方法一样，`getElementsByClassName`方法不仅可以`在document`对象上调用，也可以在任何元素节点上调用。

```
// 非document对象上调用
var elements = rootElement.getElementsByClassName(names);

```

### document.getElementsByName()

`document.getElementsByName`方法用于选择拥有`name`属性的HTML元素（比如`<form>`、`<radio>`、`<img>`、`<frame>`、`<embed>`和`<object>`等），返回一个类似数组的的对象（`NodeList`对象的实例），因为`name`属性相同的元素可能不止一个。

```
// 表单为 <form name="x"></form>
var forms = document.getElementsByName('x');
forms[0].tagName // "FORM"

```

### document.getElementById()

`getElementById`方法返回匹配指定`id`属性的元素节点。如果没有发现匹配的节点，则返回`null`。

```
var elem = document.getElementById('para1');

```

注意，该方法的参数是大小写敏感的。比如，如果某个节点的`id`属性是`main`，那么`document.getElementById('Main')`将返回`null`，而不是那个节点。

`document.getElementById`方法与`document.querySelector`方法都能获取元素节点，不同之处是`document.querySelector`方法的参数使用CSS选择器语法，`document.getElementById`方法的参数是HTML标签元素的`id`属性。

```
document.getElementById('myElement')
document.querySelector('#myElement')

```

上面代码中，两个方法都能选中`id`为`myElement`的元素，但是`getElementById()`比`querySelector()`效率高得多。

另外，这个方法只能在`document`对象上使用，不能在其他元素节点上使用。

### document.elementFromPoint()

`document.elementFromPoint`方法返回位于页面指定位置最上层的Element子节点。

```
var element = document.elementFromPoint(50, 50);

```

上面代码选中在`(50, 50)`这个坐标位置的最上层的那个HTML元素。

`elementFromPoint`方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。如果位于该位置的HTML元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回`null`。

## 生成节点的方法

以下方法用于生成元素节点。

### document.createElement()

`document.createElement`方法用来生成网页元素节点。

```
var newDiv = document.createElement('div');

```

`createElement`方法的参数为元素的标签名，即元素节点的`tagName`属性，对于 HTML 网页大小写不敏感，即参数为`div`或`DIV`返回的是同一种节点。如果参数里面包含尖括号（即`<`和`>`）会报错。

```
document.createElement('<div>')
// DOMException: The tag name provided ('<div>') is not a valid name

```

### document.createTextNode()

`document.createTextNode`方法用来生成文本节点，参数为所要生成的文本节点的内容。

```
var newDiv = document.createElement('div');
var newContent = document.createTextNode('Hello');
newDiv.appendChild(newContent);

```

上面代码新建一个`div`节点和一个文本节点，然后将文本节点插入`div`节点。

这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作HTML代码渲染。因此，可以用来展示用户的输入，避免XSS攻击。

```
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML)
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;

```

上面代码中，`createTextNode`方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。

需要注意的是，该方法不对单引号和双引号转义，所以不能用来对HTML属性赋值。

```
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var userWebsite = '" onmouseover="alert(\'derp\')" "';
var profileLink = '<a href="' + escapeHtml(userWebsite) + '">Bob</a>';
var div = document.getElemenetById('target');
div.innerHtml = profileLink;
// <a href="" onmouseover="alert('derp')" "">Bob</a>

```

上面代码中，由于`createTextNode`方法不转义双引号，导致`onmouseover`方法被注入了代码。

### document.createAttribute()

`document.createAttribute`方法生成一个新的属性对象节点，并返回它。

```
attribute = document.createAttribute(name);

```

createAttribute方法的参数name，是属性的名称。

```
var node = document.getElementById("div1");
var a = document.createAttribute("my_attrib");
a.value = "newVal";
node.setAttributeNode(a);

// 等同于

var node = document.getElementById("div1");
node.setAttribute("my_attrib", "newVal");

```

### document.createDocumentFragment()

createDocumentFragment方法生成一个DocumentFragment对象。

```
var docFragment = document.createDocumentFragment();

```

DocumentFragment对象是一个存在于内存的DOM片段，但是不属于当前文档，常常用来生成较复杂的DOM结构，然后插入当前文档。这样做的好处在于，因为DocumentFragment不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的DOM有更好的性能表现。

```
var docfrag = document.createDocumentFragment();

[1, 2, 3, 4].forEach(function(e) {
  var li = document.createElement("li");
  li.textContent = e;
  docfrag.appendChild(li);
});

document.body.appendChild(docfrag);
```

## 事件相关的方法

### document.createEvent()

`document.createEvent`方法生成一个事件对象，该对象可以被`element.dispatchEvent`方法使用，触发指定事件。

```
var event = document.createEvent(type);

```

createEvent方法的参数是事件类型，比如UIEvents、MouseEvents、MutationEvents、HTMLEvents。

```
var event = document.createEvent('Event');
event.initEvent('build', true, true);
document.addEventListener('build', function (e) {
  // ...
}, false);
document.dispatchEvent(event);

```

### document.addEventListener()，document.removeEventListener()，document.dispatchEvent()

以下三个方法与`document`节点的事件相关。这些方法都继承自EventTarget接口

```
// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```

## 其他方法

### document.hasFocus()

`document.hasFocus`方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。

```
var focused = document.hasFocus();

```

注意，有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点。比如如果用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。

### document.createNodeIterator()，document.createTreeWalker()

以下方法用于遍历元素节点。

**（1）document.createNodeIterator()**

`document.createNodeIterator`方法返回一个DOM的子节点遍历器。

```
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

```

上面代码返回body元素的遍历器。createNodeIterator方法的第一个参数为遍历器的根节点，第二个参数为所要遍历的节点类型，这里指定为元素节点。其他类型还有所有节点（NodeFilter.SHOW_ALL）、文本节点（NodeFilter.SHOW_TEXT）、评论节点（NodeFilter.SHOW_COMMENT）等。

所谓“遍历器”，在这里指可以用nextNode方法和previousNode方法依次遍历根节点的所有子节点。

```
var nodeIterator = document.createNodeIterator(document.body);
var pars = [];
var currentNode;

while (currentNode = nodeIterator.nextNode()) {
  pars.push(currentNode);
}

```

上面代码使用遍历器的nextNode方法，将根节点的所有子节点，按照从头部到尾部的顺序，读入一个数组。nextNode方法先返回遍历器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回null。previousNode方法则是先将指针移向上一个节点，然后返回该节点。

```
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var currentNode = nodeIterator.nextNode();
var previousNode = nodeIterator.previousNode();

currentNode === previousNode // true

```

上面代码中，currentNode和previousNode都指向同一个的节点。

有一个需要注意的地方，遍历器返回的第一个节点，总是根节点。

**（2）document.createTreeWalker()**

`document.createTreeWalker`方法返回一个DOM的子树遍历器。它与createNodeIterator方法的区别在于，后者只遍历子节点，而它遍历整个子树。

`document.createTreeWalker`方法的第一个参数，是所要遍历的根节点，第二个参数指定所要遍历的节点类型。

```
var treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var nodeList = [];

while(treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);

```

上面代码遍历body节点下属的所有元素节点，将它们插入nodeList数组。

### document.adoptNode()

`document.adoptNode`方法将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。

```
node = document.adoptNode(externalNode);

```

### document.importNode()

`document.importNode`方法从外部文档拷贝指定节点，插入当前文档。

```
var node = document.importNode(externalNode, deep);

```

`document.importNode`方法用于创造一个外部节点的拷贝，然后插入当前文档。它的第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为`true`。

注意，`importNode方法`只是拷贝外部节点，这时该节点的父节点是null。下一步还必须将这个节点插入当前文档的DOM树。

```
var iframe = document.getElementsByTagName('iframe')[0];
var oldNode = iframe.contentWindow.document.getElementById('myNode');
var newNode = document.importNode(oldNode, true);
document.getElementById("container").appendChild(newNode);

```

上面代码从`iframe`窗口，拷贝一个指定节点`myNode`，插入当前文档。

### document.getSelection()

这个方法指向`window.getSelection()`

# Element对象

## 特征相关的属性

以下属性与元素特点本身的特征相关。

### Element.attributes

`Element.attributes`属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点。

### Element.id，Element.tagName

`Element.id`属性返回指定元素的`id`属性，该属性可读写。

`Element.tagName`属性返回指定元素的大写标签名，与`nodeName`属性的值相等。

```
// HTML代码为
// <span id="myspan">Hello</span>
var span = document.getElementById('myspan');
span.id // "myspan"
span.tagName // "SPAN"

```

### Element.innerHTML

`Element.innerHTML`属性返回该元素包含的HTML代码。该属性可读写，常用来设置某个节点的内容。

如果将该属性设为空，等于删除所有它包含的所有节点。

```
el.innerHTML = '';

```

上面代码等于将`el`节点变成了一个空节点，`el`原来包含的节点被全部删除。

注意，如果文本节点中包含`&`、小于号（`<`）和大于号（`>`），`innerHTML`属性会将它们转为实体形式`&amp;`、`&lt;`、`&gt;`。

```
// HTML代码如下 <p id="para"> 5 > 3 </p>
document.getElementById('para').innerHTML
// 5 &gt; 3

```

由于上面这个原因，导致用`innerHTML`插入`<script>`标签，不会被执行。

```
var name = "<script>alert('haha')</script>";
el.innerHTML = name;

```

上面代码将脚本插入内容，脚本并不会执行。但是，`innerHTML`还是有安全风险的。

```
var name = "<img src=x onerror=alert(1)>";
el.innerHTML = name;

```

上面代码中，`alert`方法是会执行的。因此为了安全考虑，如果插入的是文本，最好用`textContent`属性代替`innerHTML`。

### Element.outerHTML

`Element.outerHTML`属性返回一个字符串，内容为指定元素节点的所有HTML代码，包括它自身和包含的所有子元素。

```
// HTML代码如下
// <div id="d"><p>Hello</p></div>

d = document.getElementById('d');
d.outerHTML
// '<div id="d"><p>Hello</p></div>'

```

`outerHTML`属性是可读写的，对它进行赋值，等于替换掉当前元素。

```
// HTML代码如下
// <div id="container"><div id="d">Hello</div></div>

container = document.getElementById('container');
d = document.getElementById("d");
container.firstChild.nodeName // "DIV"
d.nodeName // "DIV"

d.outerHTML = '<p>Hello</p>';
container.firstChild.nodeName // "P"
d.nodeName // "DIV"

```

上面代码中，`outerHTML`属性重新赋值以后，内层的`div`元素就不存在了，被`p`元素替换了。但是，变量`d`依然指向原来的`div`元素，这表示被替换的`DIV`元素还存在于内存中。

### Element.className，Element.classList

`className`属性用来读写当前元素节点的`class`属性。它的值是一个字符串，每个`class`之间用空格分割。

`classList`属性则返回一个类似数组的对象，当前元素节点的每个`class`就是这个对象的一个成员。

```
<div class="one two three" id="myDiv"></div>

```

上面这个`div`元素的节点对象的`className`属性和`classList`属性，分别如下。

```
document.getElementById('myDiv').className
// "one two three"

document.getElementById('myDiv').classList
// {
//   0: "one"
//   1: "two"
//   2: "three"
//   length: 3
// }

```

从上面代码可以看出，`className`属性返回一个空格分隔的字符串，而`classList`属性指向一个类似数组的对象，该对象的`length`属性（只读）返回当前元素的`class`数量。

classList对象有下列方法。

- add()：增加一个class。
- remove()：移除一个class。
- contains()：检查当前元素是否包含某个class。
- toggle()：将某个class移入或移出当前元素。
- item()：返回指定索引位置的class。
- toString()：将class的列表转为字符串。

```
myDiv.classList.add('myCssClass');
myDiv.classList.add('foo', 'bar');
myDiv.classList.remove('myCssClass');
myDiv.classList.toggle('myCssClass'); // 如果myCssClass不存在就加入，否则移除
myDiv.classList.contains('myCssClass'); // 返回 true 或者 false
myDiv.classList.item(0); // 返回第一个Class
myDiv.classList.toString();

```

下面比较一下，className和classList在添加和删除某个类时的写法。

```
// 添加class
document.getElementById('foo').className += 'bold';
document.getElementById('foo').classList.add('bold');

// 删除class
document.getElementById('foo').classList.remove('bold');
document.getElementById('foo').className =
  document.getElementById('foo').className.replace(/^bold$/, '');
```

toggle方法可以接受一个布尔值，作为第二个参数。如果为`true`，则添加该属性；如果为`false`，则去除该属性。

```
el.classList.toggle('abc', boolValue);

// 等同于

if (boolValue){
  el.classList.add('abc');
} else {
  el.classList.remove('abc');
}
```

## 盒状模型相关属性

### 相关汇总

| 属性名称                                     | 包括盒模型                      | 从元素中获取(对于整个网页来说)                       |
| ---------------------------------------- | -------------------------- | -------------------------------------- |
| Element.clientHeight/Element.clientWidth | 包括Padding,不包括滚动条、边框和Margin | document.documentElement               |
| Element.clientLeft/Element.clientTop     | 包括滚动条，不包括Padding和Margin    | -                                      |
| Element.scrollHeight/Element.scrollWidth | 包括padding，不包括边框和margin     | document.documentElement/document.body |
| Element.scrollLeft/Element.scrollTop     | -                          | document.body                          |
| Element.offsetHeight/Element.offsetWidth | 包括padding/border/滚动        | document.documentElement/document.body |
| Element.offsetLeft/Element.offsetTop     | -                          | -                                      |

### Element.clientHeight，Element.clientWidth

`Element.clientHeight`属性返回元素节点可见部分的高度，`Element.clientWidth`属性返回元素节点可见部分的宽度。所谓“可见部分”，指的是不包括溢出（overflow）的大小，只返回该元素在容器中占据的大小，对于有滚动条的元素来说，它们等于滚动条围起来的区域大小。这两个属性的值包括Padding、但不包括滚动条、边框和Margin，单位为像素。这两个属性可以计算得到，等于元素的CSS高度（或宽度）加上CSS的Padding，减去滚动条（如果存在）。

对于整张网页来说，当前可见高度（即视口高度）要从`document.documentElement`对象（即`<html>`节点）上获取，等同于`window.innerHeight`属性减去水平滚动条的高度。没有滚动条时，这两个值是相等的；有滚动条时，前者小于后者。

```
var rootElement = document.documentElement;

// 没有水平滚动条时
rootElement.clientHeight === window.innerHeight // true

// 没有垂直滚动条时
rootElement.clientWidth === window.innerWidth // true

```

注意，这里不能用`document.body.clientHeight`或`document.body.clientWidth`，因为`document.body`返回`<body>`节点，与视口大小是无关的。

### Element.clientLeft，Element.clientTop

`Element.clientLeft`属性等于元素节点左边框（left border）的宽度，`Element.clientTop`属性等于网页元素顶部边框的宽度，单位为像素。

这两个属性包括滚动条的宽度，但不包括Margin和Padding。不过，一般来说，除非排版方向是从右到左，且发生元素高度溢出，否则不可能存在左侧滚动条，亦不可能存在顶部的滚动条。

如果元素的显示设为`display: inline`，它的`clientLeft`属性一律为`0`，不管是否存在左边框。

### Element.scrollHeight，Element.scrollWidth

`Element.scrollHeight`属性返回某个网页元素的总高度，`Element.scrollWidth`属性返回总宽度，可以理解成元素在垂直和水平两个方向上可以滚动的距离。它们都包括由于溢出容器而无法显示在网页上的那部分高度或宽度。这两个属性是只读属性。

它们返回的是整个元素的高度或宽度，包括由于存在滚动条而不可见的部分。默认情况下，它们包括Padding，但不包括Border和Margin。

整张网页的总高度可以从`document.documentElement`或`document.body`上读取。

```
document.documentElement.scrollHeight

```

如果内容正好适合它的容器，没有溢出，那么`Element.scrollHeight`和`Element.clientHeight`是相等的，`scrollWidth`属性与`clientWidth`属性是相等的。如果存在溢出，那么`scrollHeight`属性大于`clientHeight`属性，`scrollWidth`属性大于`clientWidth`属性。

存在溢出时，当滚动条滚动到内容底部时，下面的表达式为`true`。

```
element.scrollHeight - element.scrollTop === element.clientHeight

```

如果滚动条没有滚动到内容底部，上面的表达式为`false`。这个特性结合`onscroll`事件，可以判断用户是否滚动到了指定元素的底部，比如向用户展示某个内容区块时，判断用户是否滚动到了区块的底部。

```
var rules = document.getElementById('rules');
rules.onscroll = checking;

function checking(){
  if (this.scrollHeight - this.scrollTop === this.clientHeight) {
    console.log('谢谢阅读');
  } else {
    console.log('您还未读完');
  }
}
```

### Element.scrollLeft，Element.scrollTop

`Element.scrollLeft`属性表示网页元素的水平滚动条向右侧滚动的像素数量，`Element.scrollTop`属性表示网页元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于0。

如果要查看整张网页的水平的和垂直的滚动距离，要从`document.body`元素上读取。

```
document.body.scrollLeft
document.body.scrollTop

```

这两个属性都可读写，设置该属性的值，会导致浏览器将指定元素自动滚动到相应的位置。

### Element.offsetHeight，Element.offsetWidth

`Element.offsetHeight`属性返回元素的垂直高度，`Element.offsetWidth`属性返回水平宽度。`offsetHeight`可以理解成元素左下角距离左上角的位移，`offsetWidth`是元素右上角距离左上角的位移。它们的单位为像素，都是只读。

这两个属性值包括`Padding`和`Border`、以及滚动条。这也意味着，如果不存在内容溢出，`Element.offsetHeight`只比`Element.clientHeight`多了边框的高度。

整张网页的高度，可以在`document.documentElement`和`document.body`上读取。

```
// 网页总高度
document.documentElement.offsetHeight
document.body.offsetHeight

// 网页总宽度
document.documentElement.offsetWidth
document.body.offsetWidth

```

### Element.offsetLeft，Element.offsetTop

`Element.offsetLeft`返回当前元素左上角相对于`Element.offsetParent`节点的水平位移，`Element.offsetTop`返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。

下面的代码可以算出元素左上角相对于整张网页的坐标。

```
function getElementPosition(e) {
  var x = 0;
  var y = 0;
  while (e !== null)  {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return {x: x, y: y};
}

```

注意，上面的代码假定所有元素都适合它的容器，不存在内容溢出。

### 总结

整张网页的高度和宽度，可以从`document.documentElement`（即`<html>`元素）或`<body>`元素上读取。

```
// 网页总高度
document.documentElement.offsetHeight
document.documentElement.scrollHeight
document.body.offsetHeight
document.body.scrollHeight

// 网页总宽度
document.documentElement.offsetWidth
document.documentElement.scrollWidth
document.body.offsetWidth
document.body.scrollWidth

```

由于`<html>`和`<body>`的宽度可能设得不一样，因此从`<body>`上取值会更保险一点。

视口的高度和宽度（包括滚动条），有两种方法可以获得。

```
// 视口高度
window.innerHeight // 包括滚动条
document.documentElement.clientHeight // 不包括滚动条

// 视口宽度
window.innerWidth // 包括滚动条
document.documentElement.clientWidth // 不包括滚动条

```

某个网页元素距离视口左上角的坐标，使用`Element.getBoundingClientRect`方法读取。

```
// 网页元素左上角的视口横坐标
Element.getBoundingClientRect().left

// 网页元素左上角的视口纵坐标
Element.getBoundingClientRect().top

```

某个网页元素距离网页左上角的坐标，使用视口坐标加上网页滚动距离。

```
// 网页元素左上角的网页横坐标
Element.getBoundingClientRect().left + document.documentElement.scrollLeft

// 网页元素左上角的网页纵坐标
Element.getBoundingClientRect().top + document.documentElement.scrollTop

```

网页目前滚动的距离，可以从`document.documentElement`节点上得到。

```
// 网页滚动的水平距离
document.documentElement.scrollLeft

// 网页滚动的垂直距离
document.documentElement.scrollTop

```

网页元素本身的高度和宽度（不含overflow溢出的部分），通过`offsetHeight`和`offsetWidth`属性（包括`Padding`和`Border`）或`Element.getBoundingClientRect`方法获取。

```
// 网页元素的高度
Element.offsetHeight

// 网页元素的宽度
Element.offsetWidth
```

## 相关节点的属性

以下属性返回元素节点的相关节点。

### Element.children，Element.childElementCount

`Element.children`属性返回一个`HTMLCollection`对象，包括当前元素节点的所有子元素。它是一个类似数组的动态对象（实时反映网页元素的变化）。如果当前元素没有子元素，则返回的对象包含零个成员。

```
// para是一个p元素节点
if (para.children.length) {
  var children = para.children;
    for (var i = 0; i < children.length; i++) {
      // ...
    }
}

```

这个属性与`Node.childNodes`属性的区别是，它只包括HTML元素类型的子节点，不包括其他类型的子节点。

`Element.childElementCount`属性返回当前元素节点包含的子HTML元素节点的个数，与`Element.children.length`的值相同。注意，该属性只计算HTML元素类型的子节点。

### Element.firstElementChild，Element.lastElementChild

`Element.firstElementChild`属性返回第一个HTML元素类型的子节点，`Element.lastElementChild`返回最后一个HTML元素类型的子节点。

如果没有HTML类型的子节点，这两个属性返回`null`。

### Element.nextElementSibling，Element.previousElementSibling

`Element.nextElementSibling`属性返回当前HTML元素节点的后一个同级HTML元素节点，如果没有则返回`null`。

```
// 假定HTML代码如下
// <div id="div-01">Here is div-01</div>
// <div id="div-02">Here is div-02</div>
var el = document.getElementById('div-01');
el.nextElementSibling
// <div id="div-02">Here is div-02</div>


```

`Element.previousElementSibling`属性返回当前HTML元素节点的前一个同级HTML元素节点，如果没有则返回`null`。

### Element.offsetParent

`Element.offsetParent`属性返回当前HTML元素的最靠近的、并且CSS的`position`属性不等于`static`的父元素。如果某个元素的所有上层节点都将`position`属性设为`static`，则`Element.offsetParent`属性指向`<body>`元素。

该属性主要用于确定子元素的位置偏移，是`Element.offsetTop`和`Element.offsetLeft`的计算基准.

## 属性相关的方法

元素节点提供以下四个方法，用来操作HTML标签的属性。

- `Element.getAttribute()`：读取指定属性
- `Element.setAttribute()`：设置指定属性
- `Element.hasAttribute()`：返回一个布尔值，表示当前元素节点是否有指定的属性
- `Element.removeAttribute()`：移除指定属性

## 查找相关的方法

以下四个方法用来查找与当前元素节点相关的节点。这四个方法也部署在`document`对象上，用法完全一致。

- `Element.querySelector()`
- `Element.querySelectorAll()`
- `Element.getElementsByTagName()`
- `Element.getElementsByClassName()`

上面四个方法只返回Element子节点，因此可以采用链式写法。

```
document
  .getElementById('header')
  .getElementsByClassName('a')

```

### Element.querySelector()

`Element.querySelector`方法接受CSS选择器作为参数，返回父元素的第一个匹配的子元素。

```
var content = document.getElementById('content');
var el = content.querySelector('p');

```

上面代码返回`content`节点的第一个`p`元素。

需要注意的是，浏览器执行`querySelector`方法时，是先在全局范围内搜索给定的CSS选择器，然后过滤出哪些属于当前元素的子元素。因此，会有一些违反直觉的结果，请看下面的HTML代码。

```
<div>
<blockquote id="outer">
  <p>Hello</p>
  <div id="inner">
    <p>World</p>
  </div>
</blockquote>
</div>

```

那么，下面代码实际上会返回第一个`p`元素，而不是第二个。

```
var outer = document.getElementById('outer');
outer.querySelector('div p')
// <p>Hello</p>

```

### Element.querySelectorAll()

`Element.querySelectorAll`方法接受CSS选择器作为参数，返回一个`NodeList`对象，包含所有匹配的子元素。

```
var el = document.querySelector('#test');
var matches = el.querySelectorAll('div.highlighted > p');

```

该方法的执行机制与`querySelector`相同，也是先在全局范围内查找，再过滤出当前元素的子元素。因此，选择器实际上针对整个文档的。

### Element.getElementsByClassName()

`Element.getElementsByClassName`方法返回一个`HTMLCollection`对象，成员是当前元素节点的所有匹配指定`class`的子元素。该方法与`document.getElementsByClassName`方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。

```
element.getElementsByClassName('red test');

```

注意，该方法的参数大小写敏感。

### Element.getElementsByTagName()

`Element.getElementsByTagName`方法返回一个`HTMLCollection`对象，成员是当前元素节点的所有匹配指定标签名的子元素。该方法与`document.getElementsByClassName`方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。

```
var table = document.getElementById('forecast-table');
var cells = table.getElementsByTagName('td');

```

注意，该方法的参数是大小写不敏感的。

### Element.closest()

`Element.closest`方法返回当前元素节点的最接近的父元素（或者当前节点本身），条件是必须匹配给定的CSS选择器。如果不满足匹配，则返回null。

假定HTML代码如下。

```
<article>
  <div id="div-01">Here is div-01
    <div id="div-02">Here is div-02
      <div id="div-03">Here is div-03</div>
    </div>
  </div>
</article>

```

div-03节点的closet方法的例子如下。

```
var el = document.getElementById('div-03');
el.closest("#div-02") // div-02
el.closest("div div") // div-03
el.closest("article > div") //div-01
el.closest(":not(div)") // article

```

上面代码中，由于closet方法将当前元素节点也考虑在内，所以第二个closet方法返回div-03。

### Element.match()

`Element.match`方法返回一个布尔值，表示当前元素是否匹配给定的CSS选择器。

```
if (el.matches('.someClass')) {
  console.log('Match!');
}

```

该方法带有浏览器前缀，下面的函数可以兼容不同的浏览器，并且在浏览器不支持时，自行部署这个功能。

```
function matchesSelector(el, selector) {
  var p = Element.prototype;
  var f = p.matches
    || p.webkitMatchesSelector
    || p.mozMatchesSelector
    || p.msMatchesSelector
    || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}

// 用法
matchesSelector(
  document.getElementById('myDiv'),
  'div.someSelector[some-attribute=true]'
)
```

## 事件相关的方法

以下三个方法与`Element`节点的事件相关。这些方法都继承自`EventTarget`接口，详见本章的《Event对象》一节。

- `Element.addEventListener()`：添加事件的回调函数
- `Element.removeEventListener()`：移除事件监听函数
- `Element.dispatchEvent()`：触发事件

```
element.addEventListener('click', listener, false);
element.removeEventListener('click', listener, false);

var event = new Event('click');
element.dispatchEvent(event);
```

## 其他方法

### Element.scrollIntoView()

`Element.scrollIntoView`方法滚动当前元素，进入浏览器的可见区域，类似于设置`window.location.hash`的效果。

```
el.scrollIntoView(); // 等同于el.scrollIntoView(true)
el.scrollIntoView(false);

```

该方法可以接受一个布尔值作为参数。如果为`true`，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为`false`，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为`true`。

### Element.getBoundingClientRect()

`Element.getBoundingClientRect`方法返回一个对象，该对象提供当前元素节点的大小、位置等信息，基本上就是CSS盒状模型提供的所有信息。

```
var rect = obj.getBoundingClientRect();

```

上面代码中，`getBoundingClientRect`方法返回的`rect`对象，具有以下属性（全部为只读）。

- `x`：元素左上角相对于视口的横坐标
- `left`：元素左上角相对于视口的横坐标，与`x`属性相等
- `right`：元素右边界相对于视口的横坐标（等于`x`加上`width`）
- `width`：元素宽度（等于`right`减去`left`）
- `y`：元素顶部相对于视口的纵坐标
- `top`：元素顶部相对于视口的纵坐标，与`y`属性相等
- `bottom`：元素底部相对于视口的纵坐标
- `height`：元素高度（等于`y`加上`height`）

由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将`left`属性加上`window.scrollX`，`top`属性加上`window.scrollY`。

注意，`getBoundingClientRect`方法的所有属性，都把边框（`border`属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，`width`和`height`包括了元素本身 + `padding` + `border`。

### Element.getClientRects()

`Element.getClientRects`方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形。每个矩形都有`bottom`、`height`、`left`、`right`、`top`和`width`六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

对于盒状元素（比如`<div>`和`<p>`），该方法返回的对象中只有该元素一个成员。对于行内元素（比如span、a、em），该方法返回的对象有多少个成员，取决于该元素在页面上占据多少行。这是它和`Element.getBoundingClientRect()`方法的主要区别，对于行内元素，后者总是返回一个矩形区域，前者可能返回多个矩形区域，所以方法名中的`Rect`用的是复数。

```
<span id="inline">
Hello World
Hello World
Hello World
</span>

```

上面代码是一个行内元素`<span>`，如果它在页面上占据三行，`getClientRects`方法返回的对象就有三个成员，如果它在页面上占据一行，`getClientRects`方法返回的对象就只有一个成员。

```
var el = document.getElementById('inline');
el.getClientRects().length // 3
el.getClientRects()[0].left // 8
el.getClientRects()[0].right // 113.908203125
el.getClientRects()[0].bottom // 31.200000762939453
el.getClientRects()[0].height // 23.200000762939453
el.getClientRects()[0].width // 105.908203125

```

这个方法主要用于判断行内元素是否换行，以及行内元素的每一行的位置偏移。

### Element.insertAdjacentHTML()

`Element.insertAdjacentHTML`方法解析HTML字符串，然后将生成的节点插入DOM树的指定位置。

```
element.insertAdjacentHTML(position, text);

```

该方法接受两个参数，第一个是指定位置，第二个是待解析的字符串。

指定位置共有四个。

- `beforebegin`：在当前元素节点的前面。
- `afterbegin`：在当前元素节点的里面，插在它的第一个子元素之前。
- `beforeend`：在当前元素节点的里面，插在它的最后一个子元素之后。
- `afterend`：在当前元素节点的后面。’

```
// 原来的HTML代码：<div id="one">one</div>
var d1 = document.getElementById('one');
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
// 现在的HTML代码：
// <div id="one">one</div><div id="two">two</div>

```

该方法不是彻底置换现有的DOM结构，这使得它的执行速度比`innerHTML`操作快得多。

### Element.remove()

`Element.remove`方法用于将当前元素节点从DOM树删除。

```
var el = document.getElementById('div-01');
el.remove();

```

### Element.focus()

`Element.focus`方法用于将当前页面的焦点，转移到指定元素上。

```
document.getElementById('my-span').focus();
```