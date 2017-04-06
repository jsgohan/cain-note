## 元素与变量名

### id属性

由于历史原因，HTML元素的`id`属性的名字，会自动成为全局变量，指向该HTML元素。

```
// HTML元素为
// <div id="example"></div>

example // [object HTMLDivElement]

```

上面代码中，有一个`id`属性等于`example`的`div`元素，结果就自动生成了全局变量`example`，指向这个`div`元素。

如果已有同名全局变量，则`id`元素不会自动生成全局变量。

```
<script>
var example = 1;
</script>

<div id="example"></div>

<script>
console.log(example) // 1
</script>

```

上面代码中，已有全局变量`example`，这时`id`属性就不会自动变成全局变量。另一情况是，DOM生成以后，再对全局变量`example`赋值，这时也会覆盖`example`原来的值。

由于这种原因，默认的全局变量名（比如，`history`、`location`、`navigator`等），最好不要设为`id`属性的名字。

另外，由于原则上，网页之中不应该有同名`id`属性的HTML元素，所以，这种机制产生的全局变量不会重名。

### name属性

由于历史原因，以下HTML元素的`name`属性，也会成为全局变量。

- `<applet>`
- `<area>`
- `<embed>`
- `<form>`
- `<frame>`
- `<frameset>`
- `<iframe>`
- `<img>`
- `<object>`

```
// HTML代码为
// <form name="myForm" />

myForm // [object HTMLFormElement]

```

上面代码中，`form`元素的`name`属性名`myForm`，自动成为全局变量`myForm`。

如果`name`属性同名的HTML元素不止一个，或者某个元素的`id`属性与另一个元素的`name`属性同名，这时全局变量会指向一个类似数组的对象。

```
// HTML代码为
// <div id="myForm" />
// <form name="myForm" />

myForm[0] // [object HTMLDivElement]
myForm[1] // [object HTMLFormElement]

```

上面代码中，全局变量`myForm`的第一个成员指向`div`元素，第二个成员指向`form`元素。

这些元素的`name`属性名，也会成为`document`对象的属性。

```
// HTML代码为<img name="xx" />
document.xx === xx // true

```

上面代码中，`name`属性为`xx`的`img`元素，自动生成了全局变量`xx`和`document`对象的属性`xx`。

如果有多个`name`属性相同的元素，那么`document`对象的该属性指向一个类似数组的对象（NodeList对象的实例）。

这样设计的原意是，通过引用`document.elementName`就可以获得该元素。但是，由于这些属性是自动生成的，既不规范，也不利于除错，所以建议不要使用它们。

另外，如果`iframe`元素有`name`属性或`id`属性，那么生成的全局变量，不是指向`iframe`元素节点，而是指向这个`iframe`代表的子页面`window`对象。

除了自动成为`window`和`document`的属性，带有`id`或`name`属性的HTML元素，还会自动成为集合对象的属性。举例来说，如果有一个表单元素`<form>`。

```
<form name="myform">

```

它会自动成为集合对象`document.forms`的属性。

```
document.forms.myforms;
```

## Form 元素（表单）

表单主要用于收集用户的输入，送到服务器或者在前端处理。

### 选中表单元素

如果`<form>`元素带有`name`或者`id`属性，这个元素节点会自动成为`window`和`document`的属性，并且可以从`document.forms`上取到。`<form name="myForm">`节点用下面几种方法可以拿到。

```
window.myForm
document.myForm
document.forms.myForm
document.forms[n]

```

`document.forms`返回一个类似数组的对象（`HTMLCollection`的实例），包含了当前页面中所有表单（`<form>`元素）。`HTMLCollection`的实例都可以使用某个节点的`id`和`name`属性，取到该节点。

表单对象本身也是一个`HTMLCollection`对象的实例，它里面的各个子节点也可以用`id`属性、`name`属性或者索引值取到。举例来说，`myForm`表单的第一个子节点是`<input type="text" name="address">`，它可以用下面的方法取到。

```
document.forms.myForm[0]
document.forms.myForm.address
document.myForm.address

```

