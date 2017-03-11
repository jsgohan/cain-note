var r = /a(b+)a/g;
var s = '_abbba_aba_';

while(true) {
    var match = r.exec(s);
    if(!match) break;
    console.log(match[1]);
}