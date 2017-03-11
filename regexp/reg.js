console.log(/dog/.test("old dog"));

console.log(/dog/.exec("old dog"));

// var r1 = /dog/;
console.log("old dog".match(/dog/));

var s='_x_x';
var r = /x/;
console.log(s.match(r));

console.log(s.search(r));


var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|bbrown|lazy/ig;
var b = a.replace(pattern, function replacer(match) {
    return match.toUpperCase();
})
console.log(b);
console.log(a);

console.log(/[^a]/.test("aa"));
console.log(/[^abc]/.test('hello world') );
console.log(/[^abc]/.test('bbc'));