表单节点都有一个`elements`属性，包含了当前表单的所有子元素，所以也可以用下面的方法取到`address`子节点。

```
document.forms.myForm.elements[0]
document.forms.myForm.elements.address

```

表单之中，会有多个元素共用同一个`name`属性的情况。

```
<form name="myForm">
  <label><input type="radio" name="method" value="1">1</label>
  <label><input type="radio" name="method" value="2">2</label>
  <label><input type="radio" name="method" value="3">3</label>
</form>

```

上面代码中，三个单选框元素共用同一个`name`属性，这时如果使用这个`name`属性去引用子节点，返回的将是一个类似数组的对象。

```
document.forms.myForm.elements.method.length // 3

```

如果想知道，用户到底选中了哪一个子节点，就必须遍历所有的同名节点。

```
var methods = document.forms.myForm.elements.method;
var result;

for (var i = 0; i < methods.length; i++) {
  if (methods[i].checked) value = methods[i].value;
}

```

### Form 对象

`<form>`元素对应的DOM节点是一个Form对象。这个对象除了上一小节提到的`elements`属性，还有以下属性，分别对应元素标签中的同名属性。

- `action`
- `encoding`
- `method`
- `target`

Form对象还有两个属性，可以指定事件的回调函数。

- `onsubmit`：提交表单前调用，只要返回`false`，就会取消提交。可以在这个函数里面，校验用户的输入。该函数只会在用户提交表单时调用，脚本调用`submit()`方法是不会触发这个函数的。
- `onreset`：重置表单前调用，只要返回`false`，就会取消表单重置。该函数只能由真实的reset按钮触发，脚本调用`reset()`方法并不会触发这个函数。

```
<form onreset="return confirm('你要重置表单吗？')">
  <!-- ... -->
  <button type="reset">重置</button>
</form>

```

Form对象的方法主要是下面两个。

- `submit()`：将表单数据提交到服务器
- `reset()`：重置表单数据

### 表单控件对象

表单包含了各种控件，每个控件都是一个对象。它们都包含了以下四个属性。

- `type`：表示控件的类型，对于`<input>`元素、`<button>`元素等于这些标签的`type`属性，对于其他控件，`<select>`为`select-one`，`<select multiple>`为`select-multiple`，`<textarea>`为`textarea`。该属性只读。
- `form`：指向包含该控件的表单对象，如果该控件不包含在表单之中，则返回`null`。该属性只读。
- `name`：返回控件标签的`name`属性。该属性只读。
- `value`：返回或设置该控件的值，这个值会被表单提交到服务器。该属性可读写。 才会 `form`属性有一个特别的应用，就是在控件的事件回调函数里面，`this`指向事件所在的控件对象，所以`this.form`就指向控件所在的表单，`this.form.x`就指向其他控件元素，里面的`x`就是该控件的`name`属性或`id`属性的值。

表单控件之中，只要是按钮，都有`onclick`属性，用来指定用户点击按钮时的回调函数；其他的控件一般都有`onchange`属性，控件值发生变化，并且该控件失去焦点时调用。单选框（Radio控件）和多选框（Checkbox控件）可以同时设置`onchange`和`onclick`属性。

表单控件还有以下两个事件。

- `focus`：得到焦点时触发
- `blur`：失去焦点时触发

### Select元素

`<select>`元素用来生成下拉列表。默认情况下，浏览器只显示一条选项，其他选项需要点击下拉按钮才会显示。`size`选项如果大于1，那么浏览器就会默认显示多个选项。

```
<select size="3">

```

上面代码指定默认显示三个选项，更多的选项需要点击下拉按钮才会显示。

`<select>`元素默认只能选中一个选项，如果想选中多个选项，必须指定`multiple`属性。

```
<select multiple>

```

用户选中或者取消一个下拉选项时，会触发`Select`对象的`change`事件，从而自动执行`onchange`监听函数。

`<select>`元素有一个`options`属性，返回一个类似数组的对象，包含了所有的`<option>`元素。

