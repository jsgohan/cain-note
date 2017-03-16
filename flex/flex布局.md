# flex布局

## 容器属性

flex-direction:主轴方向  row(默认)、row-reverse、column、column-reverse

flex-wrap:是否换行        nowrap（默认）、wrap、wrap-reverse

flex-flow: flex-direction和flex-wrap的简写

justify-content:在主轴上对齐方式    flex-start(默认)、flex-end、center、space-between、space-around

align-items:项目在交叉轴上如何对齐   strech(默认)、flex-start、flex-end、center、baseline

align-content

## item属性

order:定义排列顺序，从小到大

flex-grow:定义项目放大的比例，默认为0，即有剩余空间也不放大

flex-shrink:定义项目缩小比例，即空间不足，项目将缩小

flex-basis:如果设置固定值，项目将占据固定空间

flex:flex-grow flex-shrink flex-basis的集合

align-self:允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性