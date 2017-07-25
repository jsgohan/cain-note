/**
 * Created by zhanghang on 2016/10/9.
 */

if (!CTP) {
    var CTP = {};
}

(function (exports) {
//转义  元素的innerHTML内容即为转义后的字符
    function htmlEncode(str) {
        var ele = document.createElement('span');
        ele.appendChild(document.createTextNode(str));
        return ele.innerHTML;
    }

//解析
    function htmlDecode(str) {
        var ele = document.createElement('span');
        ele.innerHTML = str;
        return ele.textContent;
    }

    function fD(a, b, c) {
        for (; a > c;)
            a -= c - b;
        for (; a < b;)
            a += c - b;
        return a;
    };
    function jD(a, b, c) {
        b != null && (a = Math.max(a, b));
        c != null && (a = Math.min(a, c));
        return a;
    };
    function yk(a) {
        return Math.PI * a / 180
    };
    function Ce(a, b, c, d) {
        var dO = 6370996.81;
        return dO * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
    };
    function getDistance(a, b) {
        if (!a || !b)
            return 0;
        a.lng = fD(a.lng, -180, 180);
        a.lat = jD(a.lat, -74, 74);
        b.lng = fD(b.lng, -180, 180);
        b.lat = jD(b.lat, -74, 74);
        return Ce(yk(a.lng), yk(b.lng), yk(a.lat), yk(b.lat));
    };

    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));
    var evalPageNo = 1, evalPageSize = 20;
    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        stakeDetails = JSON.parse(exports.sessionStorage.getItem('stakeDetails')),
        imgUrl = stakeDetails.img,
        sitCode = stakeDetails.siteCode,
        workingTime = stakeDetails.workingTime,
        carType = stakeDetails.carType,
        address = stakeDetails.address,
        score = (parseInt(stakeDetails.score)) + (stakeDetails.score - parseInt(stakeDetails.score) > 0 ? 0.5 : 0),
        isPark = stakeDetails.isPark * 1,
        isCollect = stakeDetails.isCollect,
        parkingRate = stakeDetails.parkingRate,
        pileList = stakeDetails.pileList,
        carTypeList = stakeDetails.carTypeList,
        chargingPileNum = stakeDetails.chargingPileNum * 1,
        makeAppointment = stakeDetails.makeAppointment * 1,
        parentCommentId,
        isForeignOpen = stakeDetails.isForeignOpen * 1,

        scoreHtml = '<i></i><i></i><i></i><i></i><i></i><span>' + score + '分</span>',

        workingTime1 = stakeDetails.workingTime.substr(0, stakeDetails.workingTime.indexOf('节假日')),
        workingTime2 = stakeDetails.workingTime.substr(stakeDetails.workingTime.indexOf('节假日'), stakeDetails.workingTime.length),
        workingTimeHtml = '<p class="work-time">' + workingTime1 + '</p><p class="work-time">' + workingTime2 + '</p>';

    function imgError() {
        $.each($('img'), function (k, v) {
            $(v).error(function () {
                $(v).hide();
                if ($(v).parent('div').hasClass('stake-details-icon')) {
                    $(v).attr('src', '../../assets/images/c_default_station.png');
                } else {
                    $(v).attr('src', '../../assets/images/picError.png');
                }
                $(v).show();
            })
        });
    }

    //高度
    var tempH = $(window).height();
    $('.stake-details-main').height(tempH - 186);
    if (isForeignOpen) {
        $('.work-time-container').html(workingTimeHtml);
    } else {
        $('.work-time-container').html('<p style="color: orange; line-height: 30px; font-size: 14px;">本站点暂不对外开放</p>');
    }


    if (makeAppointment == 1) {
        if (chargingPileNum !== 0) {
            $('.stake-details-main-order-btn').removeClass('no');
        } else {
            $('.stake-details-main-order-btn').addClass('no');
        }
    } else {
        $('.stake-details-main-order-btn').addClass('no');
    }
    if ($('.stake-details-main-order-btn').length) {
        $('.stake-details-main').height(tempH - 186);
    }

    document.getElementsByTagName('title')[0].innerHTML = stakeDetails.siteName;
    exports.sessionStorage.setItem('stakeAllCarType', JSON.stringify(carTypeList));

    //支持车的类型
    var carTypeListHtml = '';
    if (carTypeList.length) {
        $.each(carTypeList, function (k, v) {
            if (k < 3) {
                var item = ' <li><img src="' + v.vehicleBrandImg + '"/><span>' + v.vehicleModel + '</span></li>';
                carTypeListHtml += item;
            }
        });
        $('.stake-details-tab-sub-details-carType-list').append(carTypeListHtml);
    }else{
        $('.stake-details-tab-sub-details-carType').hide();
    }
    imgError();
    //收费可以泊车
    if (!isPark) {
        $('.stake-details-tab-sub-details-location .icon').html('');
    } else {
        $('.stake-details-tab-sub-details-location .icon').html('停车费用:' + parkingRate).addClass('selected')
    }
    //充电站图标
    if (imgUrl) {
        $('.stake-details-icon img').attr('src', imgUrl);
    }
    //充电站得分
    $('.stake-details-params .score').html(scoreHtml);
    $('.stake-details-params .score i:lt(' + parseInt(stakeDetails.score) + ')').addClass('selected');
    var isHalf = stakeDetails.score - parseInt(stakeDetails.score) > 0 ? true : false;
    if (isHalf) {
        $('.stake-details-params .score i:eq(' + parseInt(stakeDetails.score) + ')').addClass('halfSelected');
    }


    //充电站地点
    $('.location div').html(address);
    console.log("========123");
    //充电站是否收藏
    if (isCollect === '1') {
        $('.stake-details-top .fav-star').addClass('faved');
    }

    $('.stake-details-top .fav-star').attr('data-fav', isCollect);


    //充电桩
    var pileListHtml = '';
    $.each(pileList, function (k, v) {
        var isAc = v.chargePileType == "2",
            ratedPowerText = v.ratedPower * 1 < 7 ? '慢充' : '快充';
        price = v.price === '0.0' ? "暂无" : v.price + '元/kWh',
            statusAry = ["空闲中", "充电中", "告警", "离线"];

        var chargePileName = v.chargePileName;
        if(chargePileName.length > 12){
            chargePileName = chargePileName.substring(0, 11) +"...";
        }
        var chargePrice = v.chargePrice;
        if(chargePrice == "null"){
            chargePrice = "0.0000";
        }
        var servicePrice = v.servicePrice;
        if(servicePrice == "null"){
            servicePrice = "0.0000";
        }
        var item = '<li>' +
            ' <span class="line status-' + v.workingState + '">' + statusAry[v.workingState * 1 - 1] + '</span>' +
            '<div class="stake-details-tab-sub-details-list-item">' +
            '<p class="title"><span>' + chargePileName + '</span><span class="chargetype-'+(v.ratedPower * 1 < 7 ? 'm' : 'k')+'">[' + (isAc ? "交流" : "直流") + ratedPowerText +'/'+ v.ratedPower +'kW]</span></p>' +
            '<p class="code">编号(CID)：' + v.chargePileCode + '</p>' +
            '<p class="c-s-price">电&nbsp;&nbsp;&nbsp;价：' + chargePrice + '元/kWh</p>' +
            '<p class="c-s-price">服务费：' + servicePrice + '元/kWh</p>' +
            '</div>' +
            '</li>';
        pileListHtml += item;
    });
    $('.stake-details-tab-sub-details-list').html(pileListHtml);
    if (CTP.checkLogin()) {
        var user = session.user;
        var carTypeParams = {
            nonce: 'abc',
            format: 'json',
            v: '1.0',
            method: 'car.all',
            locale: 'zh_CN',
            appKey: session.appKey,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: carTypeParams,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                var carData = e.data;
                exports.sessionStorage.setItem('allCarList', JSON.stringify(carData));
                allCarList = JSON.parse(exports.sessionStorage.getItem('allCarList'));
                function initCarList(_allCarList) {
                    var vehicleModelCodeAry = [], codeAry = [], brandAry = [], iconAry = [];
                    $.each(_allCarList, function (k, v) {
                        vehicleModelCodeAry.push(v.vehicleModelCode);
                        codeAry.push(v.vehicleBrandCode);
                        brandAry.push(v.vehicleBrand);
                        iconAry.push(v.vehicleBrandImg);
                    });
                    $.unique(vehicleModelCodeAry);
                    $.unique(codeAry);
                    $.unique(brandAry);
                    $.unique(iconAry);

                    var allType = '';
                    $.each(brandAry, function (k, v) {
                        var item = '<li data-brandCode="' + v.vehicleBrandCode + '" data-modelCode="' + v.vehicleModelCode + '" data-img="' + iconAry[k] + '" class="brand-byd" data-code="' + codeAry[k] + '"><img src="' + iconAry[k] + '"/>' + v + '</li>';
                        allType += item;
                    });
                    $('.left-type ul').html(allType);

                    $('.left-type').delegate('li', 'click', function (e) {
                        $('.left-type li').removeClass('selected');
                        $(this).addClass('selected');

                        var _html = '', code = $(this).attr('data-code');
                        var _brandItemAry = [];
                        $.each(_allCarList, function (k, v) {
                            if (code === v.vehicleBrandCode) {
                                _brandItemAry.push(v);
                            }
                        });

                        $.each(_brandItemAry, function (k, v) {
                            var item = '<li data-brandCode="' + v.vehicleBrandCode + '" data-modelCode="' + v.vehicleModelCode + '" data-img="' + v.vehicleBrandImg + '" id="' + v.vehicleModelCode + '">' + v.vehicleModel + '</li>';
                            _html += item;
                        });
                        $('.right-type-details').find('ul').html(_html);
                    });
                    //初始化
                    $('.left-type li:first').addClass('selected');
                    var initCode = $('.left-type li.selected').attr('data-code'), initBrandAry = [], initHtml = '';
                    $.each(_allCarList, function (k, v) {
                        if (initCode === v.vehicleBrandCode) {
                            initBrandAry.push(v);
                        }
                    });
                    $.each(initBrandAry, function (k, v) {
                        var item = '<li  data-brandCode="' + v.vehicleBrandCode + '"   data-modelCode="' + v.vehicleModelCode + '" data-img="' + v.vehicleBrandImg + '"  id="' + v.vehicleModelCode + '">' + v.vehicleModel + '</li>';
                        initHtml += item;
                    });
                    $('.right-type-details').find('ul').html(initHtml);


                    //车型选择
                    $('.right-type-details').delegate('li', 'click', function (e) {
                        $('.right-type-details li').removeClass('selected');
                        $(this).addClass('selected');
                    });
                    $('#car-type-btn').bind('click', function () {
                        var _comePage = exports.sessionStorage.getItem('comePage');
                        var selectedCar = {
                            id: $('.right-type-details .selected').attr('id'),
                            name: $('.right-type-details .selected').text(),
                            img: $('.right-type-details .selected').attr('data-img'),
                            modelCode: $('.right-type-details .selected').attr('data-modelCode'),
                            brandCode: $('.right-type-details .selected').attr('data-brandCode')
                        };
                        //如果已登录,写入我的车型session
                        if (typeof user !== 'undefined' && _comePage !== null && _comePage.indexOf('myCarType.html?v=' + new Date().getTime()) > -1 || _comePage.indexOf('/order.html?v=' + new Date().getTime()) > -1 || _comePage.indexOf('/improveInfo.html?v=' + new Date().getTime()) > -1) {
                            var carTypeParams = {
                                userId: user.userId,
                                vehicleModelCode: selectedCar.modelCode,
                                vehicleBrandCode: selectedCar.brandCode,

                                nonce: 'abc',
                                format: 'json',
                                v: '1.0',
                                method: 'user.save',
                                locale: 'zh_CN',
                                appKey: result.appKey,
                                sessionId: result.sessionId,
                                timestamp: new Date().getTime()
                            };
                            CTP.Ajax({
                                params: carTypeParams,
                                url: '/msp-cas/router',
                                type: 'POST',
                                success: function (_r) {
                                    var carData = _r.data;
                                    exports.sessionStorage.setItem('myCarType', JSON.stringify(selectedCar));
                                    exports.history.go(-1);
                                }
                            });
                        } else {
                            exports.sessionStorage.setItem('filterCarType', JSON.stringify(selectedCar));
                            exports.history.go(-1);
                        }

                    });
                    imgError();

                }

                initCarList(allCarList);
            }
        });

    } else {
        var carTypeParams = {
            nonce: 'abc',
            format: 'json',
            v: '1.0',
            method: 'car.all',
            appKey: 's',
            locale: 'zh_CN',
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: carTypeParams,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                console.log(e);
                var carData = e.data;
                var vehicleModelCodeAry = [], codeAry = [], brandAry = [], iconAry = [];

                function initCarList(_allCarList) {
                    $.each(_allCarList, function (k, v) {
                        vehicleModelCodeAry.push(v.vehicleModelCode);
                        codeAry.push(v.vehicleBrandCode);
                        brandAry.push(v.vehicleBrand);
                        iconAry.push(v.vehicleBrandImg);
                    });
                    $.unique(vehicleModelCodeAry);
                    $.unique(codeAry);
                    $.unique(brandAry);
                    $.unique(iconAry);

                    var allType = '';
                    $.each(brandAry, function (k, v) {
                        var item = '<li data-brandCode="' + v.vehicleBrandCode + '" data-modelCode="' + v.vehicleModelCode + '" data-img="' + iconAry[k] + '" class="brand-byd" data-code="' + codeAry[k] + '"><img src="' + iconAry[k] + '"/>' + v + '</li>';
                        allType += item;
                    });
                    $('.left-type ul').html(allType);

                    $('.left-type').delegate('li', 'click', function (e) {
                        $('.left-type li').removeClass('selected');
                        $(this).addClass('selected');

                        var _html = '', code = $(this).attr('data-code');
                        var _brandItemAry = [];
                        $.each(_allCarList, function (k, v) {
                            if (code === v.vehicleBrandCode) {
                                _brandItemAry.push(v);
                            }
                        });

                        $.each(_brandItemAry, function (k, v) {
                            var item = '<li data-brandCode="' + v.vehicleBrandCode + '" data-modelCode="' + v.vehicleModelCode + '" data-img="' + v.vehicleBrandImg + '" id="' + v.vehicleModelCode + '">' + v.vehicleModel + '</li>';
                            _html += item;
                        });
                        $('.right-type-details').find('ul').html(_html);
                    });
                    //初始化
                    $('.left-type li:first').addClass('selected');
                    var initCode = $('.left-type li.selected').attr('data-code'), initBrandAry = [], initHtml = '';
                    $.each(_allCarList, function (k, v) {
                        if (initCode === v.vehicleBrandCode) {
                            initBrandAry.push(v);
                        }
                    });
                    $.each(initBrandAry, function (k, v) {
                        var item = '<li  data-brandCode="' + v.vehicleBrandCode + '"   data-modelCode="' + v.vehicleModelCode + '" data-img="' + v.vehicleBrandImg + '"  id="' + v.vehicleModelCode + '">' + v.vehicleModel + '</li>';
                        initHtml += item;
                    });
                    $('.right-type-details').find('ul').html(initHtml);


                    //车型选择
                    $('.right-type-details').delegate('li', 'click', function (e) {
                        $('.right-type-details li').removeClass('selected');
                        $(this).addClass('selected');
                    });
                    $('#car-type-btn').bind('click', function () {
                        var _comePage = exports.sessionStorage.getItem('comePage');
                        var selectedCar = {
                            id: $('.right-type-details .selected').attr('id'),
                            name: $('.right-type-details .selected').text(),
                            img: $('.right-type-details .selected').attr('data-img'),
                            modelCode: $('.right-type-details .selected').attr('data-modelCode'),
                            brandCode: $('.right-type-details .selected').attr('data-brandCode')
                        };
                        //如果已登录,写入我的车型session
                        if (typeof user !== 'undefined' && _comePage !== null && _comePage.indexOf('myCarType.html?v=' + new Date().getTime()) > -1 || _comePage.indexOf('/order.html?v=' + new Date().getTime()) > -1 || _comePage.indexOf('/improveInfo.html?v=' + new Date().getTime()) > -1) {
                            var carTypeParams = {
                                userId: user.userId,
                                vehicleModelCode: selectedCar.modelCode,
                                vehicleBrandCode: selectedCar.brandCode,

                                nonce: 'abc',
                                format: 'json',
                                v: '1.0',
                                method: 'user.save',
                                locale: 'zh_CN',
                                appKey: result.appKey,
                                sessionId: result.sessionId,
                                timestamp: new Date().getTime()
                            };
                            CTP.Ajax({
                                params: carTypeParams,
                                url: '/msp-cas/router',
                                type: 'POST',
                                success: function (_r) {
                                    var carData = _r.data;
                                    exports.sessionStorage.setItem('myCarType', JSON.stringify(selectedCar));
                                    exports.history.go(-1);
                                }
                            });
                        } else {
                            exports.sessionStorage.setItem('filterCarType', JSON.stringify(selectedCar));
                            exports.history.go(-1);
                        }

                    });
                    imgError();
                }

                initCarList(carData);
            }
        });
    }


    //评论列表
    function getCommentList(type) {

        CTP.Tips('加载中...', false);
        var userCode = session === null ? '' : session.user.userId,
            appKey = session === null ? '' : session.appKey,
            sessionId = session === null ? '' : session.sessionId;

        var paramsEvaluation = {
            userCode: userCode,
            siteCode: sitCode,
            pageNo: evalPageNo,
            pageSize: evalPageSize,
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'station.evaluation',
            locale: 'zh_CN',
            appKey: appKey,
            sessionId: sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: paramsEvaluation,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                CTP.Tips('加载完毕');
                var data = e.data, _html = '';

                function initData(data) {//初始化数据
                    $.each(data, function (k, v) {
                        var isGooded = v.isThumbUp === 2 ? 'gooded' : '';//2已点赞
                        var tempImg = '../../assets/images/c_default_avatar.png';
                        var avatar = v.avatar === null || v.avatar === '' ? tempImg : v.avatar;
                        var labels = '';
                        if (v.labelList && v.labelList.length) {
                            $.each(v.labelList, function (k, v) {
                                labels += '<b class="stations-lable labelCode' + v.labelCode + '">' + v.labelName + '</b>';
                            });
                        }
                        var item = '<li id="' + v.commentId + '">' +
                            '<p class="user"><span class="comment-num">' + v.commentList.length + '</span><span class="good-num ' + isGooded + '">' + v.thumbUpNum + '</span><img src="' + avatar + '" class="icon"/><span class="user-name">' + v.userName + '</span></p>' +
                            '<p class="score score-' + v.score + '"><span>评分：</span><i></i><i></i><i></i><i></i><i></i></p>' +
                            '<p class="labels-p">' + labels + '</p>' +
                            '<p class="comment-list-content">' + htmlEncode(v.comment) + '</p>';
                        var commentData = v.commentList, commentList = '';
                        $.each(commentData, function (m, n) {
                            var commentItem = '<div class="comment-list-reply-list">' +
                                '<div class="comment-list-reply-item">' + n.userName + '&nbsp;&nbsp;回复：<span>' + htmlEncode(n.content) + '</span>' +
                                '</div></div>';
                            console.log('n.content---', n.content);
                            commentList += commentItem;

                        });

                        item += commentList + '</li>';

                        _html += item;
                    });
                    return _html;

                }

                if (type === 'append') { //如果是加载历史数据
                    _html = initData(data);
                    $('.comment-list').append(_html);
                    if (data.length < evalPageSize) {
                        $('.add-more').addClass('noMorePage').text('没有更多数据了!');

                    } else {
                        $('.add-more').removeClass('noMorePage').text('加载更多');
                    }
                } else { //如果是初始化数据
                    if (data.length) {
                        if (data.length < evalPageSize) {
                            $('.add-more').addClass('noMorePage').text('没有更多数据了!');
                        } else {
                            $('.add-more').removeClass('noMorePage').text('加载更多');
                        }
                        _html = initData(data);


                    } else {
                        $('.stake-details-tab-sub-comment').addClass('comment-no-data');

                    }
                    $('.comment-list').html(_html);
                    $('.comment-list li').eq(0).css({"border-top": '1px solid #e5e5e5'});
                }


                $('.stake-details-tab-sub-container ._sub:eq(1)').show();
                //评论得分
                var liScore = $('.comment-list').find('li');
                $.each(liScore, function (k, v) {
                    var _cls = $(v).find('.score').attr('class'),
                        _num = _cls.substring(12, _cls.length);
                    $(v).find('.score').find('i:lt(' + _num + ')').addClass('selected');
                });

            }
        });
    }

    $('.stake-details-tab').delegate('li', 'click', function () {
        var _index = $(this).index();
        $('.stake-details-tab li').removeClass('selected');
        $(this).addClass('selected');
        $('.stake-details-tab-sub-container ._sub').hide();
        if (_index == 1) {
            evalPageNo = 1;
            evalPageSize = 20;
            getCommentList();
        } else {
            $('.stake-details-tab-sub-container ._sub:eq(' + _index + ')').show();
        }
    })


    //点击进入车型选择
    $('.stake-details-tab-sub-details-carType span').bind('click', function () {
        if (carTypeList.length) {
            exports.location.href = 'moreCarType.html?v=' + new Date().getTime()
        } else {
            CTP.Tips('没有更多车型供选择~');
        }
    });

    //点击收藏
    $('.fav-star').bind('click', function () {

        var self = $(this), paramsFav,
            isFav = self.attr('data-fav');

        if (CTP.checkLogin()) {
            var userCode = session.user.userId,
                appKey = session.appKey,
                sessionId = session.sessionId;
            if (isFav == '1') {
                paramsFav = {
                    userCode: userCode,
                    siteCode: sitCode,
                    nonce: 'abc',
                    v: '1.0',
                    format: 'json',
                    method: 'station.cancelcollect',
                    locale: 'zh_CN',
                    appKey: appKey,
                    sessionId: sessionId,
                    timestamp: new Date().getTime()
                };
            }
            if (isFav == '2') {
                paramsFav = {
                    userCode: userCode,
                    siteCode: sitCode,
                    nonce: 'abc',
                    v: '1.0',
                    format: 'json',
                    method: 'station.collect',
                    locale: 'zh_CN',
                    appKey: appKey,
                    sessionId: sessionId,
                    timestamp: new Date().getTime()
                };

            }
            console.log('paramsFav--', paramsFav);
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
            $('#ctp-user-bind-form-container').show();
        }

    });

    //点赞
    $('.comment-list ').delegate('li .good-num', 'click', function () {
        var self = $(this),
            num = self.text() * 1,
            commentId = self.parent('p').parent('li').attr('id'),
            isThumbUp,
            paramsGood;

        if (CTP.checkLogin()) {
            if (self.hasClass('gooded')) {
                isThumbUp = 2;//取消点赞
            } else {
                isThumbUp = 1;//点赞
            }
            paramsGood = {
                userCode: session.user.userId,
                commentId: commentId,
                isThumbUp: isThumbUp,
                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'station.evaluation.like',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime(),
            };
            CTP.Ajax({
                params: paramsGood,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    if (e.state === 0) {
                        if (isThumbUp == 2) {
                            self.text(num - 1);
                            self.removeClass('gooded');
                        }
                        if (isThumbUp == 1) {
                            self.text(num + 1);
                            self.addClass('gooded');
                        }
                    }

                }
            });
        } else {
            $('#ctp-user-bind-form-container').show();

        }


    });
    console.log(exports.location);
    //点击预约
    $('.stake-details-main-order-btn').bind('click', function () {
        var self = $(this);
        if (!self.hasClass('no')) {
            if (CTP.checkLogin()) {
                exports.location.href = '../order/order.html?v=' + new Date().getTime() + '&distance=' + CTP.getUrlParam('distance');

            } else {
                exports.sessionStorage.setItem('comePage', '../order/order.html?v=' + new Date().getTime());
                //exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
                $('#ctp-user-bind-form-container').show();
            }

        }

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
                //exports.location.href = '../order/order.html?v=' + new Date().getTime();
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

    //评论
    $('.comment-list').delegate('li .comment-num', 'click', function () {
        parentCommentId = $(this).parent('p').parent('li').attr('id');
        if (CTP.checkLogin()) {
            CTP.initEditBox('');
        } else {
            $('#ctp-user-bind-form-container').show();
        }


    });

    //取消
    $('#webapp').delegate('.ctp-edit-btn-cancel', 'click', function () {
        CTP.initEditBox('', false);
    });
    //提交
    $('#webapp').delegate('.ctp-edit-btn-submit', 'click', function () {

        var _params = {
            userCode: session.user.userId,
            siteCode: sitCode,
            parentCommentId: parentCommentId,
            content: $('.textarea-box textarea').val(),
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'station.submitcomment',
            locale: 'zh_CN',
            appKey: session.appKey,
            timestamp: new Date().getTime(),
            sessionId: session.sessionId
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                console.log('提交', e);
                if (e.state == '0') {
                    CTP.initEditBox('', false);
                    getCommentList();
                }
            },
            error: function (e) {

            }
        });
    });

    //加载更多数据
    var flg = true;
    $('.stake-details-tab-sub-comment').delegate('.add-more', 'click', function () {
        if (!$(this).hasClass('noMorePage') & $(this).prev('ul').find('li').length > 0) {
            if (flg) {
                evalPageNo++;
                $(this).text('加载中...');
                getCommentList('append');
                flg = false;
                setTimeout(function () {
                    flg = true;
                }, 500)
            }
        }

    });
    //导航
    $('.stake-details-tab-sub-details-location .location').bind('click', function () {
        var currentStationDetails = JSON.parse(exports.sessionStorage.getItem('stakeDetails'));
        var params = {
            srcLat: CTP.getUrlParam('currentPositionLat') * 1,
            srcLng: CTP.getUrlParam('currentPositionLng') * 1,
            dstLat: currentStationDetails.latitude * 1,
            dstLng: currentStationDetails.longitude * 1,
            title: '导航'
        };
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
                        name: currentStationDetails.siteName, // 位置名
                        address: currentStationDetails.address, // 地址详情说明
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
                    name: currentStationDetails.siteName, // 位置名
                    address: currentStationDetails.address, // 地址详情说明
                    scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
            } else {
                window.navigation(params);
            }
        }

    });

    var currentStationDTemp = JSON.parse(exports.sessionStorage.getItem('stakeDetails'));

    //手动计算两地距离
    // var getDis = CTP.getUrlParam('distance') || (getDistance({
    //     lng: CTP.getUrlParam('currentPositionLng') * 1,
    //     lat: CTP.getUrlParam('currentPositionLat') * 1
    // }, {lng: currentStationDTemp.longitude * 1, lat: currentStationDTemp.latitude * 1}) / 1000/1000).toFixed(2) + 'km' ;
    var getDis = CTP.getUrlParam('distance') || (getDistance({
            lng: CTP.getUrlParam('currentPositionLng') * 1,
            lat: CTP.getUrlParam('currentPositionLat') * 1
        }, {
            lng: currentStationDTemp.longitude * 1,
            lat: currentStationDTemp.latitude * 1
        }) / 1000 / 1000).toFixed(2) + 'km';
    $('.stake-details-tab-sub-details-location .location span').text(getDis)


})(window);