/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        chargingOrderCode = exports.sessionStorage.getItem('chargingOrderCode');

    function getOrderDetails(chargingOrderCode) {
        var paramsGetMyOrder = {
            orderCode: chargingOrderCode || JSON.parse(exports.sessionStorage.getItem('chargedPayment')).orderCode,


            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'order.info',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: paramsGetMyOrder,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state == 0) {
                    var data = e.data;
                    //资料设置
                    $('.pic img').attr('src', data.img);
                    $('.orderToPay-station-details dl dt').text(data.siteName);
                    $('.station-name span').text(data.siteAddress);
                    $('.cid span').text(data.siteCode);
                    $('.charging-panel-details-time i').html(Math.floor(data.chargeTime*1/60));
                    $('.charging-panel-details-del-c i').html(data.carbonReduction);
                    $('.charging-panel-details-elect i').html(data.chargeElectricity);
                    $('.orderToPay-btn span').text('¥' + data.chargeQuantity + '元');
                    exports.sessionStorage.setItem('chargedPayment', JSON.stringify(data));

                    $('.orderToSubmit').bind('click', function () {
                        exports.location.href = '../mine/evaluation.html?v=' + new Date().getTime();
                    });



                    $('#orderToPay-panel').delegate('.orderToPay-method div', 'click', function () {
                        $('.orderToPay-method span').removeClass('selectedItem');
                        $(this).find('span').addClass('selectedItem');
                    });
                    $('.orderToPay-btn').bind('click', function () {
                        var selectedItem = $('.selectedItem').parent('div');
                        var params;
                        var userCode = session.user.userId,
                            orderCode = data.orderCode;
                        if (!selectedItem.length) {
                            CTP.Tips('请选择支付方式');
                            return;
                        }
                        // function pwdDialog() {
                        //     var html = '<div class="ctp-pay-pwd-mask ctp-mask"/> <div class="ctp-pay-pwd">' +
                        //         '<p class="ctp-pay-pwd-title"><span>关闭</span>支付密码</p>' +
                        //         '<div class="ctp-pay-pwd-content"><ul class="pwd-list">' +
                        //         '<li>' +
                        //         '<input type="password" maxlength="1"  autofocus="autofocus"/>' +
                        //         '</li>' +
                        //         '<li>' +
                        //         '<input type="password" maxlength="1" />' +
                        //         '</li>' +
                        //         '<li>' +
                        //         '<input type="password" maxlength="1" />' +
                        //         '</li>' +
                        //         '<li>' +
                        //         '<input type="password" maxlength="1" />' +
                        //         '</li>' +
                        //         '<li>' +
                        //         '<input type="password" maxlength="1" />' +
                        //         '</li>' +
                        //         '<li>' +
                        //         '<input type="password" maxlength="1"/>' +
                        //         '</li>' +
                        //         '</ul></div>' +
                        //         '<p class="ctp-pay-pwd-remark"><span>' + $('.orderToPay-btn span').text() + '</span><span class="left-money">余额(<i>203.6</i>元)</span></p>' +
                        //         '</div>';
                        //     if ($('.ctp-pay-pwd').length) {
                        //         $('.ctp-pay-pwd').show();
                        //         $('.ctp-pay-pwd-mask').show();
                        //     } else {
                        //         $('body').append(html);
                        //         $('.ctp-pay-pwd-mask').show();
                        //     }
                        // }
                        //
                        // pwdDialog();


                        var inputs = $('.pwd-list input'),
                            payPwd = '', user = session.user;
                        function subPay () {
                            var userCode = user.userId,
                                payPassword = payPwd;

                            // var reqSign = $.md5('ordered=' + orderCode + '&payPassword=' + $.md5(payPassword) + '&userId=' + userCode);
                            var reqSign = $.md5('ordered=' + orderCode + '&payPassword=&userId=' + userCode);
                            var _paramsSetPaypwd = {
                                userCode: userCode,
                                orderCode: orderCode,
                                // payPassword: $.md5(payPassword),//支付密码
                                reqSign: reqSign,//签名
                                payPassword: '',//支付密码

                                nonce: 'abc',
                                v: '1.0',
                                format: 'json',
                                method: 'pay.balance',
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
                                        CTP.Tips('支付成功');

                                        setTimeout(function () {
                                            exports.location.href = '../mine/evaluation.html?v=' + new Date().getTime();
                                        }, 1000)
                                    } else {
                                        CTP.Tips(e.message);
                                        $('.pwd-list input').val('');
                                        $('.pwd-list input')[0].focus();
                                    }

                                },
                                error: function (e) {
                                    console.log(e);
                                }
                            });
                        }
                        subPay();
                        if (false) {
                            //余额支付

                            if (selectedItem.hasClass('ye')) {
                                params = {
                                    userCode: userCode,
                                    orderCode: orderCode,
                                    payPassword: payPassword,
                                    reqSign: reqSign,

                                    nonce: 'abc',
                                    v: '1.0',
                                    format: 'json',
                                    method: 'pay.balance',
                                    locale: 'zh_CN',
                                    appKey: session.appKey,
                                    sessionId: session.sessionId,
                                    timestamp: new Date().getTime()
                                };
                            }
                            //第三方微信支付

                            if (selectedItem.hasClass('wx')) {
                                params = {
                                    userCode: session.user.userId,
                                    orderCode: chargingOrderCode,
                                    payType: '1',//1微信支付 2支付宝支付

                                    nonce: 'abc',
                                    v: '1.0',
                                    format: 'json',
                                    method: 'pay.confirm',
                                    locale: 'zh_CN',
                                    appKey: session.appKey,
                                    sessionId: session.sessionId,
                                    timestamp: new Date().getTime()
                                };
                            }


                            wx.chooseWXPay({
                                timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr: '', // 支付签名随机串，不长于 32 位
                                package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign: '', // 支付签名
                                success: function (res) {
                                    // 支付成功后的回调函数
                                }
                            });
                        }
                    });

                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    getOrderDetails(chargingOrderCode);
    $('.orderToPay-station-details dl dd.txt').width($(window).width() - 110);

})(window);