```
// HTML 代码为
// <select id="example">
//   <option>1</option>
//   <option>2</option>
//   <option>3</option>
// </select>

var element = document.querySelector('#example');
element.options.length
// 3

```

上面代码中，`<select>`元素的`options`属性包含了三个`<option>`元素。

`options`属性可读写，可以通过设置`options.length`，控制向用户显示的下拉选项的值。将`options.length`设为0，可以不再显示任何下拉属性。将`options`里面某个位置的`Option`对象设为`null`，将等于移除这个选项，后面的`Option`对象会自动递补这个位置。

`Select`对象的`selectedIndex`属性，返回用户选中的第一个下拉选项的位置（从0开始）。如果返回`-1`，则表示用户没有选中任何选项。该属性可读写。对于单选的下拉列表，这个属性就可以得知用户的选择；对于多选的下拉列表，这个属性还不够，必须逐个轮询`options`属性，判断每个`Option`对象的`selected`属性是否为`true`。

### Option元素

`<option>`元素用于在下拉列表（`<select>`）中生成下拉选项。每个下拉选项就是一个`Option`对象，它有以下属性。

- `selected`：返回一个布尔值，表示用户是否选中该选项。
- `text`：返回该下拉选项的显示的文本。该属性可读写，可用来显示向用户显示的文本。
- `value`：返回该下拉选项的值，即向服务器发送的那个值。该属性可读写。
- `defaultSelected`：返回一个布尔值，表示这个下拉选项是否默认选中。

浏览器提供`Option`构造函数，用来生成下拉列表的选项对象。利用这个函数，可以用脚本生成下拉选项，然后放入`Select.options`对象里面，从而自动生成下拉列表。

```
var item = new Option(
  'Hello World',  // 显示的文本，即 text 属性
  'myValue',  // 向服务器发送的值，即 value 属性
  false,    // 是否为默认选项，即 defaultSelected 属性
  false   // 是否已经选中，即 selected 属性
);

// 获取 Selector 对象
var mySelector = document.forms.myForm.mySelector;
mySelector.options[mySelector.options.length] = item;

```

上面代码在下拉列表的末尾添加了一个选项。从中可以看到，`Option`构造函数可以接受四个选项，对应`<Option>`对象的四个属性。

注意，用脚本插入下拉选项完全可以用标准的DOM操作方法实现，比如`Document.create Element()`、`Node.insertBefore()`和`Node.removeChild()`等等。

## image元素

### alt属性，src属性

`alt`属性返回`image`元素的HTML标签的`alt`属性值，`src`属性返回`image`元素的HTML标签的`src`属性值。

```
// 方法一：HTML5构造函数Image
var img1 = new Image();
img1.src = 'image1.png';
img1.alt = 'alt';
document.body.appendChild(img1);

// 方法二：DOM HTMLImageElement
var img2 = document.createElement('img');
img2.src = 'image2.jpg';
img2.alt = 'alt text';
document.body.appendChild(img2);

document.images[0].src
// image1.png

```

### complete属性

complete属性返回一个布尔值，true表示当前图像属于浏览器支持的图形类型，并且加载完成，解码过程没有出错，否则就返回false。

### height属性，width属性

这两个属性返回image元素被浏览器渲染后的高度和宽度。

### naturalWidth属性，naturalHeight属性

这两个属性只读，表示image对象真实的宽度和高度。

```
myImage.addEventListener('onload', function() {
	console.log('My width is: ', this.naturalWidth);
	console.log('My height is: ', this.naturalHeight);
});


```

## table元素

表格有一些特殊的DOM操作方法。

- **insertRow()**：在指定位置插入一个新行（tr）。
- **deleteRow()**：在指定位置删除一行（tr）。
- **insertCell()**：在指定位置插入一个单元格（td）。
- **deleteCell()**：在指定位置删除一个单元格（td）。
- **createCaption()**：插入标题。
- **deleteCaption()**：删除标题。
- **createTHead()**：插入表头。
- **deleteTHead()**：删除表头。

