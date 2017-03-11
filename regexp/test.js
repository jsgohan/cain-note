var r = /a(b+)a/g;

//lastIndex只有在有g的情况下才有效
var a1 = r.exec('_abbba_aba_');
console.log(a1) // ['abbba', 'bbb']
console.log(a1.index) // 1
console.log(r.lastIndex) // 6

var a2 = r.exec('_abbbadf_aba_');
console.log(a2) // ['aba', 'b']
console.log(a2.index) // 7
console.log(r.lastIndex) // 10

var a3 = r.exec('_abbba_aba_');
console.log(a3) // null
console.log(a3.index) // TypeError: Cannot read property 'index' of null
console.log(r.lastIndex) // 0

var a4 = r.exec('_abbba_aba_');
console.log(a4) // ['abbba', 'bbb']
console.log(a4.index) // 1
console.log(r.lastIndex)// 6