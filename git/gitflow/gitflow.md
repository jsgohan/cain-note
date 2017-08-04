# 1. gitflow介绍

#  ![git-model_2x](D:\comtop\repo\simplerepo\git\gitflow\git-model_2x.png)

### 1.1 、主要分支以及职责

#### master分支

```
存放稳定版本节点。不允许在master上进行开发。
```

#### develop分支

```
作为功能的集成分支。只提交bugfix节点，不允许开发新的功能。是feature、release的上游分支（父分支）
```

### 1.2、 辅助分支及职责

#### feature分支

```
用于开发新功能。从develop分支拉取新的feature。功能开发完毕之后，合并到develop分支

```

#### release分支

```
发布新版本分支。从develop分支拉取新的release。当develop分支上的功能已经具备所有发布功能即可拉取release分支。可以提交bugfix节点。发布之后分别合并到master分支和develop分支，并打标签。

```

#### hotFix分支

```
正式发布版本修复分支。master发布之后，发现一些需要修复的紧急bug，从master拉一个hotfix分支用于修复bug。bug修复完毕之后，合并回master和develop分支

```

# 2.gitflow演示

### 2.1、gitflow图形化管理管理工具 sourceTree

#### sourceTree下载地址

[https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/)

#### sourceTree介绍

 ![sourceTree图片](D:\comtop\repo\simplerepo\git\gitflow\sourceTree图片.jpg)

##### gitflow分支层次结构

```
如图，develop 和 master属于最上层，
feature分支: feature/feature-xxx 
release分支：relase/release-1.0
hotfix分支：hotfix/hotfix-xxx

```

##### Git工作流按钮

```
按照gitflow分支管理规则创建，合并分支。分别方便，大大提高工作效率和保证创建合并分支的正确性。

```

##### 推送

```
执行push操作，把本地提交的代码推送到远端

```

##### 拉取

```
pull操作， pull = fetch + merge，获取远端代码并且merge合并本地差异代码

```

##### 获取

```
fetch操作，获取远端代码

```

##### 贮藏

```
暂时存储本地修改文件。使得当前工作区变得干净

```

##### 丢弃

```
丢弃此次修改

```

##### 提交

```
将已暂存的文件提交到本地仓库

```

#### git趣味学习网站

