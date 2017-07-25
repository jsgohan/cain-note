/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var myOrderDetailsCode = exports.sessionStorage.getItem('myOrderDetailsCode'),
        session = JSON.parse(exports.sessionStorage.getItem('session')),
        isComment = myOrderDetails.isComment;
        //1-未开始 2-充电中 3-未结算 4-结束


    var paramsGetMyOrder = {
        orderCode: myOrderDetailsCode,

        nonce: 'abc',
        v: '1.0',
        format: 'json',
        method: 'order.info',
        locale: 'zh_CN',
        appKey: '00014b81addb04bf',
        sessionId: session.sessionId,
        timestamp: new Date().getTime(),
    };
    CTP.Ajax({
        params: paramsGetMyOrder,
        url: '/msp-charge/router',
        type: 'POST',
        success: function (e) {
            if (e.state == 0) {
                var myOrderDetails = e.data;
                var chargeQuantity = myOrderDetails.chargeQuantity === null ? 0 : myOrderDetails.chargeQuantity,
                    chargeElectricity = myOrderDetails.chargeElectricity === null ? 0: myOrderDetails.chargeElectricity;
                var orderState = myOrderDetails.orderState * 1 - 1,
                    orderStateText = ['支付', '支付', '支付', '已完成', '挂起'];
                $('dl.myOrderDetails-station').attr('id', myOrderDetails.siteCode);
                $('.payMount span').html('<em>￥</em>' +chargeElectricity);
                if (orderState == 3) {
                    $('.payState').text(orderStateText[orderState]).addClass('done');
                } else if (orderState == 4) {
                    $('.payState').text(orderStateText[orderState]).addClass('hangup');//挂起
                } else{
                    $('.payState').text(orderStateText[orderState]).addClass('notDone');
                }
                $('.myOrderDetails-station .img img').attr('src', myOrderDetails.img);
                $('.myOrderDetails-station dt').text(myOrderDetails.siteName);
                $('.myOrderDetails-station .charging span').text(myOrderDetails.chargePileName);
                $('.myOrderDetails-station .cid span').text(myOrderDetails.chargePileCode);
                $('.mark-charging-amout span').text(chargeElectricity + 'kWh');
                $('.mark-charging-time span').text((myOrderDetails.chargeTime*1/60).toFixed(0)+ '分钟');
                $('.order-code span').text(myOrderDetails.orderCode);
                $('.order-start-time span').text(myOrderDetails.orderStartTime);
                $('.order-end-time span').text(myOrderDetails.orderEndTime == null ? '': myOrderDetails.orderEndTime);

            }

        },
        error: function (e) {
            console.log(e);
        }
    });



    $('#myOrderDetails').delegate('dl.myOrderDetails-station', 'click', function () {
        var sitCode = $(this).attr('id');
        var _sess = JSON.parse(exports.sessionStorage.getItem('session'));
        var paramsDetails = {
            userCode: _sess.user.userId,
            siteCode: sitCode,
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'station.info',
            locale: 'zh_CN',
            appKey: _sess.appKey,
            sessionId: _sess.sessionId,
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: paramsDetails,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                exports.sessionStorage.setItem('stakeDetails', JSON.stringify(e.data));
                exports.location.href = '../find/stakeDetails.html?v=' + new Date().getTime();
            }
        });
    });

    $('.myOrderDetails-top').delegate('.notDone', 'click', function () {
        exports.location.href="../charging/orderToPay.html";
    });

})(window);