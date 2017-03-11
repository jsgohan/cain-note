function creatRandom(length) {
    var randomStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    randomStr += 'abcdefghijklmnopqrstuvwxyz';
    randomStr += '0123456789';
    var str = "";
    for(var index=0; index<length; index++) {
        var rand = Math.floor((Math.random() * randomStr.length));
        str += randomStr.substring(rand,rand+1);
    }
    return str;
}

console.log(creatRandom(4));