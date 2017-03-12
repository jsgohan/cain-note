var obj ={
  foo: function () {
      var _this = this;

    console.log(this);
    function foo2() {
        console.log(this === _this);
    }
    foo2();
  }
};

console.log(obj.foo()); // obj

//情况一
// console.log((obj.foo = obj.foo)()); //window
// 情况二
// (false || obj.foo)() // window
// 情况三
// (1, obj.foo)() // window


var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

var hello = a.b.m;
hello() // undefined
var hello2 = a.b;
hello2.m();


var counter = {
  count: 0
};
counter.inc = function () {
  'use strict';
  this.count++
};
// var f = counter.inc;
// f()
// TypeError: Cannot read property 'count' of undefined
