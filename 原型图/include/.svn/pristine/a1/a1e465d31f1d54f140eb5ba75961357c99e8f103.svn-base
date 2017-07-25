/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        defaultAddressCode =  exports.sessionStorage.getItem('defaultAddressCode');


    function addressList(data) {

        var addressListStr = '';
        $.each(data, function (k, v) {
            var objStr = JSON.stringify(v);
            var item = '<li id="' + v.mailAddressCode +'" data-obj=\'' + objStr +'\'>' +
                '<p class="addressList-title">' + v.recipient + '</p>' +
                '<p class="addressList-address">' + v.address + '</p>' +
                '</li>';
            addressListStr += item;
        });
        $('#addressList-panel ul').html(addressListStr);
        $('#' + defaultAddressCode).addClass('selected');
    }

    function initAddressList () {
        var addressListParams = {
            userCode: session.user.userId,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'invoice.address.list',
            locale: 'zh_CN',
            appKey: '00014b81addb04bf',
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: addressListParams,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                console.log('ee---', e);
                if (e.state === 0) {
                    exports.sessionStorage.setItem('addressList', JSON.stringify(e.data));
                    addressList(e.data);
                }
            }
        });
    }

    initAddressList();




    //转入编辑模式
    $('.addressList-panel-edit').bind('click', function () {
        var self = $(this), _text = self.find('span').text();
        if (_text === '编辑') {
            self.find('span').text('完成');
            self.find('span').attr('class', 'finish');
            $('#addressList-panel li').addClass('to-edit');
        }
        if (_text === '完成') {
            self.find('span').text('编辑');
            self.find('span').attr('class', 'edit');
            $('#addressList-panel li').removeClass('to-edit');
        }
    });

    var editedAddress = JSON.parse(exports.sessionStorage.getItem('addressDetails'));
    var selectLi = exports.sessionStorage.getItem('addressDetailsId');
    $('#' + selectLi).find('.addressList-title').text(editedAddress.recipient);
    $('#' + selectLi).find('.addressList-address').text(editedAddress.address);

    //点击单个地址
    $('#addressList-panel').delegate('li', 'click', function () {
        var self = $(this),
            selectedAddressItem = self.attr('data-obj');
        if (!self.hasClass('to-edit')) {//选择
            exports.sessionStorage.setItem('selectedAddressItem',selectedAddressItem);
            exports.location.href = './receiptEdit.html?v=' + new Date().getTime();
        } else {//编辑
            var self = $(this),
                id = self.attr('id'),
                data = self.attr('data-obj');
            exports.sessionStorage.setItem('addressDetails', data);
            exports.sessionStorage.setItem('addressDetailsId', id);
            exports.location.href = './addressTmpEdit.html?v=' + new Date().getTime();

        }
    });


})(window);