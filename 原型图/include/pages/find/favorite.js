/**
 * Created by zhanghang on 2016/10/9.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));
    CTP.Tips('加载中...', false);
    var pageNo = 1, pageSize = 20;
    function initFavoriteList (type) {
        var _paramsList = {
            userCode: session.user.userId,
            pageNo: pageNo,
            pageSize: pageSize,
            staticRequest: '0',
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'station.mycollect',
            locale: 'zh_CN',
            appKey: session.appKey,
            timestamp: new Date().getTime(),
            sessionId: session.sessionId
        };
        CTP.Ajax({
            params: _paramsList,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                CTP.Tips('加载完毕');
                var data = e.data, html = '';
                function initData (data) {
                    $.each(data, function (k, v) {
                        var isMakeAppointment = v.makeAppointment == '1' ? '' : 'noOrder';
                        var item = '<li id="' + v.siteCode + '"><span class="favorite-list-order ' + isMakeAppointment + '">预约</span>' +
                            '<p class="favorite-list-li-title" style="height: 25px;"><b>' + v.siteName + '</b><i class="status-free">' + v.chargingPileNum + '闲</i><i class="price">' + v.price + '元/kwh</i></p>' +
                            '<p class="favorite-list-li-location" style="float: left;">' + v.address + '</p>' +
                            '</li>';
                        html += item;
                    });
                }
                if (type === 'append') {
                    if (data.length < pageSize) {
                        $('.add-more').addClass('noMorePage').text('没有更多数据了!');

                    } else {
                        $('.add-more').removeClass('noMorePage').text('加载更多');
                    }
                    initData(data);
                    $('.favorite-list').append(html);

                } else {
                    if (data.length) {
                        if (data.length < pageSize) {
                            $('.add-more').addClass('noMorePage').text('没有更多数据了!');

                        } else {
                            $('.add-more').removeClass('noMorePage').text('加载更多');
                        }

                        initData(data);

                    } else {
                        $('.favorite-list').html('');
                        $('#ctp-panel').addClass('station-no-data');
                    }

                    $('.favorite-list').html(html);

                }

            },
            error: function (e) {
                console.log(e);
            }
        });
    }
    if (CTP.checkLogin()) {
        initFavoriteList();
    } else {

    }


    //预约页面
    $('.favorite-list').delegate('.favorite-list-order', 'click', function (e) {
        e.stopPropagation();
        var sitCode = $(this).parent('li').attr('id');
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
                exports.location.href = '../order/order.html?v=' + new Date().getTime();
            }
        });

    });

    //充电站页面
    $('.favorite-list').delegate('li', 'click', function () {
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
                exports.location.href = 'stakeDetails.html?v=' + new Date().getTime();
            }
        });
    });

    //加载更多数据
    $('.add-more').bind('click', function () {
        if (!$(this).hasClass('noMorePage') & $(this).prev('ul').find('li').length > 0) {
            pageNo++;
            $(this).text('加载中...');
            initFavoriteList('append');
        }

    });

})(window);