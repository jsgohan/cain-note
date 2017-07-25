/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    function successFn(e) {
        var user = e.user;
        //exports.sessionStorage.setItem('session', JSON.stringify(e));
        var gender = user.gender == '2' ? '男' : '女';
        $('.mineInfo-panel-top-icon').attr('src', user.avatarId).css({"width": "50px", "height": "50px;"});
        if ($('.mineInfo-panel-top-icon').attr('src') === '') {
            $('.mineInfo-panel-top-icon').attr('src', '../../assets/images/c_default_avatar.png').css({
                "width": "50px",
                "height": "50px;"
            });
        }
        $('.mineInfo-panel-top-name').text(user.nick);
        $('.mineInfo-panel-top-description').text(user.introduction);

        $('.mineInfo-panel-bottom-account input').val(user.account);
        $('.mineInfo-panel-bottom-tel input').val(user.phone);
        $('.mineInfo-panel-bottom-nick input').val(user.nick);
        $('.mineInfo-panel-bottom-sex input').val(gender);
        $('.mineInfo-panel-bottom-description input').val(user.introduction);
    }

    function failFn(e) {
        exports.sessionStorage.setItem('comePage', '../mine/mine.html?v=' + new Date().getTime());
        exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
    }

    CTP.checkSession(CTP.weChatAccount, {
        success: function (e) { //如果用户存在
            successFn(e);
        },
        fail: function (e) {//如果用户不存在
            failFn(e);
        }
    });


    //编辑
    $('.mineInfo-panel-bottom').delegate('p', 'click', function () {
        var self = $(this),
            updateParams,
            paramsValue = self.find('input').val();
        if (self.hasClass('mineInfo-panel-bottom-account')) { //用户名
            console.log('用户名');
            return;
        }
        if (self.hasClass('mineInfo-panel-bottom-tel')) {//手机号码
            console.log('手机号码');
            return;
        }
        if (self.hasClass('mineInfo-panel-bottom-nick')) {//昵称
            updateParams = 'nick';
        }
        if (self.hasClass('mineInfo-panel-bottom-sex')) {//性别
            updateParams = 'gender';
        }
        if (self.hasClass('mineInfo-panel-bottom-description')) {//简介
            updateParams = 'introduction';
        }
        exports.location.href = './mineInfoEdit.html?v=' + new Date().getTime() + '&updateParams=' + updateParams + '&' + updateParams + '=' + encodeURI(encodeURI(paramsValue));

    });


})(window);