下面是使用JavaScript生成表格的一个例子。

```
var table = document.createElement('table');
var tbody = document.createElement('tbody');
table.appendChild(tbody);

for (var i = 0; i <= 9; i++) {
  var rowcount = i + 1;
  tbody.insertRow(i);
  tbody.rows[i].insertCell(0);
  tbody.rows[i].insertCell(1);
  tbody.rows[i].insertCell(2);
  tbody.rows[i].cells[0].appendChild(document.createTextNode('Row ' + rowcount + ', Cell 1'));
  tbody.rows[i].cells[1].appendChild(document.createTextNode('Row ' + rowcount + ', Cell 2'));
  tbody.rows[i].cells[2].appendChild(document.createTextNode('Row ' + rowcount + ', Cell 3'));
}

table.createCaption();
table.caption.appendChild(document.createTextNode('A DOM-Generated Table'));

document.body.appendChild(table);

```

这些代码相当易读，其中需要注意的就是`insertRow`和`insertCell`方法，接受一个表示位置的参数（从0开始的整数）。

`table`元素有以下属性：

- **caption**：标题。
- **tHead**：表头。
- **tFoot**：表尾。
- **rows**：行元素对象，该属性只读。
- **rows.cells**：每一行的单元格对象，该属性只读。
- **tBodies**：表体，该属性只读。

## audio元素，video元素

audio元素和video元素加载音频和视频时，以下事件按次序发生。

- loadstart：开始加载音频和视频。
- durationchange：音频和视频的duration属性（时长）发生变化时触发，即已经知道媒体文件的长度。如果没有指定音频和视频文件，duration属性等于NaN。如果播放流媒体文件，没有明确的结束时间，duration属性等于Inf（Infinity）。
- loadedmetadata：媒体文件的元数据加载完毕时触发，元数据包括duration（时长）、dimensions（大小，视频独有）和文字轨。
- loadeddata：媒体文件的第一帧加载完毕时触发，此时整个文件还没有加载完。
- progress：浏览器正在下载媒体文件，周期性触发。下载信息保存在元素的buffered属性中。
- canplay：浏览器准备好播放，即使只有几帧，readyState属性变为CAN_PLAY。
- canplaythrough：浏览器认为可以不缓冲（buffering）播放时触发，即当前下载速度保持不低于播放速度，readyState属性变为CAN_PLAY_THROUGH。

除了上面这些事件，audio元素和video元素还支持以下事件。

| 事件           | 触发条件                                  |
| ------------ | ------------------------------------- |
| abort        | 播放中断                                  |
| emptied      | 媒体文件加载后又被清空，比如加载后又调用load方法重新加载。       |
| ended        | 播放结束                                  |
| error        | 发生错误。该元素的error属性包含更多信息。               |
| pause        | 播放暂停                                  |
| play         | 暂停后重新开始播放                             |
| playing      | 开始播放，包括第一次播放、暂停后播放、结束后重新播放。           |
| ratechange   | 播放速率改变                                |
| seeked       | 搜索操作结束                                |
| seeking      | 搜索操作开始                                |
| stalled      | 浏览器开始尝试读取媒体文件，但是没有如预期那样获取数据           |
| suspend      | 加载文件停止，有可能是播放结束，也有可能是其他原因的暂停          |
| timeupdate   | 网页元素的currentTime属性改变时触发。              |
| volumechange | 音量改变时触发（包括静音）。                        |
| waiting      | 由于另一个操作（比如搜索）还没有结束，导致当前操作（比如播放）不得不等待。 |

## tabindex属性

`tabindex`属性用来指定，当前HTML元素节点是否被tab键遍历，以及遍历的优先级。

```
var b1 = document.getElementById("button1");

b1.tabIndex = 1;

```

如果`tabindex = -1`，tab键跳过当前元素。

如果`tabindex = 0`，表示tab键将遍历当前元素。如果一个元素没有设置tabindex，默认值就是0。

如果`tabindex > 0`，表示tab键优先遍历。值越大，就表示优先级越大。

# 表单

## 表单元素

