# DOM CSS操作

## style属性

操作 CSS 样式最简单的方法，就是使用网页元素节点的`getAttribute`方法、`setAttribute`方法和`removeAttribute`方法，直接读写或删除网页元素的`style`属性。

```
div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);

```

上面的代码相当于下面的 HTML 代码。

```
<div style="background-color:red; border:1px solid black;" />

```

### Style对象

每一个网页元素对应一个DOM节点对象。这个对象的`style`属性可以直接操作，用来读写行内CSS样式。

```
var divStyle = document.querySelector('div').style;

divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
divStyle.width = '100px';
divStyle.height = '100px';
divStyle.fontSize = '10em';

divStyle.backgroundColor // red
divStyle.border // 1px solid black
divStyle.height // 100px
divStyle.width // 100px

```

上面代码中，`style`属性的值是一个对象（简称`style`对象）。这个对象所包含的属性与CSS规则一一对应，但是名字需要改写，比如`background-color`写成`backgroundColor`。改写的规则是将横杠从CSS属性名中去除，然后将横杠后的第一个字母大写。如果CSS属性名是JavaScript保留字，则规则名之前需要加上字符串`css`，比如`float`写成`cssFloat`。

注意，`style`对象的属性值都是字符串，设置时必须包括单位，办事不含规则结尾的分号。比如，`divStyle.width`不能写为`100`，而要写为`100px`。

下面是一个例子，通过监听事件，改写网页元素的CSS样式。

```
var docStyle = document.documentElement.style;
var someElement = document.querySelector(...);

document.addEventListener('mousemove', function (e) {
  someElement.style.transform =
    'translateX(' + e.clientX + 'px)' +
    'translateY(' + e.clientY + 'px)';
});

```

### cssText属性

元素节点对象的`style`对象，有一个`cssText`属性，可以读写或删除整个样式。

```
var divStyle = document.querySelector('div').style;

divStyle.cssText = 'background-color: red;'
  + 'border: 1px solid black;'
  + 'height: 100px;'
  + 'width: 100px;';

```

注意，`cssText`的属性值不用改写CSS属性名。