[http://learngitbranching.js.org/?NODEMO](http://learngitbranching.js.org/?NODEMO)

### 2.2、从零开始使用sourceTree操作

##### gitlab上创建新的工程

git上新建一个project，新建的工程只有一个空的master，此时需要提交一个节点到master分支。

```
首次上传，可以传一个readme等文件作为master第一个节点。

```

#### clone工程到本地

```
打开sourceTree，左上角"文件(F)"--> "克隆/新建" 弹出一个Clong框如下
```

 ![gitlab工程地址](D:\comtop\repo\simplerepo\git\gitflow\gitlab工程地址.jpg)

 ![Clone项目](D:\comtop\repo\simplerepo\git\gitflow\Clone项目.jpg)

#### Git工作流初始化

 ![git工作流初始化](D:\comtop\repo\simplerepo\git\gitflow\git工作流初始化.jpg)

```
使用Git工作流按钮初始化之后，会默认创建本地develop分支，feature、release、hotfix文件夹

```

##### feature分支

```
Git工作流初始化之后，便可以使用Git工作流按钮，“建立新的功能”来创建feature分支，如图
```

 ![创建新的feature分支](D:\comtop\repo\simplerepo\git\gitflow\创建新的feature分支.jpg)

```
feature分支功能开发完成之后，合并到develop分支，使用Git工作流按钮“完成功能”合并分支。如图
```

 ![feature完成功能](D:\comtop\repo\simplerepo\git\gitflow\feature完成功能.jpg)

 ![feature分支合并完成选项](D:\comtop\repo\simplerepo\git\gitflow\feature分支合并完成选项.jpg)

##### release分支

```
develop需要发版的功能合并完之后就可以开始拉release分支，使用Git工作流按钮创建release分支，如图
```

 ![release创建](D:\comtop\repo\simplerepo\git\gitflow\release创建.jpg)

 ![release创建选择窗口](D:\comtop\repo\simplerepo\git\gitflow\release创建选择窗口.jpg)

```
发布之后合并分支到master和develop，使用Git工作流按钮“完成发布版本”
```

 ![release完成](D:\comtop\repo\simplerepo\git\gitflow\release完成.jpg)

 ![release合并选项](D:\comtop\repo\simplerepo\git\gitflow\release合并选项.jpg)

```
合并完成之后变成这个样子。Git工作流按钮就是这么省心。
```

 ![release合并之后的树状图](D:\comtop\repo\simplerepo\git\gitflow\release合并之后的树状图.jpg)

##### hotfix分支

```
项目发版并且合并到master分支了，发现有紧急的bug要处理。此时就需要拉hotfix分支来修复bug。使用Git工作流按钮“建立新的修复补丁”
```

 ![hotfix建立](D:\comtop\repo\simplerepo\git\gitflow\hotfix建立.jpg)

```
hotfix建立选项如下图
```

 ![hotfix分支建立选项](D:\comtop\repo\simplerepo\git\gitflow\hotfix分支建立选项.jpg)

```
hotfix完成之后的文件夹结构层次如图
```

 ![hotfix建立完成之后的文件结构](D:\comtop\repo\simplerepo\git\gitflow\hotfix建立完成之后的文件结构.jpg)

```
bugfix之后，合并到master和develop分支。使用Git工作流按钮“完成修复补丁”
```

 ![hotfix完成操作](D:\comtop\repo\simplerepo\git\gitflow\hotfix完成操作.jpg)

 ![hotfix完成操作选项](D:\comtop\repo\simplerepo\git\gitflow\hotfix完成操作选项.jpg)

```
合并完成之后的树状图如下
```

 ![hotfix合并完成树状结构](D:\comtop\repo\simplerepo\git\gitflow\hotfix合并完成树状结构.jpg)

# `git操作过程中的细节`

## `合并之前更新相关的所有分支`

```
在需要代码合并的时候，保持所有相关分支于远端分支同步。这是一个非常优秀的习惯。

```

## `正确的使用pull`

```
为了保证git记录的线性，pull操作一律使用rebase。处理方式有很多，这里说一种方法使用sourceTree处理的方法，为了他人更为了给自己一个清晰干净的记录，如图 
```

 ![pull操作](D:\comtop\repo\simplerepo\git\gitflow\pull操作.jpg)

```
为了尽量保证单一分支的线性可读性，所以需要这样的操作，具体详细可以参考这片文章 https://segmentfault.com/q/1010000007704573
```

## `开发过程中的冲突处理`

```
合并难免会发生冲突。如图
```

 ![合并发生冲突](D:\comtop\repo\simplerepo\git\gitflow\合并发生冲突.jpg)

## `merge冲突解决`

 ![冲突工作副本界面](D:\comtop\repo\simplerepo\git\gitflow\冲突工作副本界面.jpg)

```
冲突提示与svn一样。都是>>>>>> ====== <<<<<<此类标记隔开两个版本差异。使用编辑器处理完冲突之后，将文件add到“已暂存文件区” 然后点击提交按钮commit提交。

```

## `rebase（变基）冲突解决`

```
rebase(变基)冲突显示和上图一样，支持解决冲突有些不一样。
rebase合并实质是一个点一个点的合并，也就是说，一次rebase会出现分多次报冲突的情况。
1.解决冲突之后 ，使用编辑器处理完冲突之后，将文件add到“已暂存文件区” 
2.调用git --continue命令 继续执行基变。
3.如果想撤销合并 使用命令 git rebase --abort
```

> 调用命令行界面

![命令行界面调用](D:\comtop\repo\simplerepo\git\gitflow\命令行界面调用.jpg)

