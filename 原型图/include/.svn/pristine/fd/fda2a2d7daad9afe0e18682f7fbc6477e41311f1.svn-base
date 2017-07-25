/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    function imgError() {
        $.each($('img'), function (k, v) {
            $(v).error(function () {
                $(v).hide();
                if ($(v).parent('div').hasClass('stake-details-icon') || $(v).parent().hasClass('stake-details-icon')) {
                    $(v).attr('src', '../../assets/images/c_default_station.png');
                } else {
                    $(v).attr('src', '../../assets/images/picError.png');
                }                $(v).show();
            })
        });
    }

    var tempAppointmentDetails = JSON.parse(exports.sessionStorage.getItem('tempAppointmentDetails'));
    var stateIndex = tempAppointmentDetails.state*1-1,
        methodAry = ['直流电', '交流电', '直流/交流电'],
        state = ['预约中', '已取消', '已超期', '已结束'],
        carTypeHtml = '<img  style="width: 20px;height: 20px;margin: 15px 5px;float: left;display: block;" src="' + tempAppointmentDetails.vehicleBrandImg +'"/>' +
            tempAppointmentDetails.vehicleBrand + '(' + tempAppointmentDetails.vehicleModel+')';

    $('.details-anchor').attr('id', tempAppointmentDetails.siteCode);
    $('.stake-details-icon img').attr('src', tempAppointmentDetails.siteImg);
    $('.stake-details-top-bottom').text(tempAppointmentDetails.siteAddress);
    $('.site-name').text(tempAppointmentDetails.siteName);
    $('.myOrderDetails-status').text(state[stateIndex]);

    $('.mark-charging-method span').text(methodAry[tempAppointmentDetails.chargeType*1-1]);
    $('.mark-car-type span').html(carTypeHtml);
    $('.order-code span').text(tempAppointmentDetails.reservationCode);
    $('.order-start-time span').text(tempAppointmentDetails.reservationTime);
    $('.stake-details-top-bottom').width($(window).width());
    if (state[stateIndex] === '预约中') {
        $('.orderDetails-menu-btn-cancel').show();
    }
    //充电站详情
    $('.details-anchor').bind('click', function () {
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
                exports.sessionStorage.setItem('stakeDetails', JSON.stringify(e.data))
                exports.sessionStorage.setItem('currentAppointStakeDetailsDistance', CTP.getUrlParam('distance'));
                var _distance =  exports.sessionStorage.getItem('currentAppointStakeDetailsDistance') || CTP.getUrlParam('distance');
                exports.location.href = '../find/stakeDetails.html?v=' + new Date().getTime()+ '&distance=' + _distance;
            }
        });
    });

    //取消预约
    $('.orderDetails-menu-btn-cancel').bind('click', function () {
        var _sess = JSON.parse(exports.sessionStorage.getItem('session'));
        var reservationCode = JSON.parse(exports.sessionStorage.getItem('tempAppointmentDetails'));

        var paramsCancel = {
            userCode: _sess.user.userId,
            reservationCode: reservationCode.reservationCode,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'subscription.cancel',
            locale: 'zh_CN',
            appKey: _sess.appKey,
            sessionId: _sess.sessionId,
            timestamp: new Date().getTime(),
            staticRequest: '0'
        };
        CTP.Ajax({
            params: paramsCancel,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state == '0') {
                    CTP.Tips('取消成功');
                    setTimeout(function () {
                        exports.location.href='../mine/appointment.html?v=' + new Date().getTime();
                    }, 1000)
                }
            }
        });
    });
    imgError();

})(window);