`input`、`textarea`、`password`、`select`等元素都可以通过`value`属性取到它们的值。

### select

`select`是下拉列表元素。

```
<div>
<label for="os">Operating System</label>
<select name="os" id="os">
    <option>Choose</option>
    <optgroup label="Windows">
        <option value="7 Home Basic">7 Home Basic</option>
        <option value="7 Home Premium">7 Home Premium</option>
        <option value="7 Professional">7 Professional</option>
        <option value="7 Ultimate">7 Ultimate</option>
        <option value="Vista">Vista</option>
        <option value="XP">XP</option>
    </optgroup>
<select>
</div>

```

可以通过`value`属性取到用户选择的值。

```
var data = document.getElementById('selectMenu').value;

```

`selectedIndex`可以设置选中的项目（从0开始）。如果用户没有选中任何一项，`selectedIndex`等于`-1`。

```
document.getElementById('selectMenu').selectedIndex = 1;

```

`select`元素也可以设置为多选。

```
<select name="categories" id="categories" multiple>

```

设为多选时，`value`只返回选中的第一个选项。要取出所有选中的值，就必须遍历`select`的所有选项，检查每一项的`selected`属性。

```
var selected = [];
for (var i = 0, count = elem.options.length; i < count; i++) {
  if (elem.options[i].selected) {
    selected.push(elem.options[i].value);
  }
}

```

### checkbox

`checkbox`是多选框控件，每个选择框只有选中和不选中两种状态。

```
<input type="checkbox" name="toggle" id="toggle" value="toggle">

```

`checked`属性返回一个布尔值，表示用户是否选中。

```
var which = document.getElementById('someCheckbox').checked;

```

`checked`属性是可写的。

```
which.checked = true;

```

`value`属性可以获取单选框的值。

```
if (which.checked) {
  var value = document.getElementById('someCheckbox').value;
}

```

### radio

radio是单选框控件，同一组选择框同时只能选中一个，选中元素的`checked`属性为`true`。由于同一组选择框的`name`属性都相同，所以只有通过遍历，才能获得用户选中的那个选择框的`value`。

```
<input type="radio" name="gender" value="Male"> Male </input>
<input type="radio" name="gender" value="Female"> Female </input>
<script>
var radios = document.getElementsByName('gender');
var selected;
for (var i = 0; i < radios.length; i++) {
  if (radios[i].checked) {
    selected = radios[i].value;
    break;
  }
}
if (selected) {
  // 用户选中了某个选项
}
</script>

```

上面代码中，要求用户选择“性别”。通过遍历所有选项，获取用户选中的项。如果用户未做任何选择，则`selected`就为`undefined`。

## 表单的验证

### HTML 5表单验证

所谓“表单验证”，指的是检查用户提供的数据是否符合要求，比如Email地址的格式。

检查用户是否在`input`输入框之中填入值。

```
if (inputElem.value === inputElem.defaultValue) {
  // 用户没有填入内容
}

```

HTML 5原生支持表单验证，不需要JavaScript。

```
<input type="date" >

```

上面代码指定该input输入框只能填入日期，否则浏览器会报错。

但有时，原生的表单验证不完全符合需要，而且出错信息无法指定样式。这时，可能需要使用表单对象的noValidate属性，将原生的表单验证关闭。

```
var form = document.getElementById("myform");
form.noValidate = true;

form.onsubmit = validateForm;

```

上面代码先关闭原生的表单验证，然后指定submit事件时，让JavaScript接管表单验证。

此外，还可以只针对单个的input输入框，关闭表单验证。

```
form.field.willValidate = false;

```

每个input输入框都有willValidate属性，表示是否开启表单验证。对于那些不支持的浏览器（比如IE8），该属性等于undefined。

麻烦的地方在于，即使willValidate属性为true，也不足以表示浏览器支持所有种类的表单验证。比如，Firefox 29不支持date类型的输入框，会自动将其改为text类型，而此时它的willValidate属性为true。为了解决这个问题，必须确认input输入框的类型（type）未被浏览器改变。

