/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var codeAry = [], brandAry = [], iconAry = [], vehicleModelCodeAry = [];
    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    if (CTP.checkLogin()) {
        var user = session.user;
        var carTypeParams = {
            nonce: 'abc',
            format: 'json',
            v: '1.0',
            method: 'car.all',
            locale: 'zh_CN',
            appKey: session.appKey,
            session: session.sessionId,
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
                        var vehicleBrandImg = '';
                        if(v.vehicleBrandImg){
                            vehicleBrandImg = v.vehicleBrandImg.substring(0, v.vehicleBrandImg.length - 1);
                        }
                        vehicleModelCodeAry.push(v.vehicleModelCode);
                        codeAry.push(v.vehicleBrandCode);
                        brandAry.push(v.vehicleBrand);

                        iconAry.push(vehicleBrandImg);
                    });

                    $.unique(vehicleModelCodeAry);
                    $.unique(codeAry);
                    $.unique(brandAry);
                    $.unique(iconAry);

                    var allType = '';
                    $.each(brandAry, function (k, v) {
                        var item = '<li data-brandCode="' + codeAry[k] + '" data-modelCode="' + vehicleModelCodeAry[k] + '" data-img="' + iconAry[k] + '" class="brand-byd" data-code="' + codeAry[k] + '"><img src="' + iconAry[k] + '"/>' + v + '</li>';
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
                        if (typeof user !== 'undefined' && _comePage !== null && (_comePage.indexOf('myCarType.html') > -1 || _comePage.indexOf('order.html') > -1 || _comePage.indexOf('improveInfo.html') > -1)) {
                            var carTypeParams = {
                                userId: session.user.userId,
                                vehicleModelCode: selectedCar.modelCode,
                                vehicleBrandCode: selectedCar.brandCode,

                                nonce: 'abc',
                                format: 'json',
                                v: '1.0',
                                method: 'user.save',
                                locale: 'zh_CN',
                                appKey: session.appKey,
                                sessionId: session.sessionId,
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
                            exports.sessionStorage.setItem('filterCarTypeFlag', true);
                            exports.sessionStorage.setItem('filterCarType', JSON.stringify(selectedCar));
                            exports.history.go(-1);
                        }

                    });

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
                var carData = e.data;

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
                        if (typeof user !== 'undefined' && _comePage !== null && (_comePage.indexOf('/myCarType.html') > -1 || _comePage.indexOf('/order.html') > -1 || _comePage.indexOf('/improveInfo.html') > -1)) {
                            alert('我的车型');
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
                            alert('选择车型');
                            exports.sessionStorage.setItem('filterCarType', JSON.stringify(selectedCar));
                            exports.history.go(-1);
                        }

                    });

                }

                initCarList(carData);
            }
        });
    }


})(window);