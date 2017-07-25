/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));

    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    if (CTP.checkLogin()) {
        var user = session.user;
        console.log();
        var inputs = $('.pwd-list input'),
            newPayPwd = '';
        $.each(inputs, function (k, v) {
            $(v)[0].addEventListener("input", function () {
                if ($(this).val().length == 1) {

                    newPayPwd += $(this).val();
                    $(this).parent('li').next('li').find('input').focus();
                    if ($(this).parent('li').index() == 5) {
                        var userCode = user.userId,
                            oldPayPwd = exports.sessionStorage.getItem('oldPayPwd'),
                            type,
                            pwdStr = '&oldPayPassword=';
                        if (user.isSetPayPwd == '0') {//设置密码
                            type = '1';
                            oldPayPwd = '';
                            pwdStr = '&oldPayPassword=';
                        }
                        if (user.isSetPayPwd == '1') {//修改密码
                            type = '2';
                            oldPayPwd = oldPayPwd;
                            pwdStr = '&oldPayPassword=' + $.md5(oldPayPwd);

                        }

                        //newPayPwd = $.md5(newPayPwd);
                        var reqSign = $.md5('newPayPassword=' + $.md5(newPayPwd) + pwdStr + '&userId=' + userCode + '&payPwdType=' + type);
                        console.log('newPayPassword=' + newPayPwd + pwdStr + '&userId=' + userCode + '&payPwdType=' + type);
                        var _paramsSetPaypwd = {
                            userCode: userCode,
                            oldPayPassword: $.md5(oldPayPwd),//旧支付密码
                            newPayPassword: $.md5(newPayPwd),//支付密码
                            reqSign: reqSign,//签名
                            type: type,//类型 1设置支付密码； 2修改支付密码；3找回支付密码

                            nonce: 'abc',
                            v: '1.0',
                            format: 'json',
                            method: 'pay.setpassword',
                            locale: 'zh_CN',
                            appKey: session.appKey,
                            sessionId: session.sessionId,
                            timestamp: new Date().getTime(),
                        };
                        CTP.Ajax({
                            params: _paramsSetPaypwd,
                            url: '/msp-charge/router',
                            type: 'POST',
                            success: function (e) {
                                if (e.state == '0') {
                                    CTP.Tips('支付密码修改成功');

                                } else {
                                    CTP.Tips(e.message);
                                }
                                setTimeout(function () {
                                    //exports.location.href = './accountSecurity.html?v=' + new Date().getTime();
                                }, 1000)
                            },
                            error: function (e) {
                                console.log(e);
                            }
                        });
                    }
                }
            }, false)
        });

    } else {
        exports.sessionStorage.setItem('comePage', '../mine/mine.html?v=' + new Date().getTime());
        exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
    }
})(window);