```
if (field.nodeName === "INPUT" && field.type !== field.getAttribute("type")) {
    // 浏览器不支持该种表单验证，需自行部署JavaScript验证
}

```

### checkValidity方法，setCustomValidity方法，validity对象

checkValidity方法表示执行原生的表单验证，如果验证通过返回true。如果验证失败，则会触发一个invalid事件。使用该方法以后，会设置validity对象的值。

每一个表单元素都有一个validity对象，它有以下属性。

- valid：如果该元素通过验证，则返回true。
- valueMissing：如果用户没填必填项，则返回true。
- typeMismatch：如果填入的格式不正确（比如Email地址），则返回true。
- patternMismatch：如果不匹配指定的正则表达式，则返回true。
- tooLong：如果超过最大长度，则返回true。
- tooShort：如果小于最短长度，则返回true。
- rangeUnderFlow：如果小于最小值，则返回true。
- rangeOverflow：如果大于最大值，则返回true。
- stepMismatch：如果不匹配步长（step），则返回true。
- badInput：如果不能转为值，则返回true。
- customError：如果该栏有自定义错误，则返回true。

setCustomValidity方法用于自定义错误信息，该提示信息也反映在该输入框的validationMessage属性中。如果将setCustomValidity设为空字符串，则意味该项目验证通过。

# 文件和二进制数据的操作

Blob对象是一个代表二进制数据的基本对象

- File对象：负责处理那些以文件形式存在的二进制数据，也就是操作本地文件；
- FileList对象：File对象的网页表单接口；
- FileReader对象：负责将二进制数据读入内存内容；
- URL对象：用于对二进制数据生成URL。

## Blob对象

Blob（Binary Large Object）对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的API（比如File对象），都是建立在Blob对象基础上的，继承了它的属性和方法。

生成Blob对象有两种方法：一种是使用Blob构造函数，另一种是对现有的Blob对象使用slice方法切出一部分。

（1）Blob构造函数，接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是数据的类型，这两个参数都不是必需的。

```
var htmlParts = ["<a id=\"a\"><b id=\"b\">hey!<\/b><\/a>"];
var myBlob = new Blob(htmlParts, { "type" : "text\/xml" });

```

下面是一个利用Blob对象，生成可下载文件的例子。

```
var blob = new Blob(["Hello World"]);

var a = document.createElement("a");
a.href = window.URL.createObjectURL(blob);
a.download = "hello-world.txt";
a.textContent = "Download Hello World!";

body.appendChild(a);
```

上面的代码生成了一个超级链接，点击后提示下载文本文件hello-world.txt，文件内容为“Hello World”。

（2）Blob对象的slice方法，将二进制数据按照字节分块，返回一个新的Blob对象。

```
var newBlob = oldBlob.slice(startingByte, endindByte);

```

下面是一个使用XMLHttpRequest对象，将大文件分割上传的例子。

```
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(blobOrFile);
}

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  var blob = this.files[0];

  const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
  const SIZE = blob.size;

  var start = 0;
  var end = BYTES_PER_CHUNK;

  while(start < SIZE) {
    upload(blob.slice(start, end));

    start = end;
    end = start + BYTES_PER_CHUNK;
  }
}, false);

})();
```

（3）Blob对象有两个只读属性：

- size：二进制数据的大小，单位为字节。
- type：二进制数据的MIME类型，全部为小写，如果类型未知，则该值为空字符串。

在Ajax操作中，如果xhr.responseType设为blob，接收的就是二进制数据。

## FileList对象

FileList对象针对表单的file控件。当用户通过file控件选取文件后，这个控件的files属性值就是FileList对象。它在结构上类似于数组，包含用户选取的多个文件。

```
<input type="file" id="input" onchange="console.log(this.files.length)" multiple />

```

当用户选取文件后，就可以读取该文件。

```
var selected_file = document.getElementById('input').files[0];

```

采用拖放方式，也可以得到FileList对象。

```
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('drop', handleFileSelect, false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // ...
}

```

