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
        var setedHtml = '<p class="pay-pwd-edit" style="display: none"><span class="arrow"></span>支付密码修改</p>' +
                '<p class="getBack-pay-pwd" style="display: none"><span class="arrow"></span>找回支付密码</p><p class="change-phone-number"><span class="arrow"></span>更换手机号码</p>',
            notSetHtml = '<p class="pay-pwd-settings" style="display: none"><span class="arrow"></span>支付密码设置</p><p class="change-phone-number"><span class="arrow"></span>更换手机号码</p>';

        if (user.isSetPayPwd == '0') {//未设置支付密码
            $('#account-security-panel').html(notSetHtml);
        } else {//已经设置过密码
            $('#account-security-panel').html(setedHtml);
        }
    }else {
        exports.sessionStorage.setItem('comePage', '../mine/mine.html?v=' + new Date().getTime());
        exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
    }

    $('#account-security-panel').delegate('.pay-pwd-edit', 'click', function () {
        exports.location.href='./paypwdEdit.html?v=' + new Date().getTime();
    });
    $('#account-security-panel').delegate('.pay-pwd-settings', 'click', function () {
        exports.location.href='./paypwdEdit.html?v=' + new Date().getTime();
    });
    $('#account-security-panel').delegate('.change-phone-number', 'click', function () {
        exports.location.href='./chgPhone.html?v=' + new Date().getTime();
    });


})(window);