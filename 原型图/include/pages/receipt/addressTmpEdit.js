/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        addressDetailsData = JSON.parse(exports.sessionStorage.getItem('addressDetails'));

    for (var i in addressDetailsData) {
        $('p.address-details-' + i).find('input').val(addressDetailsData[i]);
    }


    $('.receiptEdit-panel-btn').bind('click', function () {
        var newAddressDetailsData = {};
        for (var i in addressDetailsData) {
            newAddressDetailsData[i] = $('p.address-details-' + i).find('input').val();
        }

        var paramsInit = {
            userCode: session.user.userId,
            mailAddressCode: addressDetailsData['mailAddressCode'],
            recipient: $('p.address-details-recipient').find('input').val(),
            phone:  $('p.address-details-phone').find('input').val(),
            province:  $('p.address-details-province').find('input').val(),
            city:  $('p.address-details-city').find('input').val(),
            area: $('p.address-details-area').find('input').val(),
            address:  $('p.address-details-address').find('input').val(),


            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'invoice.address.upp',
            locale: 'zh_CN',
            appKey: '00014b81addb04bf',
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: paramsInit,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state === 0) {
                    exports.sessionStorage.setItem('addressDetails', JSON.stringify(newAddressDetailsData));

                    exports.location.href = './addressTmpList.html?v=' + new Date().getTime();

                }
            }
        });

    });

    //删除地址
    $('#receiptEdit-panel-delete').bind('click', function () {
        var paramsDelete = {
            userCode: session.user.userId,
            mailAddressCode: addressDetailsData['mailAddressCode'],

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'invoice.address.del',
            locale: 'zh_CN',
            appKey: '00014b81addb04bf',
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: paramsDelete,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state === 0) {
                    exports.location.href = './addressTmpList.html?v=' + new Date().getTime();
                }
            }
        });
    });

})(window);
