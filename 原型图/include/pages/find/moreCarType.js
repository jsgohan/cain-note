/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    //充电站支持车型
    var stakeAllCarType = JSON.parse(exports.sessionStorage.getItem('stakeAllCarType')),
        stakeDetails = JSON.parse(exports.sessionStorage.getItem('stakeDetails')),
        session = JSON.parse(exports.sessionStorage.getItem('session'));
    //适合我的车型
    function getMyCarType() {
        var paramsMyCarType = {
            userCode: session.user.userId,
            siteCode: stakeDetails.sitCode,
            pageNo: 1,
            pageSize: 20,
            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'car.list',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: paramsMyCarType,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                var data = e.data;
                if (data.length) {
                    var suitMeStr = '';
                    $.each(data, function (k, v) {
                        var __item = '<li class="brand-byd" data-code="' + v.vehicleBrandCode + '"><img src="' + v.vehicleBrandImg + '"/><span>' + v.vehicleModel + '</span></li>';
                        suitMeStr += __item;
                    });
                    $('.suit-me ul').html(suitMeStr);
                }
            }
        });
    }

    getMyCarType();

    //充电站车型
    var otherCarTypeStr = '';
    var codeAry = [], brandAry = [], iconAry = [];

    $.each(stakeAllCarType, function (k, v) {
        codeAry.push(v.vehicleBrandCode);
        brandAry.push(v.vehicleBrand);
        iconAry.push(v.vehicleBrandImg);
    });
    $.unique(codeAry);
    $.unique(brandAry);
    $.unique(iconAry);
    var otherCarTypeStr = '';
    $.each(brandAry, function (k, v) {
        var item = '<li>' +
            '<h2 class="type-list-title">' + v + '</h2>';
        var brandList = '<ul class="brandList">';
        $.each(stakeAllCarType, function (m, n) {
            if (codeAry[k] === n.vehicleBrandCode) {
                var __item = '<li data-img="' + n.vehicleBrandImg + '" class="brand-byd" data-code="' + n.vehicleBrandCode + '"><img src="' + n.vehicleBrandImg + '"/><span>' + n.vehicleModel + '</span></li>';
                brandList += __item;
            }

        });
        item += brandList + '</ul>';
        item + '</li>';
        // var item = '<li data-img="' + iconAry[k] + '" class="brand-byd" data-code="' + codeAry[k] + '"><img src="' + iconAry[k] + '"/>' + v + '</li>';
        otherCarTypeStr += item;
    });
    $('.type-list').html(otherCarTypeStr);

})(window);