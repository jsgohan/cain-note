## commit 提交规范

根据angular 规范提交commit，这样history看起来更加清晰，还可以自动生成changelog

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- type

  提交commit的类型，包括：

  feat：新功能

  fix：修复问题

  docs：修改文档

  style：修改代码样式，不影响代码逻辑

  refactor：重构代码

  perf：提升性能

  test：增加修改测试用例

  chore：修改工具相关（包括但不限于文档，代码生成等）

  deps：升级依赖

- scope

  修改文件范围

- subject

  用一句话描述这次提交做了什么

- body

  补充subject，适当增加原因，目的等相关因素，也可不写

- footer

  - 当有非兼容性修改（Breaking Change）时，必须在这里描述清楚
  - 关联相关issue，如close #1

