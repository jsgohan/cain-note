/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        stakeDetails = JSON.parse(exports.sessionStorage.getItem('stakeDetails'));

    var selectedCar = JSON.parse(exports.sessionStorage.getItem('myCarType'));
    if ( selectedCar !== null) {
        var html = ' <li class="car-type-item" id="' + selectedCar.modelCode +'">'+
            '<a href="javascript:void(0);"><img style="width: 35px; height: 35px;" src="'+selectedCar.img+'"/><span>'+ selectedCar.name+
        '</span></a>'+
        '</li>';
        $(html).insertBefore($('.change-car-type'));
    }

    $('.order-top-stake-name').text(stakeDetails.siteName);
    $('.order-top-icon img').attr('src', stakeDetails.img);
    $('.order-top-white-bg').html('<p style="width: 130px;margin-left: 90px;color: #999;line-height: 17px;">'+stakeDetails.workingTime+'</p>');
    //页面跳转
    $('.stake-map-search-right').bind('click', function () {//搜索列表
        exports.location.href = '../find/stakeList.html?v=' + new Date().getTime();
    });
    $('.filter-car-list li.change-car-type').bind('click', function () {//车型选择页面
        var carTypeParams = {
            nonce: 'abc',
            format: 'json',
            v: '1.0',
            method: 'car.all',
            locale: 'zh_CN',
            appKey: '00014b81addb04bf',
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: carTypeParams,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                console.log(e);
                var carData = e.data;
                exports.sessionStorage.setItem('allCarList', JSON.stringify(carData));
                exports.sessionStorage.setItem('comePage','../order/order.html?v=' + new Date().getTime());
                exports.location.href = '../find/carType.html?v=' + new Date().getTime();
            }
        });
    });


    $('.filter-elect-list li, .filter-car-list li').bind('click', function () {
        var selfCls = $(this).attr('class');
        if (selfCls !== 'change-car-type') {
            $(this).toggleClass('selected');
        } else {
            return;
        }
    });

    $('.order-btn').bind('click', function () {

        var zld = $('.zld').hasClass('selected'),
            jld = $('.jld').hasClass('selected'),
            chargeType,
            carTypeId = $('.filter-car-list li:first').attr('id');

        if (zld) {
            if (!jld) {
                chargeType = 1;
            }
        } else {
            if (!zld) {
                chargeType = 2;
            }
        }
        if (zld && jld) {
            chargeType = 3;
        }
        var paramsOrder = {
            userCode: session.user.userId,
            siteCode: stakeDetails.siteCode,
            chargeType: chargeType,
            carType: carTypeId,


            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'subscription.submit',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: paramsOrder,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {

                if (e.state === 0) {
                    //var startTime =  new Date().getTime(),
                    //    endTime = new Date(startTime + e.data.reservationRestTime*60*60);

                    //exports.sessionStorage.setItem('endTime', JSON.stringify(endTime));
                    //exports.sessionStorage.setItem('orderedStationDetails', JSON.stringify(e.data));
                    exports.sessionStorage.setItem('currentAppointStakeDetailsDistance', CTP.getUrlParam('distance'));
                    exports.location.href = '../mine/appointment.html?v=' + new Date().getTime() + '&distance=' + CTP.getUrlParam('distance');
                }
                if (e.state === 1) {
                    CTP.Tips(e.message);
                }

            }
        });
    });





})(window);