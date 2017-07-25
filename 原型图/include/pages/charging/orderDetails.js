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
            orderCode: chargingOrderCode,


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
                    $('.charging-panel-details-elect i').html(data.chargeQuantity);
                    $('.pay-total-mount').find('span').text(data.chargeElectricity);
                    exports.sessionStorage.setItem('chargedPayment', JSON.stringify(data));

                    $('.orderToSubmit').bind('click', function () {
                        exports.location.href = '../mine/evaluation.html?v=' + new Date().getTime();
                    });
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    getOrderDetails(chargingOrderCode);

    //高度
    var tempH = $(window).height() - 202;
    $('.pay-panel-show').height(tempH);
    $('.orderToPay-station-details dl dd.txt').width($(window).width() - 120);
})(window);