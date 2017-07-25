/**
 * Created by Administrator on 2016/10/11.
 */

'use strict';
if (!CTP) {
    var CTP = {};
}
(function (exports) {


    function imgError() {
        $.each($('img'), function (k, v) {
            $(v).error(function () {
                $(v).hide();
                if ($(v).parent('div').hasClass('stake-details-icon') || $(v).parent().parent().hasClass('myOrderDetails-station')) {
                    $(v).attr('src', '../../assets/images/c_default_station.png');
                } else if ($(v).prev().hasClass('item-rank')) {
                    $(v).attr('src', '../../assets/images/c_default_avatar.png');
                } else {
                    $(v).attr('src', '../../assets/images/picError.png');
                }
                $(v).show();
            })
        });
    }

    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));

    //var SERVER_URL = 'http://10.0.2.10:8082';
    // var SERVER_URL = 'http://msp.szcomtop.com:7888';//测试环境地址 内网可以访问
    var SERVER_URL = 'http://mspshow.szcomtop.com:80'; //测试环境地址 内网可以访问
    window.SERVER_URL = SERVER_URL;

    var sessionINTERVAL = setInterval(function () {
        var endTime = new Date(),
            startTime = new Date(exports.sessionStorage.getItem('startTimeSession') * 1);
        if (Math.floor(((endTime.getTime() - startTime.getTime()) / 1000)) >= 10000) {
            //CTP.Tips('session过期');
            setTimeout(function () {
                //CTP.weChatAccount
                // alert('CTP.weChatAccount---' + JSON.stringify(CTP.weChatAccount));
                CTP.checkSession(CTP.weChatAccount, {
                    success: function (e) { //如果用户存在
                        //successFn(e);
                        console.log('session过期，续session');
                    },
                    fail: function (e) { //如果用户不存在
                        //failFn('');
                        console.log('用户不存在！');
                        window.clearInterval(sessionINTERVAL);
                    }
                });
            }, 1000)
        }
    }, 5000);
    //校验用户是否登录
    function checkLogin() {
        var curSession = JSON.parse(exports.sessionStorage.getItem('session'));
        var bool = true;
        if (curSession === null) {
            bool = false;
        } else {
            if (curSession.sessionId == '') {
                bool = false;
            } else if (curSession.user.userId == '') {
                bool = false;
            } else if (curSession.user.weChatId == '') {
                bool = false;
            }
            if (curSession.user !== 'undefined') {
                bool = true;
            }
        }
        return bool;
    }

    function Ajax(args, timeout) {
        imgError();
        //ajax方法
        function getAjax(o) {
            var _args = o.params,
                argsStr = '',
                keyAry = [];

            for (var i in o) {
                keyAry.push(i);
            }
            keyAry = keyAry.sort();
            $.each(keyAry, function (k, v) {
                argsStr += (v + o[v]);
            });

            _args['sign'] = hex_sha1(argsStr);
            _args['timestamp'] = new Date().getTime();
            var outTime = 0;
            var outTimeFlag = setInterval(function () {
                if (outTime >= 12) {
                    clearInterval(outTimeFlag);
                    CTP.Tips('请求超时！');
                    setTimeout(function () {
                        exports.location.reload();
                    }, 1000)
                } else {
                    outTime++;
                }
            }, 1000);
            $.ajax({
                url: SERVER_URL + o.url + '?' + _args['timestamp'],
                type: o.type,
                timeout: timeout || 120000,
                dataType: o.format,
                data: _args,
                success: function (e) {
                    o.success(e);
                    imgError();
                },
                error: function (XHR, TextStatus) {
                    o.error(XHR, TextStatus);

                    imgError();
                },
                complete: function (XHR, TextStatus) {
                    if (TextStatus == 'timeout') {
                        o.complete(XHR, TextStatus);
                    }
                    clearInterval(outTimeFlag);
                }
            });
        }

        getAjax(args);

    };

    CTP.Ajax = Ajax;
    //查询是否绑定 返回 用户所有信息
    function checkSession(weChatAccount, fns) {
        var _paramsLoginAuth;

        if (window.sessionStorage.getItem('isPLT') == 'WECHAT') { //如果是微信
            _paramsLoginAuth = {
                weChatId: weChatAccount.id,
                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'user.auth',
                locale: 'zh_CN',
                appKey: '00014b81addb04bf',
                timestamp: new Date().getTime()
            };
        } else if (window.sessionStorage.getItem('isPLT') == 'EPO') { //如果是掌厅
            _paramsLoginAuth = {
                epoId: weChatAccount.id,

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'user.auth',
                locale: 'zh_CN',
                appKey: '00014b81addb04bf',
                timestamp: new Date().getTime(),
            };
        }
        $.ajax({
            url: SERVER_URL + '/msp-cas/router',
            type: 'POST',
            dataType: 'json',
            data: _paramsLoginAuth,
            success: function (e) {
                console.log('请求的用户---', e.user);
                if (typeof e.user !== 'undefined') {
                    //清除全局sessionStorage
                    //exports.sessionStorage.clear();
                    //设置新的session
                    exports.sessionStorage.setItem('session', JSON.stringify(e));
                    //设置session开始时间
                    if (exports.sessionStorage.getItem('startTimeSession') === null) {
                        exports.sessionStorage.setItem('startTimeSession', JSON.stringify(new Date().getTime()));
                    }

                    var getHomeInfor = function (success) {
                        var homeInforParams = {
                            userCode: e.user.userId,
                            nonce: 'abc',
                            v: '1.0',
                            format: 'json',
                            method: 'home.info',
                            locale: 'zh_CN',
                            sessionId: e.sessionId,
                            appKey: '00014b81addb04bf',
                            timestamp: new Date().getTime()
                        };
                        $.ajax({
                            url: SERVER_URL + '/msp-charge/router',
                            type: 'POST',
                            dataType: 'json',
                            data: homeInforParams,
                            success: function (m) {
                                success(m);
                            }
                        });
                    }
                    CTP.getHomeInfor = getHomeInfor;
                    fns.success(e);
                } else {
                    fns.fail(e);
                }


            },
            error: function (e) {
                fns.fail(e);
            }
        });
    }

    CTP.checkSession = checkSession;

    CTP.checkLogin = checkLogin;
    $(function () {
        document.body.ontouchmove = function (e) {
            e.preventDefault();
        };
        var divs = $('#ctp-panel').find('div');
        $.each(divs, function (k, v) {
            if ($(v).css('overflow-y') === 'auto') {
                $(v)[0].ontouchmove = function (e) {
                    e.stopPropagation();
                };
            }
        });
    });

})(window);