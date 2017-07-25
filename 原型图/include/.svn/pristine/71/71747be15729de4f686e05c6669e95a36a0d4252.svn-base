/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var _params;

    function successFn(session) {
        _params = {
            method: 'pile.info',
            staticRequest: '0',
            sessionId: session.sessionId,
            appKey: session.appKey,
            locale: 'zh_CN',
            timestamp: new Date().getTime(),
            format: 'json',
            v: '1.0',
            nonce: 'abc'
        };
    }

    function failFn(session) {
        _params = {
            method: 'pile.info',
            staticRequest: '0',
            sessionId: '',
            appKey: 'asdfadf',
            locale: 'zh_CN',
            timestamp: new Date().getTime(),
            format: 'json',
            v: '1.0',
            nonce: 'abc'
        };
    }

    CTP.checkSession(CTP.weChatAccount, {
        success: function (e) { //如果用户存在
            CTP.getHomeInfor(function (m) {
                    var data = m.data;
                    if (data.orderCode !== '' && data.orderState == '2') {
                        exports.sessionStorage.setItem('chargingOrderCode', data.orderCode);
                        setTimeout(function () {
                            exports.location.href = '../charging/charging.html';
                        }, 1000)
                    } else {
                        $('#webapp').fadeIn();
                    }
                }
            );
            successFn(e);
        },
        fail: function (e) {//如果用户不存在
            failFn(e);
        }
    });


    $('.submit-btn').bind('click', function () {
        var code = $('#charging-code-code-input').val();
        _params['chargingPileCode'] = code;
        $('.submit-btn').addClass('waiting').find('span').text('等待验证...');
        setTimeout(function () {
            CTP.Ajax({
                params: _params,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    if (e.state == '0') {
                        $('.submit-btn').find('span').text('验证成功');
                        exports.sessionStorage.setItem('pileDetails', JSON.stringify(e.data));
                        exports.location.href = '../charging/startCharging.html?v=' + new Date().getTime();
                    } else { //编码为 e.state == '2011'
                        $('.submit-btn').removeClass('waiting').find('span').text('确定输入');
                        $('.inputScanCode-panel-top').css({visibility: "visible"});
                    }

                },
                error: function (XHR, TextStatus) {
                    if (TextStatus == 'timeout') {
                        CTP.Tips('请求超时');
                    }
                },
                complete: function (XHR, TextStatus) {
                    if (TextStatus == 'timeout') {
                        CTP.Tips('请求超时');
                    }

                    $('.submit-btn').removeClass('waiting').find('span').text('确定输入');
                }
            });
        }, 300)
    });
    //掌厅
    $('.scan-control').bind('click', function () {
        if (typeof window.openBarcodeScanPage !== 'undefined' && typeof window.openBarcodeScanPage == 'function') {
            window.openBarcodeScanPage(function (e) {
                if (e.type == 1) {
                    $('.charging-code input').val(e.result);
                    if (e.result.length <= 18) {
                        var tempResult = '120000000000003401'
                        $('.charging-code input').val(e.result);
                    }
                }
            });
        } else {
            //扫描二维码
            wx.ready(function () {
                wx.scanQRCode({
                    needResult: 1,
                    desc: 'scanQRCode desc',
                    success: function (e) {
                        $('.charging-code input').val(e.resultStr);
                        if (res.result.length <= 18) {
                            var tempResult = '120000000000003401';
                            $('.charging-code input').val(e.resultStr);
                        }
                    }
                });
            });
        }

    });


})(window);