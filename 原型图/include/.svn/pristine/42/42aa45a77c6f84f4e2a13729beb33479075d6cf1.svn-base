/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));
    $('.pwd-list li:first').find('input').focus();

    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    if (CTP.checkLogin()) {
        var user = session.user,
            title;
        if (user.isSetPayPwd == '0') {//未设置密码
            title = '请设置密码';
            var inputs = $('.pwd-list input'),
                oldPayPwd = '';
            $.each(inputs, function (k, v) {
                $(v)[0].addEventListener("input", function () {

                    if ($(this).val().length == 1) {
                        oldPayPwd += $(this).val();
                        $(this).parent('li').next('li').find('input').focus();
                        if ($(this).parent('li').index() == 5) {
                            //oldPayPwd = $.md5(oldPayPwd);
                            exports.sessionStorage.setItem('oldPayPwd', oldPayPwd);
                            exports.location.href = './setNewPaypwd.html?v=' + new Date().getTime();
                        }
                    }
                }, false)
            });
        }
        if (user.isSetPayPwd == '1') {//已经设置密码
            title = '请输入原来的支付密码,以验证身份';
            var inputs = $('.pwd-list input'),
                oldPayPwd = '';

            $.each(inputs, function (k, v) {
                $(v)[0].addEventListener("input", function () {
                    if ($(this).val().length == 1) {
                        oldPayPwd += $(this).val();
                        $(this).parent('li').next('li').find('input').focus();
                        if ($(this).parent('li').index() == 5) {
                            //oldPayPwd = $.md5(oldPayPwd);
                            exports.sessionStorage.setItem('oldPayPwd', oldPayPwd);
                            exports.location.href = './setNewPaypwd.html?v=' + new Date().getTime();
                        }
                    }
                }, false)
            });
        }
        $('#paypwdEdit-panel .title').text(title);
    } else {
        exports.sessionStorage.setItem('comePage', '../mine/mine.html?v=' + new Date().getTime());
        exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
    }
})(window);