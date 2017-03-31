# postcss

Create a new [Processor](http://api.postcss.org/Processor.html) instance that will apply `plugins` as CSS processors.

创建一个提供作为css处理器的新的处理器实例

### Example

```
import postcss from 'postcss';

postcss(plugins).process(css, { from, to }).then(result => {
  console.log(result.css);
});
```

## 成员

#### 1.(static) list :[list](http://api.postcss.org/list.html)

##### Example

```
postcss.list.space('5px calc(10% + 5px)') //=> ['5px', 'calc(10% + 5px)']
```

#### 方法1

```
(static) comma(string) → {Array.<string>}
```

Safely splits comma-separated values (such as those for `transition-*` and `background` properties).

##### Example

```
postcss.list.comma('black, linear-gradient(white, black)')
//=> ['black', 'linear-gradient(white, black)']
```

#### 方法2

```
(static) space(string) → {Array.<string>}
```

Safely splits space-separated values (such as those for `background`, `border-radius`, and other shorthand properties).

##### Example

```
postcss.list.space('1px calc(10% + 1px)') //=> ['1px', 'calc(10% + 1px)']
```

#### 2.(static) vendor :[vendor](http://api.postcss.org/vendor.html)

##### Example

```
postcss.vendor.unprefixed('-moz-tab') //=> ['tab']
```

