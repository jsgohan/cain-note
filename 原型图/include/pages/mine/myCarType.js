/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    if (CTP.checkLogin()) {
        var user = session.user;
        function getMyCarType() {
            var carTypeParams = {
                userCode: user.userId,
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
                success: function (e) {
                    console.log(e);
                    var myCarType = e.data[0];
                    if (typeof myCarType === 'undefined') {
                        $('.myCarType').hide();
                    } else {
                        $('.myCarType').show();
                        $('.myCarType .brand-img').attr('src', myCarType.vehicleBrandImg);
                        $('.myCarType .brand-name').text(myCarType.vehicleModel);

                        var myCarTypeObj = {
                            id: myCarType.vehicleModelCode,
                            name: myCarType.vehicleModel,
                            img: myCarType.vehicleBrandImg,
                            modelCode: myCarType.vehicleModelCode,
                            brandCode: myCarType.vehicleBrandCode
                        };

                        exports.sessionStorage.setItem('myCarType', JSON.stringify(myCarTypeObj));
                    }
                    exports.sessionStorage.setItem('comePage', '../order/order.html?v=' + new Date().getTime());
                }
            });
        }

        getMyCarType();
    } else {

    }


    $('.change-car-type').bind('click', function () {
        exports.sessionStorage.setItem('comePage', '../mine/myCarType.html?v=' + new Date().getTime());
        exports.location.href = '../find/carType.html?v=' + new Date().getTime();
    });


})(window);