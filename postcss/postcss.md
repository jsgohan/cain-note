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

#### 方法1

```
(static) prefix(prop) → {string}
```

Returns the vendor prefix extracted from an input string.

##### Example

```
postcss.vendor.prefix('-moz-tab-size') //=> '-moz-'
postcss.vendor.prefix('tab-size')      //=> ''
```

#### 方法2

```
(static) unprefixed(prop) → {string}
```

Returns the input string stripped of its vendor prefix.

##### Example

```
postcss.vendor.unprefixed('-moz-tab-size') //=> 'tab-size'
```

## 方法

- #### (static) atRule(defaultsopt) → {[AtRule](http://api.postcss.org/AtRule.html)}

Creates a new [AtRule](http://api.postcss.org/AtRule.html) node.

##### Example

```
postcss.atRule({ name: 'charset' }).toString() //=> "@charset"
```

### 成员

#### first :[Node](http://api.postcss.org/Node.html)

The container’s first child.

##### Example

```
rule.first == rule.nodes[0];
```

#### last :[Node](http://api.postcss.org/Node.html)

The container’s last child.

##### Example

```
rule.last == rule.nodes[rule.nodes.length - 1];
```

#### name :string

the at-rule’s name immediately follows the `@`

##### Example

```
const root  = postcss.parse('@media print {}');
media.name //=> 'media'
const media = root.first;
```

#### nodes :Array.<Node>

an array containing the container’s children

##### Example

```
const root = postcss.parse('a { color: black }');
root.nodes.length           //=> 1
root.nodes[0].selector      //=> 'a'
root.nodes[0].nodes[0].prop //=> 'color'
```

#### params :string

the at-rule’s parameters, the values that follow the at-rule’s name but precede any {} block

##### Example

```
const root  = postcss.parse('@media print, screen {}');
const media = root.first;
media.params //=> 'print, screen'
```

#### raws :object

Every parser saves its own properties, but the default CSS parser uses:

- `before`: the space symbols before the node. It also stores `*` and `_` symbols before the declaration (IE hack).
- `after`: the space symbols after the last child of the node to the end of the node.
- `between`: the symbols between the property and value for declarations, selector and `{` for rules, or last parameter and `{` for at-rules.
- `semicolon`: contains true if the last child has an (optional) semicolon.
- `afterName`: the space between the at-rule name and its parameters.

##### Example

```
const root = postcss.parse('  @media\nprint {\n}')
root.first.first.raws //=> { before: '  ',
                      //     between: ' ',
                      //     afterName: '\n',
                      //     after: '\n' }
```

#### append(…children) → {[Node](http://api.postcss.org/Node.html)}

Inserts new nodes to the start of the container.

##### Example

```
const decl1 = postcss.decl({ prop: 'color', value: 'black' });
const decl2 = postcss.decl({ prop: 'background-color', value: 'white' });
rule.append(decl1, decl2);

root.append({ name: 'charset', params: '"UTF-8"' });  // at-rule
root.append({ selector: 'a' });                       // rule
rule.append({ prop: 'color', value: 'black' });       // declaration
rule.append({ text: 'Comment' })                      // comment

root.append('a {}');
root.first.append('color: black; z-index: 1');
```

#### each(callback) → {false|undefined}

##### Example

```
const root = postcss.parse('a { color: black; z-index: 1 }');
const rule = root.first;

for ( let decl of rule.nodes ) {
    decl.cloneBefore({ prop: '-webkit-' + decl.prop });
    // Cycle will be infinite, because cloneBefore moves the current node
    // to the next index
}

rule.each(decl => {
    decl.cloneBefore({ prop: '-webkit-' + decl.prop });
    // Will be executed only for color and z-index
});
```

