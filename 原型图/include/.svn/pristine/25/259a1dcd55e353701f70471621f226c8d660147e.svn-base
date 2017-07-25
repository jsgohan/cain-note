/**
 * Created by zhanghang on 2016/10/9.
 */

if (!CTP) {
    var CTP = {};
}

(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        myCarType = JSON.parse(exports.sessionStorage.getItem('myCarType')),
        weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));

    $('.nickname input').val(weChatAccount.name);

    if ((typeof session.user.account !== 'undefined' || session.user.account === null)) {//如果没有设置了账户
        $('#ctp-user-bind-form .account input').attr("disabled","disabled");
        $('#ctp-user-bind-form .account input').val(session.user.account);
    } else {//如果设置了账户
        $('#ctp-user-bind-form .account input').removeAttr("disabled");
    }
    if (myCarType !== null) {
        $('p.car').attr('data-modelCode', myCarType.modelCode);
        $('p.car').attr('data-brandCode', myCarType.brandCode);
        $('p.car').attr('data-code', myCarType.id);

        $('p.car i').html('<img src="' + myCarType.img + '" style="height: 20px; width: 20px;"/>');
        $('p.car input').val(myCarType.name);
    }


    $('.btn').bind('click', function () {
        var nickname = $('.nickname input').val(),
            account = $('.account input').val(),
            modelCode = $('p.car').attr('data-modelCode'),
            brandCode = $('p.car').attr('data-brandCode');


        var _params = {
            userId: session.user.userId,
            nick: nickname,
            account: account,
            vehicleModelCode: modelCode,
            vehicleBrandCode: brandCode,
            introduction: '',
            bbsCategory: '',

            method: 'user.save',
            sessionId: session.sessionId,
            appKey: '00014b81addb04bf',
            locale: 'zh_CN',
            timestamp: new Date().getTime(),
            format: 'json',
            v: '1.0',
            nonce: 'abc'
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (e) {
                if (typeof e.user !== 'undefined') {
                    exports.location.href = '../mine/mine.html?v=' + new Date().getTime();
                }
                if (typeof e.subErrors !== 'undefined') {
                    CTP.Tips(e.subErrors[0].message);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    });


    //选车型
    $('.car').bind('click', function () {
        var carTypeParams = {
            nonce: 'abc',
            format: 'json',
            v: '1.0',
            method: 'car.all',
            locale: 'zh_CN',
            appKey: '00014b81addb04bf',
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: carTypeParams,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                console.log(e);
                var carData = e.data;
                exports.sessionStorage.setItem('allCarList', JSON.stringify(carData));
                exports.sessionStorage.setItem('comePage', '../register/improveInfo.html?v=' + new Date().getTime());
                exports.location.href = '../find/carType.html?v=' + new Date().getTime();
            }
        });
    });

    //跳过
    $('.doneInfo-cancel').bind('click', function () {
        exports.location.href = '../mine/mine.html?v=' + new Date().getTime();
    });
})(window);