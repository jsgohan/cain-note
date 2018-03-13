# python

## Number类型

Integer

Long integer：以l或L结尾

Boolean：True、False

Double-percision

floating

Complex number：复数，实数和虚数部分组成，虚数部分后缀j或J。如85.234+3j

### 操作符

A+B

A-B

A*B

A/B

A%B

A**B 结果为A的B次方

A//B 取整符

not A 取反 只用于Boolean

A>B

A<B

A==B

A>=B

A<=B

### 比特操作符

~A 二进制取反，补码规则

A&B 并

A|B 或

A^B 异或  两个比特位相同 结果对应位设零，否则设1

A>>B

A<<B

### 内置函数

cmp(A,B) 比较二者大小，前者小返回-1，前者大返回1，相等0

str(A) 参数转换为可显示的字符串

type(A) 参数类型

bool(A) 转换为bool

int(A) 十进制

long(A) 十进制

float(A) 浮点类型

complex(A) 复数

### 数值类型特定函数

abs(A) 取绝对值

coerce(A,B) 将A和B转换成一个类型，并生成一个元祖 如：b=coerce(24, -4.5) 结果为：(24.0, -4.5)

divmod(A,B) 除模操作，生成一个元祖(A/B, A%B)

pow(A,B) 

round(A)

hex(A) 十六进制

oct(A) 八进制

chr(A) 转换为ASCII字符 0<=A<=255

ord(A) chr(A) 反函数

## Sequence类型簇（序列类型簇）

> 包括字符串(String),元组(Tuple),列表(List)

### 操作符

A[index] 获取第index个元素，从0开始

A[index1:index2] 切片，获取第index1到index2-1的子序列

A in B 序列B中是否有A，有=>True

A not in B 

A+B 链接A和B

A*number 重复number次

A>B

A<B

A==B

A>=B

A<=B

### 内置函数

> 求长度、类型转换、排序

enumerate(A)  对序列A生成一个可枚举对象，对象中的每个元素是一个二位元组，元组内容为(index,item)，即(索引号，序列元素)

len(A) 长度

list(A) 转换为List类型

max(A)

max(a, b, ...)

min(A)

min(a, b, ...)

reversed(A)

sorted(A, func=None, key=None, reverse=False)

sum(A, init=0)

tuple(A) 转换为Tuple类型

## String类型

> Sequence类型簇一员，用引号包含标识
>
> 分两种：一种是普通字符串，另一种是Unicode字符串。在引号前加上字母u时，是Unicode字符串。中文用声明为Unicode字符串，如 str1 = u"你好，世界"

### 格式化符号

%c 转为单个字符

%r 转为用repr()函数表达的字符串

%s 转为用str()函数表达的字符串

%d或%i 有符号十进制整数

%u 无符号十进制整数

%o 无符号八进制整数

%x 无符号十六进制整数，字母小写

%X 字母大写

%e 科学计数法，字母小写

%E 字母大写

%f或%F 浮点数

%g python根据数字的大小自动判断转换为%e或者%f

%G python 转换为%E或%F

%% 输出%

### 辅助格式化符号

*定义宽度或小数点的精度

-左对齐

+对正数输出正值符号“+“

m.n m显示的最小总宽度，n小数点后的位数

### 内置函数

capitalize() 字符串第一个字符大写

center(width) 返回一个长度至少为width的字符串，并使原字符串的内容居中

count(str, beg=0, end=len(string)) 返回str出现的次数

decode(encoding='UTF-8', errors='strict') 解码

encode(encoding='UTF-8', errors='strict') 编码

endswith(obj, beg=0, end=len(string)) 检查是否以obj结束 是True

expandtabs(tabsize=8) 将Tab符号转化为空格，默认空格数tabsize是8

find(str, beg=0, end=len(string)) 

index(str, beg=0, end=len(string)) 根find()类似

isalnum() 有字符，且所有字符都是字母或数字，返回True，否则False

isalpha() 有字符，切都是字母 返回True

isdecimal() 可解释为数字，返回True

isdigit() 可解释为数字，返回True

islower() 字符都是小写返回True

isnumeric() 只包含数字字符，返回True

isspace() 字符串是空格 返回True

istitle() 是标题化返回True

isupper() 都是大写返回True

ljust(width) 返回一个原字符串左对齐，并使用空格填充至长度width的新字符串

lower() 转换所有大写字符为小写

lstrip() 截掉stirng左边的空格

replace(str1, str2, num=count(str1))

rfind(str, beg=0, end=len(string)) 右边开始查找

rindex(str, beg=0, end=len(string))

rjust(width)

rpartition(str) 右边开始查找

rstrip() 删除stirng末尾的空格

split(str="", num=count(str)) 

splitlines(num=count('\n')) 按照行分隔，返回包含各行作为元素的列表

startswith(obj, beg=0, end=len(length))

strip([obj]) 在string上执行lstrip()和rstrip()

swapcase() 翻转string中的大小写

title() 将字符串标题化，即所有单词都大写开始

translate(str, del="") 

upper()

zfill(width) 返回长度为width的字符串，原字符串stirng右对齐，前面填充0

## Tuple类型(元组)

> 用圆括号表示，以逗号隔开，Tuple的大小和元素在初始化后不能修改，比List快

## List类型

> 用中括号表示，以逗号隔开，

### 内置函数

append(obj) 在列表尾部添加一个对象

count(obj) 计算对象在列表中出现的次数

extend(seq) 把序列seq的内容添加到列表中

index(obj, i=0, j=len(list)) 计算对象obj在列表中的索引位置

insert(index, obj) 插入index指定位置

pop(index=-1) 读取并删除index位置的对象，默认为最后一个对象

remove(obj) 从列表中删除对象obj

reverse() 反向

list.sort(func=None,key=None,reverse=False)

## set类型

> 普通集合（set）和不可变集合（frozenset）

### 内置函数

add()

update(seq)

remove(element)

## Dictionary类型

> 即对象

### 内置函数

clear() 

copy()

fromkeys(seq, val=None)

in 

not in

==

!=

<

<=

/>

/>=

&

get(key,default=None)

has_key(key) 

items()

keys()

iteritems()

iterkeys()

itervalues()

pop(key[, default])

setdefault(key, default=None)

update(dict)

values()
