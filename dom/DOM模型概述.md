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



