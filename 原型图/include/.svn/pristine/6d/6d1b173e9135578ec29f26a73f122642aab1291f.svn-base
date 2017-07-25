/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        stakeDetails = JSON.parse(exports.sessionStorage.getItem('stakeDetails'));
        //endTime = exports.sessionStorage.getItem('endTime')*1,
        //orderedStationDetails = JSON.parse(exports.sessionStorage.getItem('orderedStationDetails'));

    var stateArr = ['预约中', '已取消', '已超期', '已结束'];
    var pageNo = 1, pageSize = 10;
    //倒计时
    function countdownFn(val, sec) {
        var countdown = sec;

        function settime(val) {
            if (countdown == 0) {
                countdown = sec;

                exports.location.href = '../order/orderList.html?v=' + new Date().getTime();
            } else {
                var tempHours = Math.floor(countdown/60/60),
                    tempMinutes = Math.floor(countdown/60)-Math.floor(countdown/3600)*60,
                    temSeconds = Math.floor(countdown)-Math.floor(countdown/60)*60;

                if(temSeconds < 10){
                    temSeconds = "0" + temSeconds;
                }
                if(tempMinutes < 10){
                    tempMinutes = "0" + tempMinutes;
                }
                $(val).text(tempMinutes + ':' + temSeconds);

                countdown--;
                setTimeout(function () {
                    settime(val);
                }, 1000)
            }

        }

        settime(val);
    }

    //console.log(' orderedStationDetails.reservationRestTime--',  orderedStationDetails.reservationRestTime);
    //$('.order-station-icon').attr('src', orderedStationDetails.sitImg);
    //$('.time').text(orderedStationDetails.reservationRestTime);
    //countdownFn($('.time'), orderedStationDetails.reservationRestTime*60);

    function getOrderList (type) {
        var paramsOrderList = {
            userCode: session.user.userId,
            pageNo: pageNo,
            pageSize: pageSize,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'subscription.list',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: paramsOrderList,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
               console.log(e);
                //order-list-main
                var orderListData = e.data;

                var orderListHtml = "";
                $(orderListData).each(function(i,o){
                    if(i == 0 && o.state == 1){
                        $('.order-list-top').show();

                        $('.address').html(o.siteAddress);
                        $('.details').attr('id', o.reservationCode);
                        var reservationRestTime = o.reservationRestTime;
                        countdownFn($('.time'), reservationRestTime);

                        $('.details').bind('click', function(){
                            var reservationCode = $(this).attr('id');
                            var currentObj = orderListData[0];
                            exports.sessionStorage.setItem('tempAppointmentDetails', JSON.stringify(currentObj));
                            exports.location.href = '../mine/appointmentDetails.html?v=' + new Date().getTime();
                        });
                    }
                    //else{
                    //    $('.order-list-top').show();
                    //
                    //    $('.address').html(o.siteAddress);
                    //    $('.details').attr('id', o.reservationCode);
                    //    var reservationRestTime = 10; //o.reservationRestTime;
                    //    countdownFn($('.time'), reservationRestTime);
                    //
                    //    $('.details').bind('click', function(){
                    //        var reservationCode = $(this).attr('id');
                    //        var currentObj = orderListData[0];
                    //        exports.sessionStorage.setItem('tempAppointmentDetails', JSON.stringify(currentObj));
                    //        exports.location.href = '../mine/appointmentDetails.html?v=' + new Date().getTime();
                    //    });
                    //}
                    var stateIndex = o.state * 1 - 1;

                    var state = stateArr[stateIndex];

                    var itemHtml = "<li id=\""+ o.reservationCode+"\">"+
                        "<p><span>"+ o.reservationTime +"</span><span style=\"float: left;\">"+ o.siteName+"<i>"+state+"</i></span></p>" +
                        "</li>";

                    orderListHtml += itemHtml;
                });

                if (type === 'append') {
                    $('.order-list-main').append(orderListHtml);
                    pageNo++;
                } else {
                    $('.order-list-main').html(orderListHtml);
                }

                $('.order-list-main').delegate('li', 'click', function () {
                    var code = $(this).attr('id'), currentObj = {};

                    $.each(orderListData, function (k, v) {
                        if (v.reservationCode === code) {
                            currentObj = v;
                            exports.sessionStorage.setItem('tempAppointmentDetails', JSON.stringify(currentObj));
                            return;
                        }
                    });
                    exports.location.href = '../mine/appointmentDetails.html?v=' + new Date().getTime();
                });

            }
        });
    }
    getOrderList("");

    //取消预约
    $('.cancel-order').bind('click', function () {
        var paramsOrderCancel = {
            userCode: session.user.userId,
            reservationCode: orderedStationDetails.reservationCode,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'subscription.cancel',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: paramsOrderCancel,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state == 0) {
                    exports.location.href = '../mine/appointment1.html?v=' + new Date().getTime();
                }

            }
        });
    });

    //加载更多数据
    $('.add-more').bind('click', function () {
        if (!$(this).hasClass('noMorePage')) {
            pageNo++;
            $(this).text('加载中...');
            getOrderList('append');
        }

    });

})(window);