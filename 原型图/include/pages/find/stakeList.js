/**
 * Created by zhanghang on 2016/10/9.
 */

if (!CTP) {
    var CTP = {};
}

(function (exports) {
    var currentPosition = JSON.parse(exports.sessionStorage.getItem('currentPosition'));

    var pageNo = 1,
        pageSize = 20;
    var myCarAry = [],
        filterData;
    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));

    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    if (CTP.checkLogin()) {
        //获得列表
        var _paramsMyCar = {
            userCode: session.user.userId,
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'car.list',
            locale: 'zh_CN',
            appKey: session.appKey,
            timestamp: new Date().getTime(),
            sessionId: session.sessionId
        };
        CTP.Ajax({
            params: _paramsMyCar,
            url: '/msp-charge/router',
            type: 'GET',
            success: function (e) {
                var data = e.data;
                $.each(data, function (k, v) {
                    myCarAry.push(v.vehicleBrandCode);
                });

                filterData = [
                    ["全部电站", "空闲中", "直流电", "交流快充", "交流慢充"],
                    ["距离最近", "好评优先"],
                    ["不限车型", "我的车型"]
                ];
                initStakeList(currentPosition);

            },
            error: function (e) {
                console.log(e);
            }
        });
    } else {
        //获得列表
        var _paramsMyCar = {
            userCode: '',
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'car.all',
            locale: 'zh_CN',
            timestamp: new Date().getTime(),
            appKey: '12312'
        };
        CTP.Ajax({
            params: _paramsMyCar,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                var data = e.data;
                $.each(data, function (k, v) {
                    myCarAry.push(v.vehicleBrandCode);
                });
                filterData = [
                    ["全部电站", "空闲中", "直流电", "交流快充", "交流慢充"],
                    ["距离最近", "好评优先"],
                    ["不限车型",]
                ];
                initStakeList(currentPosition);

            },
            error: function (e) {
                console.log(e);
            }
        });
    }


    $('.searchTab').delegate('li', 'click', function () {

        var __index = $(this).index(),
            __text = $(this).find('i').text();

        var liStr = '';
        $.each(filterData[__index], function (k, v) {
            var item = '<li>' + v + '</li>';
            liStr += item;
        });
        var textIndex = $.inArray(__text, filterData[__index]);
        $('.searchTab-subDiv ul').html(liStr);
        $('.searchTab-subDiv ul li').eq(textIndex).addClass('selected');
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $('.searchTab-subDiv').hide();
            $('.searchTab-subDiv-mask').hide();

        } else {
            $('.searchTab li').removeClass('selected');
            $(this).addClass('selected');
            $('.searchTab-subDiv-mask').show();
            $('.searchTab-subDiv').show();
        }
        window.selectObj = $(this);
        window.selectType = 1;
    });


    //过滤
    function initStakeList(currentPosition, txts) {
        CTP.Tips('加载中...', false);
        var chargePileType = '',
            isFree = '',
            chargeRateType =  '',
            carType;
        var txts = txts || {
                first: '全部电站',
                second: '距离最近',
                third: '不限车型'
            };


        if ($.trim(txts.first) == '全部电站') {
        }
        if ($.trim(txts.first) == '直流电') {
            chargePileType = '1';
        }
        if ($.trim(txts.first) == '交流快充') {
            chargePileType = '2';
            chargeRateType = '1';
        }
        if ($.trim(txts.first) == '交流慢充') {
            chargePileType = '2';
            chargeRateType = '2';
        }
        if ($.trim(txts.first) == '空闲中') {
            isFree = '1';
        }
        if ($.trim(txts.second) == '距离最近') {
            sortType = '2';
        }

        if ($.trim(txts.second) == '好评优先') {
            sortType = '3';
        }
        if ($.trim(txts.third) == '我的车型') {
            carType = myCarAry.join(',');
        }
        if ($.trim(txts.third) == '不限车型') {
            carType = '';
        }

        var _params = {
            userCode: session === null ? '' : session.user.userId,
            longitude: currentPosition.lng,
            latitude: currentPosition.lat,
            keyword: '',
            // pageNo: pageNo,
            // pageSize: pageSize,
            chargePileType: chargePileType,
            chargeRateType: chargeRateType,
            isFree: isFree,
            sortType: (typeof sortType !== 'undefined' ? sortType : 2),
            carType: (typeof carType !== 'undefined' ? carType : ''),
            lstSite: '',

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'station.search',
            locale: 'zh_CN',
            appKey: session === null ? 'asda12313' : session.appKey,
            timestamp: new Date().getTime()
        };

        CTP.Ajax({
            params: _params,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                CTP.Tips('加载完毕');
                $('.searchTab-subDiv, .searchTab-subDiv-mask').hide();
                $('.searchTab li').removeClass('selected');
                var data = e.data, stationList = '';

                function initData(data) {
                    $.each(data, function (k, v) {
                        // makeAppointment 是否可以预约
                        // chargingPileNum 充电站空闲桩数量

                        var isOrder,
                            cls = (v.chargingPileNum * 1 === 0) ? 'none' : '',
                            isShow = v.makeAppointment == '2' ? 'no': 'yes',
                            isForeignOpen = v.isForeignOpen * 1 == 0 ? '<b style="float: left; line-height: 38px;font-weight: normal; font-size: 12px; color: orange">(暂不对外开放)</b>' : '<em class="' + cls + '">' + v.chargingPileNum + '</em>';
                        if (isShow == 'no') {
                            isOrder = 'no';
                        }

                        if (isShow == 'yes') {
                            if (v.chargingPileNum * 1 == 0) {
                                isOrder = 'no';
                            } else {
                                isOrder = 'yes';
                            }
                        }
                        var item = '<dl id="' + v.siteCode + '">' +
                            '<dt><span class="distance">' + (v.distance / 1000).toFixed(2) + 'km</span><i>' + v.siteName + '</i>' + isForeignOpen + '</dt>' +
                            '<dd class="location">' + v.address + '</dd>' +
                            '<dd class="orderBtn ' + isOrder + '"><span>预约</span></dd>' +
                            '</dl>';
                        stationList += item;
                    });
                    return stationList;
                }

                if (txts.type === 'append') {//如果是加载历史数据
                    stationList = initData(data);
                    $('.stake-list').append(stationList);
                    if (data.length < pageSize) {
                        $('.add-more').addClass('noMorePage').text('没有更多数据了!');

                    } else {
                        $('.add-more').removeClass('noMorePage').text('加载更多');
                    }

                } else {
                    if (data.length) {
                        if (data.length < pageSize) {
                            $('.add-more').addClass('noMorePage').text('没有更多数据了!');
                        } else {
                            $('.add-more').removeClass('noMorePage').text('加载更多');
                        }

                        stationList = initData(data);
                    } else {
                        $('.stake-details-tab-sub-comment').addClass('comment-no-data');
                    }
                    $('.stake-list').html(stationList);
                }

            },
            error: function (e) {
                console.log(e);
            }
        });

    }

    $('.searchTab-subDiv').delegate('li', 'click', function () {
        CTP.Tips('加载中...');
        pageNo = 1;
        var __text = $(this).text();
        var electType, isFree = 3,
            chargePileType = 3,
            sortType = 1,
            carType = '';
        $('.searchTab li.selected').find('i').text(__text);
        var firstTxt = $($('.searchTab li').eq(0)).text(),
            secTxt = $($('.searchTab li').eq(1)).text(),
            thirdTxt = $($('.searchTab li').eq(2)).text();
        initStakeList(currentPosition, {
            first: firstTxt,
            second: secTxt,
            third: thirdTxt,
            filter: true
        });

    });
    //点击进入充电站
    //充电站页面
    $('.stake-list').delegate('dl', 'click', function () {
        var self = $(this);
        var sitCode = $(this).attr('id');
        var paramsDetails = {
            userCode: session === null ? '' : session.user.userId,
            siteCode: sitCode,
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'station.info',
            locale: 'zh_CN',
            appKey: session !== null ? session.appKey : 'asdadf',
            sessionId: session !== null ? session.sessionId : '',
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: paramsDetails,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                exports.sessionStorage.setItem('stakeDetails', JSON.stringify(e.data));
                exports.location.href = './stakeDetails.html?v=' + new Date().getTime() + '&distance=' + self.find('.distance').text() + '&currentPositionLat=' + currentPosition.lat + '&currentPositionLng=' + currentPosition.lng;
            }
        });
    });
    //点击进入预约页面
    $('.stake-list').delegate('.orderBtn', 'click', function (e) {
        e.stopPropagation();
        var self = $(this);
        if (self.hasClass('yes')) {
            if (CTP.checkLogin()) {

            } else {

            }
            CTP.checkSession(CTP.weChatAccount, {
                success: function (o) {
                    var sitCode = self.parent('dl').attr('id');
                    var paramsDetails = {
                        userCode: o.user.userId,
                        siteCode: sitCode,
                        nonce: 'abc',
                        v: '1.0',
                        format: 'json',
                        method: 'station.info',
                        locale: 'zh_CN',
                        appKey: o.appKey,
                        sessionId: o.sessionId,
                        timestamp: new Date().getTime()
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

                },
                fail: function () {
                    //exports.sessionStorage.setItem('comePage', '../order/order.html?v=' + new Date().getTime());
                    //exports.location.href = '../register/userBind.html?v=' + new Date().getTime();

                    $('#ctp-user-bind-form-container').show();
                }
            });
        } else {
            CTP.Tips('不能预约！');
        }
    });

    //点击进入个人页面
    $('.stake-map-search-left').bind('click', function () {
        exports.location.href = '../mine/mine.html?v=' + new Date().getTime();
    });

    //点击搜索
    var session = JSON.parse(exports.sessionStorage.getItem('session'));

    function searchListTransfer(e) {
        exports.sessionStorage.setItem('searchListPageData', e);
        exports.location.href = './findStake.html?v=' + new Date().getTime();
    }

    function searchFn(keyWord, _currentP) {

        var _params = {
            userCode: session !== null ? session.user.userId : '',
            longitude: _currentP.lng,
            latitude: _currentP.lat,
            keyword: keyWord,
            chargePileType: '',
            isFree: '',
            sortType: '',
            carType: '',
            lstSite: '',

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'station.search',
            locale: 'zh_CN',
            appKey: session !== null ? session.user.userId : '',
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                //搜索历史记录
                var searchHistoryData;
                if (session !== null && exports.sessionStorage.getItem(session.user.userId + '_searchHistory') !== null) {
                    searchHistoryData = JSON.parse(exports.sessionStorage.getItem(session.user.userId + '_searchHistory'));
                } else {
                    searchHistoryData = [];
                }
                if ($('.stake-map-search-center input').val() !== '') {
                    var isExists = false;
                    $.each(searchHistoryData, function (k, v) {
                        if ($('.stake-map-search-center input').val() == v) {
                            isExists = true;
                        }
                    });
                    if (!isExists) {
                        searchHistoryData.push($('.stake-map-search-center input').val());
                    }
                }
                if (session !== null && (session.user.userId + '_searchHistory') !== null) {
                    exports.sessionStorage.setItem(session.user.userId + '_searchHistory', JSON.stringify(searchHistoryData));
                } else {
                    exports.sessionStorage.setItem('DefaultSearchHistory', JSON.stringify(searchHistoryData));
                }


                searchListTransfer(keyWord);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    $('.stake-map-search-center input').bind('focus', function () {
        $('.stake-map-search-right-btn').show();
        $('.stake-map-search-right').hide();
        $('.del-dot').show();
        $('.search-result-list-box').show();
        $('.search-sub-history').show();
        $('.search-sub-history-mask').show();

        if (session !== null && exports.sessionStorage.getItem(session.user.userId + '_searchHistory') !== null) {
            $('.btn-clear-history').show();
            var searchListStr = '';

            var searchListData = JSON.parse(exports.sessionStorage.getItem(session.user.userId + '_searchHistory'));
            if (searchListData !== null) {
                $.each(searchListData, function (k, v) {
                    var item = '<p>' + v + '</p>';
                    searchListStr += item;
                });
            }
            $('.history-list').html(searchListStr);
        } else {
            $('.btn-clear-history').hide();
        }

    });
    $('.del-dot').bind('click', function (e) {
        $(this).hide();
        $('.stake-map-search-center').find('input').val('');
        $('.stake-map-search-right-btn').hide();
        $('.stake-map-search-right').show();
        $('#search-result-panel').hide();
        $('.search-sub-history').hide();
        $('.search-sub-history-mask').hide();

    });
    $('.history-list').delegate('p', 'click', function () {
        var self = $(this),
            keyWord = self.text();

        $('.search-result-panel-title').show();
        $('.search-result-list-item').hide();
        $('.search-result-list-box').show();
        $('#search-result-panel').show();
        searchFn(keyWord, currentPosition);
    });

    $('.stake-map-search-right-btn').bind('click', function (e) {
        var keyWord = $('.stake-map-search-center').find('input').val();

        searchFn(keyWord, currentPosition);

    });
    $('.stake-map-search-right').bind('click', function () {
        exports.location.href = './findStake.html?v=' + new Date().getTime();
    });


    //用户绑定

    //倒计时
    function countdownFn(val, sec) {
        var countdown = sec;

        function settime(val) {
            if (countdown == 0) {
                $(val).next('a').text('发送验证码').removeClass('disable');
                countdown = sec;

            } else {
                $(val).next('a').text("重新发送(" + countdown + ")").addClass('disable');
                countdown--;
                setTimeout(function () {
                    settime(val);
                }, 1000)
            }

        }

        settime(val);
    }


    //获得校验码
    function getJyCode(me) {
        var _params = {
            mobile: $('.tel input').val(),
            validCode: '',
            method: 'user.sendvalidcode',
            reason: 'bind_wechat',

            appKey: '00014b81addb04bf',
            locale: 'zh_CN',
            format: 'json',
            v: '1.0',
            nonce: 'abc',
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (e) {
                if (e.successful) {
                    if (!e.userexists) {
                        //exports.location.href='./improveInfo.html?v=' + new Date().getTime()
                        CTP.Tips('用户不存在!');
                    } else {
                        countdownFn(me, 10);
                        $('.btn span').bind('click', function () {
                            jY();
                        });

                    }
                }
                if (e.code == '9') {
                    CTP.Tips(e.subErrors[0].message);
                }

            },
            error: function (e) {
                CTP.Tips('status' + e.status);
                CTP.Tips('readyState' + e.readyState);
                CTP.Tips('textStatus' + e.statusText);
            }
        });
    }

    //提交
    function jY() {
        var _params = {
            phone: $('.tel input').val(),
            validCode: $('.sendCode input').val(),
            method: 'user.validCodelogin',

            appKey: '00014b81addb04bf',
            locale: 'zh_CN',
            format: 'json',
            v: '1.0',
            nonce: 'abc'
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (e) {
                exports.sessionStorage.setItem('session', JSON.stringify(e));
                $('#ctp-user-bind-form-container').hide();

            },
            error: function (e) {

            }
        });
    }


    $('.sendCode a').bind('click', function () {
        var self = $(this),
            input = self.parent().find('input').get(0);
        if (!self.hasClass('disable')) {
            getJyCode(input);
        } else {
            CTP.Tips('不要频繁获取!');
        }
    });


    //加载更多数据
    var flg = true;
    $('.add-more').bind('click', function () {
        if (!$(this).hasClass('noMorePage') & $(this).prev('div').find('dl').length > 0) {
            if (flg) {
                var tempParams = [];
                $.each($('.searchTab li'), function (k, v) {
                    tempParams.push($(v).find('i').text());
                });
                pageNo++;
                $(this).text('加载中...');
                initStakeList(currentPosition, {
                    first: tempParams[0],
                    second: tempParams[1],
                    third: tempParams[2],
                    pageNo: pageNo,
                    type: 'append'
                });
                flg = false;
                setTimeout(function () {
                    flg = true;
                }, 500)
            }
        }

    });

    //扫描
    $('.stake-map-scan, .BMap_geolocationIcon').bind('click', function () {
        //var self = $(this);
        //self.addClass('clicked');
        //setTimeout(function () {
        //    self.removeClass('clicked');
        //}, 300);


        if (CTP.checkLogin()) {
            CTP.checkSession(CTP.weChatAccount, {
                success: function () {
                    CTP.getHomeInfor(function (m) {
                            var data = m.data;
                            if (data.orderCode !== '' && data.orderState == '2') {
                                exports.sessionStorage.setItem('chargingOrderCode', data.orderCode);
                                setTimeout(function () {
                                    exports.location.href = '../../pages/charging/charging.html';
                                }, 1000)
                            } else {
                                exports.location.href = '/msp-charge/wechat/scan/code';
                            }
                        }
                    );
                }
            });


        } else {
            exports.sessionStorage.setItem('comePage', '../find/findStake.html?v=' + new Date().getTime());
            exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
        }


    });
    //页面高度
    var tempH = $(window).height();
    $('.ctp-list-box').height(tempH - 86);
    //搜索框宽度
    $('.stake-map-search-center').width($(window).width() - 125);


})(window);