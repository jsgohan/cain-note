/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        stakeDetails = JSON.parse(exports.sessionStorage.getItem('stakeDetails')),
        destP;
        //endTime = exports.sessionStorage.getItem('endTime')*1,
        //orderedStationDetails = JSON.parse(exports.sessionStorage.getItem('orderedStationDetails'));

    var stateArr = ['预约中', '已取消', '已超期', '已结束'];
    var pageNo = 1, pageSize = 20;
    //倒计时
    function countdownFn(val, sec) {
        var countdown = sec;

        function settime(val) {
            if (countdown == 0) {
                countdown = sec;

                exports.location.href = '../mine/appointment.html?v=' + new Date().getTime();
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
                function initData (orderListData) {
                    $(orderListData).each(function(i,o){
                        if(i == 0 && o.state == 1){
                            $('.order-list-top').show();

                            $('.address').html(o.siteAddress);
                            $('.details').attr('id', o.reservationCode);
                            var reservationRestTime = o.reservationRestTime;
                            countdownFn($('.time'), reservationRestTime);
                            //导航
                            $('.order-list-top .dhArrow').bind('click', function () {
                                var currentP = JSON.parse(exports.sessionStorage.getItem('currentPosition'));

                                var params = {
                                    srcLat: currentP.lat,
                                    srcLng: currentP.lng,
                                    dstLat: o.latitude,
                                    dstLng: o.longitude,
                                    title: '导航'
                                };
                                window.navigation(params);
                            });

                            $('.details').bind('click', function(){
                                var reservationCode = $(this).attr('id');
                                var currentObj = orderListData[0];
                                exports.sessionStorage.setItem('tempAppointmentDetails', JSON.stringify(currentObj));
                                exports.location.href = '../mine/appointmentDetails.html?v=' + new Date().getTime();
                            });

                            var appointmentDetails = {
                                reservationCode: o.reservationCode,
                                siteAddress: o.siteAddress
                            }
                            exports.sessionStorage.setItem('appointmentDetails', JSON.stringify(appointmentDetails));
                            $('.cancel-order').show();
                        }else{
                            //34.5rem
                        }

                        var stateIndex = o.state * 1 - 1;

                        var state = stateArr[stateIndex];

                        var itemHtml = "<li style='line-height: 45px; height: 45px;' id=\""+ o.reservationCode+"\">"+
                            "<p style='height: 45px; line-height: 45px;'><span style='font-size: 12px;'>"+ o.reservationTime +"</span><span style=\"float: left;font-size: 17px;color: #333;\">"+ o.siteName+"<i>"+state+"</i></span></p>" +
                            "</li>";
                        orderListHtml += itemHtml;
                    });
                    return orderListHtml;
                }
                if (orderListData.length) {

                } else {
                    $('#ctp-panel').addClass('station-no-data');

                }


                if (type === 'append') {
                    orderListHtml = initData(orderListData);
                    $('.order-list-main').append(orderListHtml);
                    if (orderListData.length < pageSize) {
                        $('.add-more').addClass('noMorePage').text('没有更多数据了!');

                    } else {
                        $('.add-more').removeClass('noMorePage').text('加载更多');
                    }

                } else {
                    if (orderListData.length) {
                        if (orderListData.length < pageSize) {
                            $('.add-more').addClass('noMorePage').text('没有更多数据了!');
                        } else {
                            $('.add-more').removeClass('noMorePage').text('加载更多');
                        }

                        orderListHtml = initData(orderListData);
                    } else {
                        $('.ctp-list-box').addClass('appoint-list-no-data');
                    }
                    $('.order-list-main').html(orderListHtml);


                }

                $('.order-list-main').delegate('li', 'click', function () {
                    var code = $(this).attr('id'), currentObj = {};

                    $.each(orderListData, function (k, v) {
                        if (v.reservationCode === code) {
                            currentObj = v;
                            exports.sessionStorage.setItem('tempAppointmentDetails', JSON.stringify(currentObj))
                            return;
                        }
                    });
                    exports.location.href = '../mine/appointmentDetails.html?v=' + new Date().getTime()+ '&distance=' + CTP.getUrlParam('distance');
                });

            }
        });
    }
    getOrderList("");

    //取消预约
    $('.cancel-order').bind('click', function () {
        var appointmentDetails = JSON.parse(exports.sessionStorage.getItem('appointmentDetails'));
        var paramsCancel = {
            userCode: session.user.userId,
            reservationCode: appointmentDetails.reservationCode,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'subscription.cancel',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
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
                        exports.location.href="../mine/appointment.html";
                    }, 1000)
                }
            }
        });
    });

    //加载更多数据
    var flg = true;
    $('.add-more').bind('click', function () {
        if (!$(this).hasClass('noMorePage') & $(this).prev('ul').find('li').length > 0) {
            if (flg) {
                pageNo++;
                $(this).text('加载中...');
                getOrderList('append');
                flg  = false;
                setTimeout(function () {
                    flg = true;
                }, 500)
            }
        }


        var tempParams = [];
        $.each($('.searchTab li'), function (k, v) {
            tempParams.push($(v).find('i').text());
        });
    });


})(window);