上面代码的 handleFileSelect 是拖放事件的回调函数，它的参数evt是一个事件对象，该参数的dataTransfer.files属性就是一个FileList对象，里面包含了拖放的文件

## File API

File API提供`File`对象，它是`FileList`对象的成员，包含了文件的一些元信息，比如文件名、上次改动时间、文件大小和文件类型。

```
var selected_file = document.getElementById('input').files[0];

var fileName = selected_file.name;
var fileSize = selected_file.size;
var fileType = selected_file.type;

```

`File`对象的属性值如下。

- `name`：文件名，该属性只读。
- `size`：文件大小，单位为字节，该属性只读。
- `type`：文件的MIME类型，如果分辨不出类型，则为空字符串，该属性只读。
- `lastModified`：文件的上次修改时间，格式为时间戳。
- `lastModifiedDate`：文件的上次修改时间，格式为`Date`对象实例。

## FileReader API

FileReader API用于读取文件，即把文件内容读入内存。它的参数是`File`对象或`Blob`对象。

对于不同类型的文件，FileReader提供不同的方法读取文件。

- `readAsBinaryString(Blob|File)`：返回二进制字符串，该字符串每个字节包含一个0到255之间的整数。
- `readAsText(Blob|File, opt_encoding)`：返回文本字符串。默认情况下，文本编码格式是’UTF-8’，可以通过可选的格式参数，指定其他编码格式的文本。
- `readAsDataURL(Blob|File)`：返回一个基于Base64编码的data-uri对象。
- `readAsArrayBuffer(Blob|File)`：返回一个ArrayBuffer对象。

`readAsText`方法用于读取文本文件，它的第一个参数是`File`或`Blob`对象，第二个参数是前一个参数的编码方法，如果省略就默认为`UTF-8`编码。该方法是异步方法，一般监听`onload`件，用来确定文件是否加载结束，方法是判断`FileReader`实例的`result`属性是否有值。其他三种读取方法，用法与`readAsText`方法类似。

```
var reader = new FileReader();
reader.onload = function(e) {
  var text = reader.result;
}

reader.readAsText(file, encoding);

```

`readAsDataURL`方法返回一个data URL，它的作用基本上是将文件数据进行Base64编码。你可以将返回值设为图像的`src`属性。

```
var file = document.getElementById('destination').files[0];
if(file.type.indexOf('image') !== -1) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var dataURL = reader.result;
  }
  reader.readAsDataURL(file);
}

```

`readAsBinaryString`方法可以读取任意类型的文件，而不仅仅是文本文件，返回文件的原始的二进制内容。这个方法与XMLHttpRequest.sendAsBinary方法结合使用，就可以使用JavaScript上传任意文件到服务器。

```
var reader = new FileReader();
reader.onload = function(e) {
  var rawData = reader.result;
}
reader.readAsBinaryString(file);

```

`readAsArrayBuffer`方法读取文件，返回一个类型化数组（ArrayBuffer），即固定长度的二进制缓存数据。在文件操作时（比如将JPEG图像转为PNG图像），这个方法非常方便。

```
var reader = new FileReader();
reader.onload = function(e) {
  var arrayBuffer = reader.result;
}

reader.readAsArrayBuffer(file);

```

除了以上四种不同的读取文件方法，FileReader API还有一个`abort`方法，用于中止文件上传。

```
var reader = new FileReader();
reader.abort();

```

FileReader对象采用异步方式读取文件，可以为一系列事件指定回调函数。

- onabort方法：读取中断或调用reader.abort()方法时触发。
- onerror方法：读取出错时触发。
- onload方法：读取成功后触发。
- onloadend方法：读取完成后触发，不管是否成功。触发顺序排在 onload 或 onerror 后面。
- onloadstart方法：读取将要开始时触发。
- onprogress方法：读取过程中周期性触发。

下面的代码是如何展示文本文件的内容。

```
var reader = new FileReader();
reader.onload = function(e) {
  console.log(e.target.result);
}
reader.readAsText(blob);

```

