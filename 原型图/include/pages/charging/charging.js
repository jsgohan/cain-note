/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    function formatSeconds(value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = "" + parseInt(theTime) + "";
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + ":" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + ":" + result;
        }
        return result;
    }

    var getInforFn;

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        chargingOrderCode = exports.sessionStorage.getItem('chargingOrderCode');


    //结束
    $('#webapp').delegate('.charging-end-button', 'click', function () {
        CTP.dialog('结束充电', '您确认结束充电吗？', function () {
            $('#ctp-dialog').hide();
        }, function () {
            startC();
        }, [{text: '取消'}, {text: '确定'}], false);


        function startC () {
            CTP.Tips('结束充电中...', false);
            var params = {
                userCode: session.user.userId,
                orderCode: chargingOrderCode,
                staticRequest: '0',

                nonce: 'abc',
                v: '1.1',
                format: 'json',
                method: 'charge.finish',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: params,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    var stateAry = {
                        "2300": "充电桩状态为离线，请稍后再试！",
                        "3301": "设备异常，请稍后再试或点击充电桩屏幕结束充电！",
                        "2302": "获取订单状态为已结束的状态码",
                        "2303": "获取订单状态为未支付的状态码",
                        "2304": "设备异常，请稍后再试或点击充电桩屏幕结束充电！",
                        "2305": "设备异常，请稍后再试或点击充电桩屏幕结束充电！",
                        "2306": "结束充电，请稍后支付。",
                        "2307": "订单已挂起"
                    };
                    var data = e.data;
                    if (e.state != 0 && e.state != 2052) {//支付不成功，跳至支付页面
                        if (e.state == 2201) {//订单已结束
                            CTP.Tips(e.message);

                        } else if (e.state == 2051) {
                            CTP.Tips(e.message);

                            setTimeout(function () {
                                exports.location.href = '../charging/orderToPay.html?v=' + new Date().getTime();
                            }, 1000)
                        } else {
                            CTP.Tips(e.message);
                        }
                    }
                    if (e.state == 2350) { //跳到支付页面
                        CTP.Tips(e.message);
                        setTimeout(function () {
                            exports.location.href = '../charging/orderToPay.html?v=' + new Date().getTime();
                        }, 1000)
                    }
                    if (e.state == 2302) { //跳到订单详情页面
                        CTP.Tips(e.message);
                        setTimeout(function () {
                            exports.location.href = '../charging/orderDetails.html?v=' + new Date().getTime();
                        }, 1000)
                    }
                    if (e.state == 2303) { //跳到支付页面
                        CTP.Tips(e.message);
                        setTimeout(function () {
                            exports.location.href = '../charging/orderToPay.html?v=' + new Date().getTime();
                        }, 1000)
                    }
                    if (e.state == 0 || e.state == 2052) { //支付成功跳至订单详情
                        CTP.Tips(e.message);
                        setTimeout(function () {
                            exports.location.href = '../charging/orderDetails.html?v=' + new Date().getTime();
                        }, 1000)
                    }
                    if (e.state == '2307') {//订单异常已挂起
                        exports.sessionStorage.setItem('myOrderDetailsCode', chargingOrderCode);
                        setTimeout(function () {
                            exports.location.href = '../order/myOrderDetails.html?v=' + new Date().getTime();
                        }, 1000)
                    }

                }
            });
        }
    });

    function getInfo() {
        $('p.charging-panel-details-refresh').find('span').toggleClass('refreshing');
        $('p.charging-panel-details-refresh span i').html('加载中...');
        var params = {
            userCode: session.user.userId,
            orderCode: chargingOrderCode,
            staticRequest: '0',

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'charge.info',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: params,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                var stateAry = {
                    "2200": "充电桩状态为离线，请稍后再试！",
                    "3200": "设备异常，请稍后再试！",
                    "2201": "获取订单状态为已结束的状态码",
                    "2202": "获取订单状态为未支付的状态码",
                    "2203": "设备异常，请稍后再试或换其他充电桩！",
                    "2204": "设备异常，请稍后再试！",
                    "2205": "设备异常，请稍后再试！",
                    "2206": "订单已挂起"
                };

                var data = e.data;
                if (e.state == '0') {
                    setTimeout(function () {
                        $('.left-time span').html(formatSeconds(data.chargeRestTime * 1));
                        $('.charging-panel-details-time i').html(data.chargeTime);
                        $('.charging-panel-details-percent i').html('百分比:' + data.chargeRate);
                        $('.charging-panel-details-elect i').html(data.chargeQuantity);
                        $('.charging-panel-details-amount i').html('费用:' + data.chargeElectricity + '元');
                        $('p.charging-panel-details-refresh span i').html('刷新');
                    }, 1000);
                } else {
                    if (e.state == '2201') {//订单已结束支付不成功
                        CTP.Tips(e.message);
                        setTimeout(function () {
                            exports.location.href = '../charging/orderDetails.html?v=' + new Date().getTime();
                        }, 1000)
                    } else if (e.state == '2202') {
                        setTimeout(function () {
                            exports.location.href = '../charging/orderToPay.html?v=' + new Date().getTime();
                        }, 1000)
                    } else if (e.state == '2307') {//订单异常已挂起
                        exports.sessionStorage.setItem('myOrderDetailsCode', chargingOrderCode);
                        setTimeout(function () {
                            exports.location.href = '../order/myOrderDetails.html?v=' + new Date().getTime();
                        }, 1000)
                    } else {
                        CTP.Tips(e.message);
                    }
                }
            }
        });
    }


    $(' p.charging-panel-details-refresh').bind('click', function () {
        getInfo();
    });

    getInforFn = setInterval(function () {
        getInfo();
    }, 30000);
    //
    $('#ctp-panel').height($(window).height());
    if ($(window).height() < 520) {
        $('#charging-panel-charging, .help-div').height(520);
    } else {
        $('#charging-panel-charging, .help-div').height($(window).height());
        $('.charging-panel-details').height($(window).height() - 400);
    }

})(window);