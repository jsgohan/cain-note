# html5相关知识

## 防止网页垮框架

很简单，在你的网页中添加如下代码就可以了

```
<style> html{ visibility:hidden; }</style>
<script>
if( self == top){
        document.documentElement.style.visibility='visible';
}else{
        top.location = self.location;
}
</script>
```

上面的这个办法可以帮助我们解决网站扫描出来的垮框架漏洞。

## css的ime-mode属性

```
style="ime-mode:disabled "
```

> 语法： ime-mode : auto | active | inactive | disabled

ime-mode这个css属性是设置或检索是否允许用户激活输入中文，韩文，日文等的输入法(ime)状态。假如你设置了disabled，那么你就不能切换中文输入法，只能用键盘上面的字母和数字。

### 页面过度效果（IE中才有）

在IE5.5及以上版本的浏览器中，增加了页面过渡效果，经过检查和实验，IE中是可以的，谷歌浏览器是不支持的。

方法：

只需在中添加一个特殊的即可，比如：

```
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=12)" /> 
```

http-equiv 作用很多,这里的值为 Page-Enter 是指在页面进入的时候发生,其他值还有:

```
Page-Enter : 进入页面

Page-Exit  : 离开页面

Site-Enter : 进入网站

Site-Exit  : 离开网站
```

content 当然就是内容咯,这里表示页面过渡的效果设置,这里的两个属性表示分别表示

```
Duration  : 过渡速度
Transition : 可选项。整数值(Integer)。设置或检索转换所使用的方式 
```

具体数值介绍:

```
0 : 矩形收缩转换。 
       1 : 矩形扩张转换。

       2 : 圆形收缩转换。

       3 : 圆形扩张转换。 
       4 : 向上擦除。 
       5 : 向下擦除。 
       6 : 向右擦除。 
       7 : 向左擦除。 
       8 : 纵向百叶窗转换。 
       9 : 横向百叶窗转换。 
       10 : 国际象棋棋盘横向转换。 
       11 : 国际象棋棋盘纵向转换。 
       12 : 随机杂点干扰转换。 
       13 : 左右关门效果转换。 
       14 : 左右开门效果转换。 
       15 : 上下关门效果转换。 
       16 : 上下开门效果转换。 
       17 : 从右上角到左下角的锯齿边覆盖效果转换。 
       18 : 从右下角到左上角的锯齿边覆盖效果转换。 
       19 : 从左上角到右下角的锯齿边覆盖效果转换。 
       20 : 从左下角到右上角的锯齿边覆盖效果转换。 
       21 : 随机横线条转换。 
       22 : 随机竖线条转换。 
23 : 随机使用上面可能的值转换。 
```

### IE中防止网页另存为的方法

```
<noscript>
<iframe src="*.htm"></iframe>
</noscript>
```

上面的这些，应该测试，在谷歌浏览器中是不起作用的，在IE中可以很好的展现！