/**
 * Created by zhanghang on 2016/10/9.
 */

if (!CTP) {
    var CTP = {};
}

(function (exports) {

    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));

    //倒计时
    function countdownFn(val, sec) {
        var countdown = sec;

        function settime(val) {
            if (countdown == 0) {
                $(val).next('a').text('发送验证码').removeClass('disable');
                countdown = sec;

            } else {
                $(val).next('a').text("重新发送(" + countdown + ")").addClass('disable');
                countdown--;
                setTimeout(function () {
                    settime(val);
                }, 1000)
            }

        }

        settime(val);
    }


    //获得校验码
    function getJyCode(me) {
        var _params = {
            mobile: $('.tel input').val(),
            validCode: '',
            method: 'user.sendvalidcode',
            reason: 'bind_wechat',

            appKey: '00014b81addb04bf',
            locale: 'zh_CN',
            format: 'json',
            v: '1.0',
            nonce: 'abc',
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (e) {
                if (e.successful) {
                    if (!e.userexists) {
                        //exports.location.href='./improveInfo.html'
                        CTP.dialog('验证码发送成功', '手机号未注册,是否要注册?', function () {
                            $('#ctp-dialog').toggle();
                            $('#ctp-dialog-mask').toggle();

                        }, function () {


                            $('#ctp-dialog').toggle();
                            $('#ctp-dialog-mask').toggle();

                            $('.btn').addClass('no-tel');
                            $('p.pwd, p.confirmation-pwd').show();
                        });
                    } else {
                        countdownFn(me, 60);
                    }
                }
                if (e.code == '9') {
                    alert(e.subErrors[0].message);
                }

            },
            error: function (e) {
                alert('status' + e.status);
                alert('readyState' + e.readyState);
                alert('textStatus' + e.statusText);
            }
        });
    }

    //提交
    function registerLogin() {//注册完善资料
        //校验验证码
        var _params = {
            mobile: $('.tel input').val(),
            validCode: $('.sendCode input').val(),
            method: 'user.checkvalidcode',

            appKey: '00014b81addb04bf',
            locale: 'zh_CN',
            format: 'json',
            v: '1.0',
            nonce: 'abc',

        };
        CTP.Ajax({
            params: _params,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (result) {
                console.log(result);
                if(result.code == '9') {
                    CTP.Tips(result.subErrors[0].message);
                    return;
                }
                //提交代码
                var pwd = $('p.pwd input').val(),
                    confirmPwd = $('p.confirmation-pwd input').val();
                if (pwd === '' || confirmPwd === '') {
                    CTP.Tips('密码不能为空!')
                } else if (pwd !== confirmPwd) {
                    CTP.Tips('密码不一致!')
                } else {
                    var _params = {
                        phone: $('.tel input').val(),
                        password: $.md5(confirmPwd),
                        method: 'user.regandlogin',
                        weChatId: CTP.weChatAccount.id,

                        appKey: '00014b81addb04bf',
                        locale: 'zh_CN',
                        format: 'json',
                        v: '1.0',
                        nonce: 'abc'
                    };
                    CTP.Ajax({
                        params: _params,
                        url: '/msp-cas/router',
                        type: 'POST',
                        success: function (e) {
                            console.log(e);
                            exports.sessionStorage.setItem('session', JSON.stringify(e));
                            var _goToPage = exports.sessionStorage.getItem('comePage'),
                                endPage = './improveInfo.html';
                            exports.location.href = endPage;
                            if (_goToPage !== null) {
                                window.history.go(-1);
                            } else {
                                exports.location.href = './improveInfo.html';
                            }
                        },
                        error: function (e) {

                        }
                    });
                }

            },
            error: function (e) {
                alert('status' + e.status);
                alert('readyState' + e.readyState);
                alert('textStatus' + e.statusText);
            }
        });


    }

    function validCodelogin() {//校验并登陆
        var _params = {
            phone: $('.tel input').val(),
            validCode: $('.sendCode input').val(),
            method: 'user.validCodelogin',
            weChatId: CTP.weChatAccount.id,

            appKey: '00014b81addb04bf',
            locale: 'zh_CN',
            format: 'json',
            v: '1.0',
            nonce: 'abc'
        };
        console.log(_params);
        CTP.Ajax({
            params: _params,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (e) {
                exports.sessionStorage.setItem('session', JSON.stringify(e));
                var _goToPage = exports.sessionStorage.getItem('comePage'),
                    endPage;
                if (typeof e.subErrors !== 'undefined') {
                    CTP.Tips(e.subErrors[0].message)
                } else {
                    if (_goToPage === null) {
                        endPage = '../find/findStake.html';
                    } else {
                        endPage = _goToPage;
                    }
                    exports.location.href = endPage;
                }

            },
            error: function (e) {

            }
        });
    }


    $('.sendCode a').bind('click', function () {
        var self = $(this),
            input = self.parent().find('input').get(0);
        if (!self.hasClass('disable')) {
            getJyCode(input);
        } else {
            CTP.Tips('不要频繁获取!');
        }
    });

    $('p.btn').bind('click', function () {
        var self = $(this);
        if (self.hasClass('no-tel')) {
            registerLogin();
        } else {
            validCodelogin();
        }

    });

    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));


    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    //
    //if (CTP.checkLogin()) {
    //    var user = session.user;
    //    $('.mine-panel-top .name-info .name').text(user.account);
    //    $('.mine-panel-top .name-info .tel').text(user.phone);
    //    $('.mine-panel-top .name-info .tel').text(user.phone);
    //    $('.account-info-top .total b').text(user.balance);
    //    $('.mine-panel-top .user-icon img').attr('src', user.avatarId);
    //    exports.location.href = '../find/findStake.html';
    //} else {
    //
    //}

})(window);