// console.log方法支持以下占位符，不同格式的数据必须使用对应格式的占位符。
// %s 字符串
// %d 整数
// %i 整数
// %f 浮点数
// %o 对象的链接
// %c CSS格式字符串

['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});

var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];

// console.table(languages);

console.log("出错了！");

console.error('Error: %s (%i)', 'Server is not responding', 500)

// console.warn('Warning! Too few nodes (%d)', document.childNodes.length)

function greet(user) {
//   console.count();
  return 'hi ' + user;
}

greet('bob')
//  : 1
// "hi bob"

greet('alice')
//  : 2
// "hi alice"

greet('bob')


console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
};

console.timeEnd('Array initialize');