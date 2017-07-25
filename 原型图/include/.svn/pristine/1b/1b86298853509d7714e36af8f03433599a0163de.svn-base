/**
 * Created by zhanghang on 2016/10/9.
 */

if (!CTP) {
    var CTP = {};
}

(function(exports) {

    if (CTP.checkLogin()) {
        var session = JSON.parse(exports.sessionStorage.getItem('session'));

        function countdownFn(val, sec) {
            var countdown = sec;

            function settime(val) {
                if (countdown == 0) {
                    $(val).next('a').text('发送验证码').removeClass('disable');
                    countdown = sec;

                } else {
                    $(val).next('a').text("重新发送(" + countdown + ")").addClass('disable');
                    countdown--;
                    setTimeout(function() {
                        settime(val);
                    }, 1000)
                }

            }

            settime(val);
        }

        function getJyCode(me) {
            var _params = {
                mobile: $('.tel input').val(),
                validCode: '',
                method: 'user.sendvalidcode',
                reason: 'bind_wechat',

                appKey: session.appKey,
                locale: 'zh_CN',
                format: 'json',
                v: '1.0',
                nonce: 'abc'
            };
            CTP.Ajax({
                params: _params,
                url: '/msp-cas/router',
                type: 'POST',
                success: function(e) {
                    if (e.successful) {
                        countdownFn(me, 10);
                        $('.btn').bind('click', function() {
                            var carTypeParams = {
                                userId: session.user.userId,
                                phone: $('.tel input').val(),

                                nonce: 'abc',
                                format: 'json',
                                v: '1.0',
                                method: 'user.save',
                                locale: 'zh_CN',
                                appKey: session.appKey,
                                sessionId: session.sessionId,
                                timestamp: new Date().getTime()
                            };
                            CTP.Ajax({
                                params: carTypeParams,
                                url: '/msp-cas/router',
                                type: 'POST',
                                success: function(_r) {
                                    if (_r.message.indexOf("错") > -1 || _r.message.indexOf("不可用") ) {
                                        CTP.Tips(_r.subErrors[0].message);
                                    } else {
                                        CTP.Tips('绑定成功!');
                                    }
                                    setTimeout(function() {
                                        // exports.location.href = './mine.html?v=' + new Date().getTime()'
                                    }, 1000);
                                }
                            });
                        });
                    }
                    if (e.code == '9') {
                        CTP.Tips(e.subErrors[0].message);
                    }

                },
                error: function(e) {
                    alert('status' + e.status);
                    alert('readyState' + e.readyState);
                    alert('textStatus' + e.statusText);
                }
            });
        }
        $('.sendCode a').bind('click', function() {
            var self = $(this),
                input = self.parent().find('input').get(0);
            if (!self.hasClass('disable')) {
                getJyCode(input);
            } else {
                CTP.Tips('不要频繁获取!');
            }
        });


    } else {

    }

})(window);