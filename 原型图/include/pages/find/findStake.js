/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports, jQ) {
    var tempObject = window.sessionStorage.getItem('weChatAccount');
    var MK, currentPosition, map;
    CTP.PubSub.subscribe('getCurrentPosition', function (e) {
        currentPosition = e.args;
    });

    //初始化地图
    var markers = [];


    function addMarker(arg) { // 创建图标对象
        var arg = arg;
        //isSzOperatingUnit
        // siteType: siteType,
        // chargingPileNum: chargingPileNum，
        // point: _p,
        // number: j


        var workingState = arg.target.workingState;
        var imgUrl;
        if (arg.siteType == '1') { //个人站
            if (workingState * 1 == 1) {
                imgUrl = '../../assets/images/c_map_stake_leisure.svg';

            }
            if (workingState * 1 == 2) {
                imgUrl = '../../assets/images/c_map_stake_not_available.svg';

            }
            if (workingState * 1 == 3) {
                imgUrl = '../../assets/images/c_map_stake_off_line.svg';

            }

        }
        if (arg.siteType == '2') { //公共站
            if (workingState * 1 == 1) {
                imgUrl = '../../assets/images/c_map_station_leisure.svg';

            }
            if (workingState * 1 == 2) {
                imgUrl = '../../assets/images/c_map_station_not_available.svg';

            }
            if (workingState * 1 == 3) {
                imgUrl = '../../assets/images/c_map_station_off_line.svg';

            }


        }
        if (arg.isSzOperatingUnit == '2') { //不是深圳运营商
            if (workingState * 1 == 1) {
                imgUrl = '../../assets/images/c_map_station_other_leisure.svg';

            }
            if (workingState * 1 == 2) {
                imgUrl = '../../assets/images/c_map_station_other_not_available.svg';

            }
            if (workingState * 1 == 3) {
                imgUrl = '../../assets/images/c_map_station_other_off_line.svg';

            }
        }
        var myIcon = new BMap.Icon(imgUrl, new BMap.Size(26, 62), {
            offset: new BMap.Size(0, 0), // 指定定位位置
            imageOffset: new BMap.Size(0, 0) // 设置图片偏移
        });
        // 创建标注对象并添加到地图
        var marker = new BMap.Marker(arg.point, {icon: myIcon});
        marker.addEventListener("click", function () {
            markerFn(arg.target);
            if (window.sessionStorage.getItem('isPLT') == 'WECHAT') {
                $('.search-result-list-item-params span.add-fav').css({"right": "0"});
                $('.search-result-share').hide();
                var currentRootIndex = window.location.href.indexOf('msp-charge'),
                    currentRoot = window.location.href.substring(0, currentRootIndex),
                    siteCode = arg.target.siteCode,
                    siteName = arg.target.siteName;

                var shareParams = {
                    title: siteName,
                    href: currentRoot + 'msp-charge/share/station?siteCode=' + siteCode,
                    content: siteName
                };

                wx.ready(function () {
                    //微信好友
                    wx.onMenuShareAppMessage({
                        title: shareParams.title, // 分享标题
                        link: shareParams.href, // 分享链接
                        desc: shareParams.content,
                        imgUrl: '', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            jQ('.find-stake-share-panel').hide();
                            console.log('fail');

                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            console.log('fail');
                        }
                    });

                    //朋友圈
                    wx.onMenuShareTimeline({
                        title: shareParams.title, // 分享标题
                        link: shareParams.href, // 分享链接
                        desc: shareParams.content,
                        imgUrl: '', // 分享图标
                        trigger: function (res) {
                            console.log('用户点击分享到朋友圈');
                        },
                        success: function (res) {
                            console.log('已分享');
                        },
                        cancel: function (res) {
                            console.log('已取消');
                        },
                        fail: function (res) {
                            console.log('wx.onMenuShareTimeline:fail: ' + JSON.stringify(res));
                        }
                    });

                    //QQ分享
                    wx.onMenuShareQQ({
                        title: shareParams.title, // 分享标题
                        link: shareParams.href, // 分享链接
                        desc: shareParams.content,
                        imgUrl: '', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            jQ('.find-stake-share-panel').hide();
                            console.log('qq');
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            console.log('fail');

                        }
                    });
                });

            }
            if (window.sessionStorage.getItem('isPLT') == 'EPO') {
                $('.search-result-list-item-params span.add-fav').css({"right": "31px"});
                $('.search-result-share').show();
            }

            jQ('.search-result-panel-mask').fadeIn();
        });
        map.addOverlay(marker);
        markers.push(marker);
        CTP.Tips('加载完毕');


    }


    function initMap(o) {
        CTP.Tips('加载中...');
        // 百度地图API功能
        map = new BMap.Map("stake-map");
        //添加缩放
        var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM, anchor: BMAP_ANCHOR_TOP_LEFT, mapTypes: [BMAP_NORMAL_MAP]};
        map.addControl(new BMap.NavigationControl(opts));

        // var opts2 = {offset: new BMap.Size(0, 5)}    
        map.addControl(new BMap.ScaleControl());


        // 添加定位控件
        var opts3 = {offset: new BMap.Size(10, -100)}
        var geolocationControl = new BMap.GeolocationControl(opts3);
        geolocationControl.addEventListener("locationSuccess", function (e) {
            currentPosition = e.point;

            CTP.PubSub.publish('getCurrentPosition', currentPosition);

            exports.sessionStorage.setItem('currentPosition', JSON.stringify(currentPosition));
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            console.log("当前定位地址为：" + address);

            var myIcon = new BMap.Icon("../../assets/images/c_map_current_location.svg", new BMap.Size(20, 20), {
                offset: new BMap.Size(0, 0), // 指定定位位置
                imageOffset: new BMap.Size(0, 0) // 设置图片偏移
            });
            var mk = new BMap.Marker(e.point, {icon: myIcon}); //创建一个覆盖物
            MK = mk;
            map.addOverlay(mk); //增加一个标示到地图上

            //map.panTo(e.point, 22);
            map.centerAndZoom(e.point, 15);

        });
        geolocationControl.addEventListener("locationError", function (e) {
            // 定位失败事件
            console.log(e.message);
        });
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (result) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                currentPosition = result.point;
                CTP.PubSub.publish('getCurrentPosition', currentPosition);

                //第一次进入地图查询站点
                //如果没有绑定登录
                var userCode = o == '' ? o : o.user.userId,
                    appKey = o == '' ? o : o.appKey;
                var _params = {
                    userCode: userCode,
                    longitude: currentPosition.lng,
                    latitude: currentPosition.lat,
                    keyword: '',
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
                    appKey: appKey,
                    timestamp: new Date().getTime()
                };
                CTP.Ajax({
                    params: _params,
                    url: '/msp-charge/router',
                    type: 'POST',
                    success: function (e) {
                        var data = e.data;

                        jQ.each(data, function (k, v) {
                            var siteType = v.siteType; // 1 个人站  2公共站
                            var isSzOperatingUnit = v.isSzOperatingUnit; //是否是深圳运营商
                            var chargingPileNum = v.chargingPileNum; //小于1为灰色没有空闲充电桩
                            var flg = 1;
                            var _p = new BMap.Point(v.longitude, v.latitude);

                            (function (j) {
                                var args = {
                                    isSzOperatingUnit: isSzOperatingUnit,
                                    siteType: siteType,
                                    chargingPileNum: chargingPileNum,
                                    point: _p,
                                    number: j,
                                    target: v
                                };
                                addMarker(args);
                            })(k);
                        });
                        map.setZoom(15);

                        // 创建标注对象并添加到地图

                        latitude = result.point.lat; //获取到的纬度
                        longitude = result.point.lng; //获取到的经度
                        var myIcon = new BMap.Icon("../../assets/images/c_map_current_location.svg", new BMap.Size(20, 20), {
                            offset: new BMap.Size(0, 0), // 指定定位位置
                            imageOffset: new BMap.Size(0, 0) // 设置图片偏移
                        });
                        var mk = new BMap.Marker(result.point, {icon: myIcon}); //创建一个覆盖物
                        MK = mk;
                        map.addOverlay(mk); //增加一个标示到地图上
                        map.centerAndZoom(result.point, 15);

                    },
                    error: function (e) {
                        console.log(e);
                    }
                });


                exports.sessionStorage.setItem('currentPosition', JSON.stringify(currentPosition));

                //列表跳地图页，根据关键字搜索
                if (exports.sessionStorage.getItem('searchListPageData') !== null) {
                    var keyWord = exports.sessionStorage.getItem('searchListPageData');
                    searchFn(keyWord, currentPosition);
                    jQ('.stake-map-search-center input').focus();
                    jQ('.del-dot').show();
                }

                if (exports.sessionStorage.getItem('filterCarTypeFlag') !== null) {
                    var myCar = exports.sessionStorage.getItem('filterCarType');
                    jQ('.filter-car-list-my-car-type').attr('data-modeCode', myCar.id);
                    jQ('.filter-car-list-my-car-type img').attr('src', myCar.img);
                    jQ('.filter-car-list-my-car-type span').text(myCar.name);
                    jQ('.filter-car-list-my-car-type').show();

                    jQ('#stake-map-filterList-mask').fadeIn();
                    jQ('#stake-map-filterList').fadeIn();

                    exports.sessionStorage.removeItem('filterCarTypeFlag');
                }


            }


        });

        map.addControl(geolocationControl);

        ////最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。

        loadMarkerClusterer(map, markers);

    }


    function initMap1(o, data) {
        CTP.Tips('加载中...');
        // 百度地图API功能
        map = new BMap.Map("stake-map");
        //添加缩放
        var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM, anchor: BMAP_ANCHOR_TOP_LEFT, mapTypes: [BMAP_NORMAL_MAP]};
        map.addControl(new BMap.NavigationControl(opts));

        // var opts2 = {offset: new BMap.Size(0, 5)}
        map.addControl(new BMap.ScaleControl());


        // 添加定位控件
        var opts3 = {offset: new BMap.Size(10, -100)}
        var geolocationControl = new BMap.GeolocationControl(opts3);

        markers = [];


        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function (e) {
            currentPosition = e.point;

            CTP.PubSub.publish('getCurrentPosition', currentPosition);

            exports.sessionStorage.setItem('currentPosition', JSON.stringify(currentPosition));
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            console.log("当前定位地址为：" + address);
            //map.panTo(e.point, 22);
            map.centerAndZoom(e.point, 15);

        });
        geolocationControl.addEventListener("locationError", function (e) {
            // 定位失败事件
            console.log(e.message);
        });
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (result) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                currentPosition = result.point;
                CTP.PubSub.publish('getCurrentPosition', currentPosition);

                //第一次进入地图查询站点
                jQ.each(data, function (k, v) {
                    var siteType = v.siteType; // 1 个人站  2公共站
                    var isSzOperatingUnit = v.isSzOperatingUnit; //是否是深圳运营商
                    var chargingPileNum = v.chargingPileNum; //小于1为灰色没有空闲充电桩
                    var flg = 1;
                    var _p = new BMap.Point(v.longitude, v.latitude);

                    (function (j) {
                        var args = {
                            isSzOperatingUnit: isSzOperatingUnit,
                            siteType: siteType,
                            chargingPileNum: chargingPileNum,
                            point: _p,
                            number: j,
                            target: v
                        };
                        addMarker(args);
                    })(k);
                });


                map.setZoom(15);

                // 创建标注对象并添加到地图
                latitude = result.point.lat; //获取到的纬度
                longitude = result.point.lng; //获取到的经度
                var myIcon = new BMap.Icon("../../assets/images/position-icon-14x14.svg", new BMap.Size(17, 17), {
                    offset: new BMap.Size(0, 0), // 指定定位位置
                    imageOffset: new BMap.Size(0, 0) // 设置图片偏移
                });
                var mk = new BMap.Marker(result.point, {icon: myIcon}); //创建一个覆盖物
                MK = mk;
                map.addOverlay(mk); //增加一个标示到地图上
                //map.panTo(result.point, 22);
                map.centerAndZoom(result.point, 15);

                exports.sessionStorage.setItem('currentPosition', JSON.stringify(currentPosition));

                if (exports.sessionStorage.getItem('searchListPageData') !== null) {
                    var keyWord = exports.sessionStorage.getItem('searchListPageData');
                    searchFn(keyWord, currentPosition);
                    jQ('.stake-map-search-center input').focus();
                    jQ('.del-dot').show();
                }
            }
        });
        map.addControl(geolocationControl);

        loadMarkerClusterer(map, markers);
    }

    function loadMarkerClusterer(bdMap, bdMarkers) {
        console.log('bdMarkers---', bdMarkers.length);
        setTimeout(function () {
            if (map && markers.length > 0) {
                var markerClusterer = new BMapLib.MarkerClusterer(bdMap, {markers: bdMarkers});
                var myStyles = [{
                    url: '../../assets/images/c_map_collection.svg?2=1', //图标路径
                    size: new BMap.Size(26, 42), //图标大小
                    textColor: '#3eba7e', //文字颜色
                    textSize: 14 //字体大小
                }];
                markerClusterer.setStyles(myStyles);
                // if (bdMarkers.length > 1) {
                //     markerClusterer.setMinClusterSize(2);
                // } else {
                //     markerClusterer.setMinClusterSize(5);
                // }
                // console.log(markerClusterer.getStyles())
            } else {
                // loadMarkerClusterer(bdMap, bdMarkers);
            }
        }, 5000);
    }

    //比例尺


    //CTP.weChatAccount
    CTP.checkSession(CTP.weChatAccount, {
        success: function (e) { //如果用户存在
            initMap(e);
        },
        fail: function (e) { //如果用户不存在
            initMap('');
        }
    });


    //页面跳转
    jQ('.stake-map-search-right').bind('click', function () { //搜索列表
        exports.location.href = './stakeList.html?v=' + new Date().getTime();
    });
    jQ('.filter-car-list li.change-car-type').bind('click', function () { //车型选择页面
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
                var carData = e.data;
                exports.sessionStorage.setItem('comePage', '../find/findStake.html?v=' + new Date().getTime());
                exports.sessionStorage.setItem('allCarList', JSON.stringify(carData));
                exports.location.href = 'carType.html?v=' + new Date().getTime();
            }
        });
    });

    getCarTypeFindStake()
    //过滤条件
    function initFilter() {
        if (CTP.checkLogin()) { //如果已经登录
            var session = JSON.parse(exports.sessionStorage.getItem('session'));
            var carTypeParams = {
                userCode: session.user.userId,
                nonce: 'abc',
                format: 'json',
                v: '1.0',
                method: 'car.list',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: carTypeParams,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (_r) {
                    if (_r.state == '0') {
                        var carData = _r.data,
                            myCar;
                        if (carData.length > 0) {
                            myCar = {
                                id: carData[0].vehicleModelCode,
                                name: carData[0].vehicleModel,
                                img: carData[0].vehicleBrandImg,
                                modelCode: carData[0].vehicleModelCode,
                                brandCode: carData[0].vehicleBrandCode
                            };
                            exports.sessionStorage.setItem('filterCarType', JSON.stringify(myCar));

                            jQ('.filter-car-list-my-car-type').attr('data-modeCode', myCar.id);
                            jQ('.filter-car-list-my-car-type img').attr('src', myCar.img);
                            jQ('.filter-car-list-my-car-type span').text(myCar.name);
                            jQ('.filter-car-list-my-car-type').show();
                        } else {
                            jQ('.filter-car-list-my-car-type').hide();
                        }
                    }
                }
            });
        } else { //没有登录
            jQ('.filter-car-list-my-car-type').hide();
        }
        jQ('#stake-map-filterList-mask').fadeIn();
        jQ('#stake-map-filterList').fadeIn();
    }

    jQ('.stake-map-filter').bind('click', function () {
        initFilter();
    });
    jQ('.btn-group a').bind('click', function () {
        var cls = jQ(this).attr('class');
        if (cls === 'btn-group-cancel') {
            jQ('#stake-map-filterList-mask').fadeOut();
            jQ('#stake-map-filterList').fadeOut();
        }
        if (cls === 'btn-group-submit') { //过滤条件
            if (typeof map.clearOverlays !== 'undefined') {
                map.clearOverlays();
            }

            var electType, isFree = 3, chargeRateType;
            if (jQ('.zld').hasClass('selected') && !jQ('.jlkc, .jlmc').hasClass('selected')) {
                electType = 1;
            }
            if (jQ('.jlkc').hasClass('selected') && !jQ('.zld').hasClass('selected')) {
                electType = 2;
                chargeRateType = 1;
            }
            if (jQ('.jlmc').hasClass('selected') && !jQ('.zld').hasClass('selected')) {
                electType = 2;
                chargeRateType = 2;
            }
            if (jQ('.zld').hasClass('selected') && jQ('.jld').hasClass('selected')) {
                electType = 3;
            }
            if (jQ('.ykx').hasClass('selected')) {
                isFree = 1;
            } else {
                isFree = 3;
            }
            var carType = "";
            if (jQ('.filter-car-list-my-car-type').hasClass('selected')) {
                carType = jQ('.filter-car-list-my-car-type').attr('data-modeCode');
            }
            var session = JSON.parse(exports.sessionStorage.getItem('session')),
                userCode = session === null ? '' : session.user.userId,
                appKey = session === null ? '' : session.appKey;
            var _params = {
                userCode: userCode,
                longitude: currentPosition.lng,
                latitude: currentPosition.lat,
                keyword: jQ('.stake-map-search-center').find('input').val(),
                chargePileType: electType,
                chargeRateType: chargeRateType,
                isFree: isFree,
                sortType: '',
                carType: carType,
                lstSite: '',

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'station.search',
                locale: 'zh_CN',
                appKey: appKey,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: _params,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {

                    var data = e.data;

                    initMap1(session, data);

                    jQ('#stake-map-filterList-mask').fadeOut();
                    jQ('#stake-map-filterList').fadeOut();
                    //jQ.each(data, function (k, v) {
                    //    var siteType = v.siteType; // 1 个人站  2公共站
                    //    var isSzOperatingUnit = v.isSzOperatingUnit; //是否是深圳运营商
                    //    var chargingPileNum = v.chargingPileNum; //小于1为灰色没有空闲充电桩
                    //    var flg = 1;
                    //    var _p = new BMap.Point(v.longitude, v.latitude);
                    //
                    //    (function (j) {
                    //        var args = {
                    //            isSzOperatingUnit: isSzOperatingUnit,
                    //            siteType: siteType,
                    //            chargingPileNum: chargingPileNum,
                    //            point: _p,
                    //            number: j,
                    //            target: v
                    //        };
                    //        addMarker(args);
                    //    })(k);
                    //});
                    //map.setZoom(10);
                    //jQ('#stake-map-filterList-mask').fadeOut();
                    //jQ('#stake-map-filterList').fadeOut();
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }

    });

    //收藏列表
    jQ('.stake-map-favorite').bind('click', function () {
        CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));

        if (CTP.checkLogin()) {
            exports.location.href = './favorite.html?v=' + new Date().getTime();

        } else {
            exports.sessionStorage.setItem('comePage', '../find/findStake.html?v=' + new Date().getTime());
            exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
        }

    });

    jQ('.filter-elect-list li, .filter-car-list li').bind('click', function () {
        var selfCls = jQ(this).attr('class');
        if (selfCls !== 'change-car-type') {
            jQ(this).toggleClass('selected');
        } else {
            return;
        }

    });

    //获得车型
    function getCarTypeFindStake() {
        var filterCarType = JSON.parse(exports.sessionStorage.getItem('filterCarType'));
        if (filterCarType !== null) {
            jQ('.filter-car-list-my-car-type').attr('data-modeCode', filterCarType.id);
            jQ('.filter-car-list-my-car-type img').attr('src', filterCarType.img);
            jQ('.filter-car-list-my-car-type span').text(filterCarType.name);
            jQ('.filter-car-list-my-car-type').show();
        } else {
            initFilter();
            jQ('.stake-map-filterList, .stake-map-filterList-mask').hide();
        }

    };
    console.log('CTP-', CTP);
    jQ('.stake-map-scan, .BMap_geolocationIcon').bind('click', function () {
        if (CTP.checkLogin()) {
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

        } else {
            exports.sessionStorage.setItem('comePage', '../find/findStake.html?v=' + new Date().getTime());
            exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
        }


    });

    jQ('.history-list').delegate('p', 'click', function () {
        var self = jQ(this),
            keyWord = self.text();

        jQ('.search-result-list-item-name i').html('');

        jQ('.search-result-panel-title').show();
        jQ('.search-result-list-item').hide();
        jQ('.search-result-list-box').show();
        jQ('#search-result-panel').show();

        searchFn(keyWord, currentPosition);

    });

    function searchFn(keyWord, _currentP) {
        markers = [];
        if (typeof map.clearOverlays !== 'undefined') {
            map.clearOverlays();
        }
        var session = JSON.parse(exports.sessionStorage.getItem('session'));
        var userCode = session === null ? '' : session.user.userId,
            appKey = session === null ? 'asdfadf' : session.appKey;
        var _params = {
            userCode: userCode,
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
            appKey: appKey,
            timestamp: new Date().getTime(),
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
                if (jQ('.stake-map-search-center input').val() !== '') {

                    var isExists = false;
                    jQ.each(searchHistoryData, function (k, v) {
                        if (jQ('.stake-map-search-center input').val() == v) {
                            isExists = true;
                        }
                    });
                    if (!isExists) {
                        searchHistoryData.push(jQ('.stake-map-search-center input').val());
                    }

                }
                if (session !== null) {
                    exports.sessionStorage.setItem(session.user.userId + '_searchHistory', JSON.stringify(searchHistoryData));
                }

                jQ('.search-sub-history-mask, .search-sub-history').hide();
                //jQ('.stake-map-search-right-btn').hide();
                jQ('#search-result-panel').fadeIn();


                var data = e.data;

                //清空地图站点图标
                if (map) {
                    map.clearOverlays();
                }

                initMap1(session, data);

                var liStr = '';


                jQ('.search-result-panel-title i').text(data.length);
                jQ.each(data, function (k, v) {
                    var distance = (v.distance * 1 / 1000).toFixed(2),
                        isOrder = (v.chargingPileNum * 1 == 0) ? 'no' : 'yes',
                        isisForeignOpen = v.isForeignOpen * 1 == 0 ? '<b style="float: left; font-weight:normal;font-size: 12px; color: orange;">(未开放)</b>' : '<em class="free" style="margin-left: 5px;">' + v.chargingPileNum + '</em><em class="price">' + v.price + '元/kWh</em>';
                    console.log(distance);
                    var item = '<dl data-target=\'' + JSON.stringify(v) + '\' data-workingState="' + v.workingState + '" data-img="' + v.img + '" data-workingTime="' + v.workingTime + '"  data-collect="' + v.isCollect + '" data-price="' + v.price + '" data-distance="' + distance + 'km" data-address="' + v.address + '" data-siteName="' + v.siteName + '" data-chargingPileNum="' + v.chargingPileNum + '" data-isSzOperatingUnit="' + v.isSzOperatingUnit + '" data-siteType="' + v.siteType + '" data-longitude="' + v.longitude + '" data-latitude="' + v.latitude + '" id="' + v.siteCode + '">' +
                        '<dt><span class="distance">' + distance + 'km</span><i style="font-style: normal; float: left;width: 180px; display: inline-block;white-space: nowrap;overflow:hidden; text-overflow: ellipsis;">' + v.siteName + '</i>' + isisForeignOpen + '</dt>' +
                        '<dd class="location">' + v.address + '</dd><dd class="orderBtn ' + isOrder + '"><span>预约</span></dd>' +
                        '</dl>';
                    liStr += item;
                });
                jQ('.search-result-list').html(liStr);
                jQ('.stake-map-search-center').find('input').val(keyWord);
                exports.sessionStorage.removeItem('searchListPageData');

            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    jQ('.stake-map-search-right-btn').bind('click', function (e) {
        var keyWord = jQ('.stake-map-search-center').find('input').val();
        jQ('.search-result-list-item-name i').html('');
        searchFn(keyWord, currentPosition);
    });

    jQ('.search-result-panel-title span').bind('click', function () {
        jQ('.search-result-list-box').toggle();

        jQ('.search-result-list-item').hide();

        jQ(this).toggleClass('t');

        //jQ('.search-result-list-item').toggle();
    });

    jQ('.stake-map-search-center input').bind('focus', function () {
        var session = JSON.parse(exports.sessionStorage.getItem('session'));
        jQ('.search-result-list-item').hide();
        jQ('.stake-map-search-right-btn').show();
        jQ('.stake-map-search-right').hide();
        jQ('.del-dot').show();
        jQ('.search-result-list-box').show();
        jQ('.search-sub-history').show();
        jQ('.search-sub-history-mask').show();
        if (session !== null && exports.sessionStorage.getItem(session.user.userId + '_searchHistory') !== null) {
            jQ('.btn-clear-history').show();
            var searchListStr = '';
            var searchListData = JSON.parse(exports.sessionStorage.getItem(session.user.userId + '_searchHistory'));
            jQ.each(searchListData, function (k, v) {
                var item = '<p>' + v + '</p>';
                searchListStr += item;
            });
            jQ('.history-list').html(searchListStr);
        } else {
            jQ('.btn-clear-history').hide();
        }

    });
    //jQ('.stake-map-search-center input').bind('blur', function () {
    //    jQ('.stake-map-search-right-btn').hide();
    //    jQ('.stake-map-search-right').show();
    //});

    jQ('.del-dot').bind('click', function (e) {
        jQ(this).hide();
        jQ('.stake-map-search-center').find('input').val('');
        jQ('.stake-map-search-right-btn').hide();
        jQ('.stake-map-search-right').show();
        jQ('#search-result-panel').hide();
        jQ('.search-sub-history').hide();
        jQ('.search-sub-history-mask').hide();
    });

    //点击进入充电站
    //充电站页面
    jQ('.search-result-list-item-middle-details').bind('click', function (e) {
        e.stopPropagation();

        var sitCode = jQ(this).parent().parent().find('.search-result-list-item-name').attr('data-sitecode');
        var _sess = JSON.parse(exports.sessionStorage.getItem('session'));
        var distance = jQ(this).parent().find('.search-result-list-item-distance i').html();
        var userCode = _sess === null ? '' : _sess.user.userId,
            appKey = _sess === null ? '' : _sess.appKey,
            sessionId = _sess === null ? '' : _sess.sessionId;
        var paramsDetails = {
            userCode: userCode,
            siteCode: sitCode,
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'station.info',
            locale: 'zh_CN',
            appKey: appKey,
            sessionId: sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: paramsDetails,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (o) {
                if (o.state == 0) {

                    exports.sessionStorage.setItem('stakeDetails', JSON.stringify(o.data));
                    exports.location.href = './stakeDetails.html?v=' + new Date().getTime() + '&currentPositionLat=' + currentPosition.lat + '&currentPositionLng=' + currentPosition.lng + '&distance=' + distance;
                }

            }
        });
    });

    function markerFn(target) {
        console.log('****---');
        console.log(target);
        console.log('******');
        var target = target;
        longitude = target.longitude,
            latitude = target.latitude,
            isSzOperatingUnit = target.isSzOperatingUnit,
            siteType = target.siteType,
            isCollect = target.isCollect,
            siteName = target.siteName,
            siteImg = target.img,
            isForeignOpen = target.isForeignOpen * 1,
            address = target.address,
            distance = target.distance,
            price = target.price,
            siteCode = target.siteCode,
            chargePrice = target.servicePrice + '元/kWh',
            servicePrice = target.servicePrice + '元/kWh',
            parkingRate = target.parkingRate=== '无'? '无': (target.parkingRate + '元/kWh')
            chargingPileNum = target.chargingPileNum,
            _point = new BMap.Point(longitude, latitude);
        jQ('.search-result-list-item-name').attr('data-latitude', latitude).attr('data-longitude', longitude).attr('data-img', siteImg).attr('data-sitecode', siteCode).attr('data-isForeignOpen', isForeignOpen);
        jQ('.search-result-list-item-name i').html(siteName);
        $('.df b').text(chargePrice);
        $('.fwf b').text(servicePrice);
        $('.tcf b').text(parkingRate);

        if (isForeignOpen == 0) {
            jQ('.search-result-foreignOpen').text('(本站点暂不对外开放)');
            jQ('.search-result-foreignOpen').show();
            jQ('.search-result-list-item-free, .search-result-list-item-price, .df, .fwf, .tcf').hide();
        } else {
            jQ('.search-result-foreignOpen').hide();
            jQ('.search-result-list-item-free, .search-result-list-item-price, .df, .fwf, .tcf').show();
            jQ('.search-result-list-item-free').text(chargingPileNum);
            jQ('.search-result-list-item-price').text(price + '元/kWh');
        }

        jQ('.search-result-list-item-address').text(address);
        jQ('.search-result-list-item-distance i').text((distance * 1 / 1000).toFixed(2) + 'km');
        if (isCollect === '1') {
            jQ('.add-fav').addClass('faved');
        }
        if (isCollect === '2') {
            jQ('.add-fav').removeClass('faved');
        }

        jQ('.search-result-panel-title').hide();
        jQ('.search-result-list-item').show();
        jQ('.search-result-list-box').hide();
        jQ('#search-result-panel').show();


    }

    jQ('.stake-list').delegate('dl', 'click', function () {


        var self = jQ(this),
            longitude = self.attr('data-longitude'),
            latitude = self.attr('data-latitude'),
            isSzOperatingUnit = self.attr('data-isSzOperatingUnit'),
            siteType = self.attr('data-siteType'),
            siteImg = self.attr('data-img'),
            siteName = self.attr('data-siteName'),
            address = self.attr('data-address'),
            distance = self.attr('data-distance'),
            price = self.attr('data-price'),
            siteCode = self.attr('id'),
            workingState = self.attr('data-workingState'),
            isCollect = self.attr('data-collect');

        chargingPileNum = self.attr('data-chargingPileNum'),
            _point = new BMap.Point(longitude, latitude);

        // if (typeof map.clearOverlays !== 'undefined') {
        //     map.clearOverlays();
        // }

        map.centerAndZoom(_point, 15); // 第二个参数为级别，数字越大，聚焦越清晰
        setTimeout(function () {
            map.panTo(_point);
        }, 2000);


        var target = JSON.parse(self.attr('data-target'));
        var _p = new BMap.Point(longitude, latitude);

        var args = {
            isSzOperatingUnit: isSzOperatingUnit,
            siteType: siteType,
            chargingPileNum: chargingPileNum,
            point: _p,
            target: target
        };
        // addMarker(args);

        //map.panTo(_point, 22);

        jQ('.search-result-list-item-name').attr('data-latitude', latitude).attr('data-longitude', longitude).attr('data-img', siteImg).attr('data-sitecode', siteCode);
        jQ('.search-result-list-item-name i').html(siteName);
        if (isForeignOpen == 0) {
            jQ('.search-result-foreignOpen').text('(本站点暂不对外开放)');
            jQ('.search-result-foreignOpen').show();
            jQ('.search-result-list-item-free, .search-result-list-item-price').hide();
        } else {
            jQ('.search-result-foreignOpen').hide();
            jQ('.search-result-list-item-free, .search-result-list-item-price').show();
            jQ('.search-result-list-item-free').text(chargingPileNum);
            jQ('.search-result-list-item-price').text(price + '元/kWh');
        }

        jQ('.search-result-list-item-address').text(address);
        jQ('.search-result-list-item-distance i').text(distance);


        if (isCollect === '1') {
            jQ('.search-result-list-item-params .fav-star').addClass('faved');
        }
        if (isCollect === '1') {
            jQ('.search-result-list-item-params .fav-star').removeClass('faved');
        }
        jQ('.search-result-list-item-params .fav-star').attr('data-collect', isCollect);

        jQ('.search-result-panel-title span').toggleClass('t');
        jQ('.search-result-list-box').toggle();
        jQ('.search-result-list-item').toggle();
    });
    //点击进入预约页面
    jQ('.stake-list').delegate('.orderBtn', 'click', function (e) {
        e.stopPropagation();
        var self = jQ(this), parent = self.parent('dl');
        if (self.hasClass('yes')) {
            var detailsStation = {
                workingTime: parent.attr('data-workingTime'),
                siteName: parent.attr('data-sitename'),
                siteCode: parent.attr('id'),
                img: parent.attr('data-img')

            };
            exports.sessionStorage.setItem('stakeDetails', JSON.stringify(detailsStation));
            exports.location.href = '../order/order.html?v=' + new Date().getTime();
        } else {
            CTP.Tips('不能预约！');
        }
    });

    //清除历史
    jQ('.btn-clear-history').bind('click', function () {
        var session = JSON.parse(exports.sessionStorage.getItem('session'));
        exports.sessionStorage.removeItem(session.user.userId + '_searchHistory');
        jQ('.history-list').html('');
        jQ(this).hide();
    });

    jQ('.stake-map-search-left').bind('click', function () {
        if (CTP.checkLogin()) {
            exports.location.href = '../mine/mine.html?v=' + new Date().getTime();
        } else {
            exports.sessionStorage.setItem('comePage', '../find/findStake.html?v=' + new Date().getTime());
            exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
        }
    });
    //点击收藏

    jQ('.fav-star').bind('click', function () {
        var self = jQ(this),
            paramsFav,
            sitCode = self.parent('p').parent('.search-result-list-item-top').find('.search-result-list-item-name').attr('data-sitecode');

        if (CTP.checkLogin()) {
            var o = JSON.parse(exports.sessionStorage.getItem('session'));
            if (self.hasClass('faved')) {
                paramsFav = {
                    userCode: o.user.userId,
                    siteCode: sitCode,
                    nonce: 'abc',
                    v: '1.0',
                    format: 'json',
                    method: 'station.cancelcollect',
                    locale: 'zh_CN',
                    appKey: o.appKey,
                    sessionId: o.sessionId,
                    timestamp: new Date().getTime(),
                };
            } else {
                paramsFav = {
                    userCode: o.user.userId,
                    siteCode: sitCode,
                    nonce: 'abc',
                    v: '1.0',
                    format: 'json',
                    method: 'station.collect',
                    locale: 'zh_CN',
                    appKey: o.appKey,
                    sessionId: o.sessionId,
                    timestamp: new Date().getTime(),
                };
            }
            CTP.Ajax({
                params: paramsFav,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    if (e.message.indexOf('错') == -1) {
                        self.toggleClass('faved');
                    } else {
                        CTP.Tips(e.subErrors[0].message);
                    }
                    if (!e.state) {
                        console.log(e.message);
                    } else {
                        console.log(e.message);
                    }
                }
            });
        } else {

            exports.sessionStorage.setItem('comePage', '../find/findStake.html?v=' + new Date().getTime());
            exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
        }


    });

    //周边
    jQ('.btn-side').bind('click', function () {
        var siteCode = jQ(this).parent().parent().parent().find('.search-result-list-item-name').attr('data-sitecode');

        exports.sessionStorage.setItem('currentSiteCode', JSON.stringify(siteCode));
        //exports.sessionStorage.setItem('currentPosition', JSON.stringify(currentPosition));
        exports.location.href = '../periphery/periphery.html?v=' + new Date().getTime();
    });
    //导航
    jQ('.btn-navigator').bind('click', function () {
        var self = jQ(this), parent = self.parent().parent(),
            destO = parent.find('.search-result-list-item-name'),
            addressO = parent.find('.search-result-list-item-address'),
            isForeignOpen = destO.attr('data-isForeignOpen') * 1;
        var params = {
            srcLat: currentPosition.lat,
            srcLng: currentPosition.lng,
            dstLat: destO.attr('data-latitude') * 1,
            dstLng: destO.attr('data-longitude') * 1,
            title: '导航'
        }

        console.log(params);
        if (!isForeignOpen) {
            CTP.dialog('提示', '该站点暂未对外开放，是否要开始导航？', function () {
                $('#ctp-dialog').hide();
                $('#ctp-dialog-mask').hide();
            }, function () {
                $('#ctp-dialog').hide();
                $('#ctp-dialog-mask').hide();
                if (window.sessionStorage.getItem('isPLT') == 'WECHAT') {
                    wx.openLocation({
                        latitude: params.dstLat, // 纬度，浮点数，范围为90 ~ -90
                        longitude: params.dstLng, // 经度，浮点数，范围为180 ~ -180。
                        name: destO.text(), // 位置名
                        address: addressO.text(), // 地址详情说明
                        scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                    });
                } else {
                    window.navigation(params);
                }
            }, [{text: '不去了'}, {text: '确定要去'}], false);
        } else {
            if (window.sessionStorage.getItem('isPLT') == 'WECHAT') {
                wx.openLocation({
                    latitude: params.dstLat, // 纬度，浮点数，范围为90 ~ -90
                    longitude: params.dstLng, // 经度，浮点数，范围为180 ~ -180。
                    name: destO.text(), // 位置名
                    address: addressO.text(), // 地址详情说明
                    scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
            } else {
                window.navigation(params);
            }
        }
    });

    //搜索框宽度
    jQ('.stake-map-search-center').width(jQ(window).width() - 125);

    //分享
    jQ('.search-result-share').bind('click', function () {
        jQ('.find-stake-share-panel').show();
    });
    jQ('.find-stake-share-panel-btn').bind('click', function () {
        jQ('.find-stake-share-panel').hide();
    });
    $('.wxhy').bind('click', function () {
        var currentRootIndex = window.location.href.indexOf('msp-charge'),
            currentRoot = window.location.href.substring(0, currentRootIndex);
        var siteCode = $('.search-result-list-item-name').attr('data-sitecode'),
            siteImg = $('.search-result-list-item-name').attr('data-img'),
            siteName = $('.search-result-list-item-name i').html();
        var shareParams = {
            title: siteName,
            href: currentRoot + 'msp-charge/share/station?siteCode=' + siteCode,
            content: siteName,
            type: 1 //1微信好友 2微信朋友圈 3QQ好友
        };
        if (typeof window.share !== 'undefined') {
            window.share(shareParams);
        } else {
            // wx.ready(function () {
            //
            //     wx.onMenuShareAppMessage({
            //         title: '微信好友', // 分享标题
            //         desc: shareParams.content, // 分享描述
            //         link: shareParams.href, // 分享链接
            //         imgUrl: '', // 分享图标
            //         type: '', // 分享类型,music、video或link，不填默认为link
            //         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            //         success: function () {
            //             // 用户确认分享后执行的回调函数
            //             jQ('.find-stake-share-panel').hide();
            //             console.log('fail');
            //
            //         },
            //         cancel: function () {
            //             // 用户取消分享后执行的回调函数
            //             console.log('fail');
            //         }
            //     });
            // });

        }
        jQ('.find-stake-share-panel').hide();
    });

    $('.pyq').bind('click', function () {
        var currentRootIndex = window.location.href.indexOf('msp-charge'),
            currentRoot = window.location.href.substring(0, currentRootIndex);

        var siteCode = $('.search-result-list-item-name').attr('data-sitecode'),
            siteImg = $('.search-result-list-item-name').attr('data-img'),
            siteName = $('.search-result-list-item-name i').html();
        var shareParams = {
            title: siteName,
            href: currentRoot + 'msp-charge/share/station?siteCode=' + siteCode,
            content: siteName,
            type: 2 //1微信好友 2微信朋友圈 3QQ好友
        };
        if (typeof window.share !== 'undefined') {
            window.share(shareParams);
        } else {
            // wx.ready(function () {
            //     wx.onMenuShareTimeline({
            //         title: '朋友圈', // 分享标题
            //         link: shareParams.href, // 分享链接
            //         imgUrl: '', // 分享图标
            //         trigger: function (res) {
            //             console.log('用户点击分享到朋友圈');
            //         },
            //         success: function (res) {
            //             console.log('已分享');
            //         },
            //         cancel: function (res) {
            //             console.log('已取消');
            //         },
            //         fail: function (res) {
            //             console.log('wx.onMenuShareTimeline:fail: '+JSON.stringify(res));
            //         }
            //     });
            // });

        }
        jQ('.find-stake-share-panel').hide();
    });

    $('.qq').bind('click', function () {//QQ
        var currentRootIndex = window.location.href.indexOf('msp-charge'),
            currentRoot = window.location.href.substring(0, currentRootIndex);

        var siteCode = $('.search-result-list-item-name').attr('data-sitecode'),
            siteImg = $('.search-result-list-item-name').attr('data-img'),
            siteName = $('.search-result-list-item-name i').html();
        var shareParams = {
            title: 'qq',
            href: currentRoot + 'msp-charge/share/station?siteCode=' + siteCode,
            content: siteName,
            type: 3 //1微信好友 2微信朋友圈 3QQ好友
        };
        if (typeof window.share !== 'undefined') {
            window.share(shareParams);
        } else {
            // wx.ready(function () {
            //     wx.onMenuShareQQ({
            //         title: shareParams.title, // 分享标题
            //         desc: shareParams.content, // 分享描述
            //         link: shareParams.href, // 分享链接
            //         imgUrl: '', // 分享图标
            //         success: function () {
            //             // 用户确认分享后执行的回调函数
            //             jQ('.find-stake-share-panel').hide();
            //             console.log('qq');
            //         },
            //         cancel: function () {
            //             // 用户取消分享后执行的回调函数
            //             console.log('fail');
            //
            //         }
            //     });
            // });

        }
    });
    //
    $('.search-result-list-item-address').width($(window).width() - 80);
    //地图控件位置
    // $('. BMap_noprint anchorBL').attr('style', 'height: 32px; position: absolute; z-index: 1200; bottom: 57px !important; right: auto; top: auto !important; left: 10px;');
    // $('. BMap_scaleCtrl BMap_noprint anchorBL').attr('style', 'bottom: 18px; right: auto; top: auto; left: 11px !important; width: 70px; position: absolute; z-index: 10;');

})(window, $);