`onload`事件的回调函数接受一个事件对象，该对象的`target.result`就是文件的内容。

下面是一个使用`readAsDataURL`方法，为`img`元素添加`src`属性的例子。

```
var reader = new FileReader();
reader.onload = function(e) {
  document.createElement('img').src = e.target.result;
};
reader.readAsDataURL(f);

```

下面是一个`onerror`事件回调函数的例子。

```
var reader = new FileReader();
reader.onerror = errorHandler;

function errorHandler(evt) {
  switch(evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert('File Not Found!');
      break;
    case evt.target.error.NOT_READABLE_ERR:
      alert('File is not readable');
      break;
    case evt.target.error.ABORT_ERR:
      break;
    default:
      alert('An error occurred reading this file.');
  };
}

```

下面是一个`onprogress`事件回调函数的例子，主要用来显示读取进度。

```
var reader = new FileReader();
reader.onprogress = updateProgress;

function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.totalEric Bidelman) * 100);
    var progress = document.querySelector('.percent');
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}

```

读取大文件的时候，可以利用`Blob`对象的`slice`方法，将大文件分成小段，逐一读取，这样可以加快处理速度。

## 综合实例：显示用户选取的本地图片

假设有一个表单，用于用户选取图片。

```
<input type="file" name="picture" accept="image/png, image/jpeg"/>
```

一旦用户选中图片，将其显示在canvas的函数可以这样写：

```
document.querySelector('input[name=picture]').onchange = function(e){
     readFile(e.target.files[0]);
}

function readFile(file){

  var reader = new FileReader();

  reader.onload = function(e){
    applyDataUrlToCanvas( reader.result );
  };

  reader.reaAsDataURL(file);
}
```

还可以在canvas上面定义拖放事件，允许用户直接拖放图片到上面。

```
// stop FireFox from replacing the whole page with the file.
canvas.ondragover = function () { return false; };

// Add drop handler
canvas.ondrop = function (e) {
  e.stopPropagation();
  e.preventDefault(); 
  e = e || window.event;
  var files = e.dataTransfer.files;
  if(files){
    readFile(files[0]);
  }
};
```

所有的拖放事件都有一个dataTransfer属性，它包含拖放过程涉及的二进制数据。

还可以让canvas显示剪贴板中的图片。

```
document.onpaste = function(e){
  e.preventDefault();
  if(e.clipboardData&&e.clipboardData.items){
    // pasted image
    for(var i=0, items = e.clipboardData.items;i<items.length;i++){
      if( items[i].kind==='file' && items[i].type.match(/^image/) ){
        readFile(items[i].getAsFile());
        break;
      }
    }
  }
  return false;
};
```

## URL对象

URL对象用于生成指向File对象或Blob对象的URL。

```
var objecturl =  window.URL.createObjectURL(blob);
```

上面的代码会对二进制数据生成一个URL，类似于“blob:http%3A//test.com/666e6730-f45c-47c1-8012-ccc706f17191”。这个URL可以放置于任何通常可以放置URL的地方，比如img标签的src属性。需要注意的是，即使是同样的二进制数据，每调用一次URL.createObjectURL方法，就会得到一个不一样的URL。

这个URL的存在时间，等同于网页的存在时间，一旦网页刷新或卸载，这个URL就失效。除此之外，也可以手动调用URL.revokeObjectURL方法，使URL失效。

```
window.URL.revokeObjectURL(objectURL);
```

下面是一个利用URL对象，在网页插入图片的例子。

```
var img = document.createElement("img");

img.src = window.URL.createObjectURL(files[0]);

img.height = 60;

img.onload = function(e) {
    window.URL.revokeObjectURL(this.src);
}

body.appendChild(img);

var info = document.createElement("span");

info.innerHTML = files[i].name + ": " + files[i].size + " bytes";

body.appendChild(info);
```

还有一个本机视频预览的例子。

```
var video = document.getElementById('video');
var obj_url = window.URL.createObjectURL(blob);
video.src = obj_url;
video.play()
window.URL.revokeObjectURL(obj_url);
```