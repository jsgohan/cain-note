# js子父框架通信

## 获取父框架的内容

window.parent.name;//name为要获取的值的名称

parent.document.getElementById("id");//根据id获取父框架对象

## 获取子框架的内容

document.getElementById("id").contentWindow.document.getElementById("childId");//根据子窗口Id获取子框架内容，获取框架对象

window.frameName<==>window.frames['frameName']<==>window.frames.namedItem('frameName');//根据框架名称获取子框架的window对象

window.frames[id]<==>window.frames.item(id)

window.frames['frameName'].functionName;//父框架调用子框架的方法

frameName.document.getElementById("childid")

## 兄弟框架之间的引用

self.parent.frames['frameName'];

## 引用顶层框架

每个window对象都有一个top属性，表示顶层窗口

window.top.frames;//获取顶层框架中的所有子框架

## 改变框架载入的页面

每个window对象都有一个location属性，可以改变框架的载入路径

window.frames[0].location('url')