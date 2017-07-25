/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        receiptDetailsData = JSON.parse(exports.sessionStorage.getItem('receiptDetails')),
        selectedOrderToReceipt = JSON.parse(exports.sessionStorage.getItem('selectedOrderToReceipt'));


    var selectedOrderToReceiptChargeElectricityAry = [];
    $.each(selectedOrderToReceipt, function (k, v) {
        selectedOrderToReceiptChargeElectricityAry.push(v.chargeElectricity);

    });

    var totalChargeElectricity = 0;
    $.each(selectedOrderToReceiptChargeElectricityAry, function (k, v) {
        totalChargeElectricity += v * 1;
    });
    $('.receiptEdit-panel-top span').text(totalChargeElectricity);

    if (receiptDetailsData.invoiceType * 1 === 1) {
        $('.special-receipt').hide();
        $('.receiptEdit-panel-receipt-company').css('border-bottom', '0');
    }
    if (receiptDetailsData.invoiceType * 1 === 2) {
        $('.special-receipt').show();
        $('.receiptEdit-panel-receipt-company').css('border-bottom', '1px solid #e5e5e5');
        $('.receiptEdit-panel--receipt-invoiceCode input').val(receiptDetailsData.invoiceCode);
        $('.receiptEdit-panel-receipt-address input').val(receiptDetailsData.address);
        $('.receiptEdit-panel-receipt-phone input').val(receiptDetailsData.phone);
        $('.receiptEdit-panel-receipt-bank input').val(receiptDetailsData.bank);
        $('.receiptEdit-panel-receipt-bankAccount input').val(receiptDetailsData.bankAccount);
    }

    for (var i in receiptDetailsData) {
        if (i === 'invoiceCode') {
            var invoiceType = ['增值税普通发票', '增值税专用发票'];
            $('.receiptEdit-panel-information').attr('data-code', receiptDetailsData.invoiceCode);
            $('.receiptEdit-panel-receipt-type .arrow').text(invoiceType[receiptDetailsData.invoiceType - 1]);
            $('.receiptEdit-panel-receipt-type .arrow').attr('id', receiptDetailsData.invoiceType);
        } else {
            $('p.receiptEdit-panel-receipt-' + i).find('input').val(receiptDetailsData[i]);

        }
    }

    var selectedOrderToReceiptOrderCodeAry = [], selectedOrderToReceiptChargeElectricityAry = [];
    $.each(selectedOrderToReceipt, function (k, v) {
        selectedOrderToReceiptOrderCodeAry.push(v.orderCode);
        selectedOrderToReceiptChargeElectricityAry.push(v.chargeElectricity);

    });


    $('.receiptEdit-panel-btn').bind('click', function () {
        var newReceiptDetailsData = {};
        for (var i in receiptDetailsData) {
            newReceiptDetailsData[i] = $('p.receiptEdit-panel-receipt-' + i).find('input').val();
        }

        var receiptType = $('.receiptEdit-panel-receipt-type .arrow').attr('id'),
            paramsReceipt;
        if (receiptType === '1') {//普通发票
            paramsReceipt = {
                userCode: session.user.userId,
                orders: selectedOrderToReceiptOrderCodeAry.join(','),
                invoiceCode: $('.receiptEdit-panel-information').attr('data-code'),
                mailAddressCode: $('.receiptEdit-panel-address').attr('data-code'),
                invoiceType: receiptType,
                company: $('.receiptEdit-panel-receipt-company input').val(),

                chargeAmount: totalChargeElectricity,
                recipient: $('.receiptEdit-panel-address-recipient input').val(),
                phone: $('.receiptEdit-panel-address-phone input').val(),
                province: $('.receiptEdit-panel-address-province input').val(),
                city: $('.receiptEdit-panel-receipt-city input').val(),
                area: $('.receiptEdit-panel-receipt-area input').val(),
                address: $('.receiptEdit-panel-address-address input').val(),

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'invoice.submit',
                locale: 'zh_CN',
                appKey: '00014b81addb04bf',
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
        }
        if (receiptType === '2') {//专用发票
            paramsReceipt = {
                userCode: session.user.userId,
                orders: selectedOrderToReceiptOrderCodeAry.join(','),
                invoiceCode: $('.receiptEdit-panel-information').attr('data-code'),
                mailAddressCode: $('.receiptEdit-panel-address').attr('data-code'),
                invoiceType: receiptType,
                company: $('.receiptEdit-panel-receipt-company input').val(),
                taxpayer: $('.receiptEdit-panel-receipt-taxpayer input').val(),
                companyAddress: $('.receiptEdit-panel-receipt-address input').val(),
                companyPhone: $('.receiptEdit-panel-receipt-phone input').val(),
                bank: $('.receiptEdit-panel-receipt-bank input').val(),
                bankAccount: $('.receiptEdit-panel-receipt-bankAccount input').val(),

                chargeAmount: totalChargeElectricity,
                recipient: $('.receiptEdit-panel-address-recipient input').val(),
                phone: $('.receiptEdit-panel-address-phone input').val(),
                province: $('.receiptEdit-panel-address-province input').val(),
                city: $('.receiptEdit-panel-receipt-city input').val(),
                area: $('.receiptEdit-panel-receipt-area input').val(),
                address: $('.receiptEdit-panel-address-address input').val(),

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'invoice.submit',
                locale: 'zh_CN',
                appKey: '00014b81addb04bf',
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
        }
        CTP.Ajax({
            params: paramsReceipt,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state === 0) {
                    exports.sessionStorage.setItem('addressDetails', JSON.stringify(newReceiptDetailsData));
                    exports.location.href = './addressTmpList.html?v=' + new Date().getTime();
                }
            }
        });

    });


    //选择发票类型
    function btnPanel(data) {
        var _data = data || {
                title: '请选择你要申请的发票类型',
                content: [
                    {text: '增值税专用发票', id: 1},
                    {text: '增值税普通发票', id: 2}
                ]
            };

        var btnGroupStr = '';
        $.each(_data.content, function (k, v) {
            var selected = _data.selected === v.id ? 'btnGroup-selected' : '';
            var item = '<p class="' + selected + '" id="' + v.id + '">' + v.text + '</p>';
            btnGroupStr += item;
        });
        if ($('#ctp-btnPanel').length) {
            $('#ctp-btnPanel').find('.ctp-btnPanel-title').html(_data.title);
            $('#ctp-btnPanel').find('.btnGroup').html(btnGroupStr);
            $('#ctp-btnPanel').show();
            $('#ctp-btnPanel-mask').show();
        } else {
            var btnPanel = '<div id="ctp-btnPanel"><h2 class="ctp-btnPanel-title">' + _data.title + '</h2><div class="btnGroup">';
            btnPanel += btnGroupStr;
            btnPanel += '</div></div><div id="ctp-btnPanel-mask"></div>';
            $('body').append(btnPanel);
        }

    }

    CTP.btnPanel = btnPanel;


    $('body').delegate('#ctp-btnPanel p', 'click', function () {
        var self = $(this),
            _id = self.attr('id'),
            _text = self.text();
        if (_id === '1') {
            $('.special-receipt').hide().find('input').val('');
            ;
            $('.receiptEdit-panel-receipt-company').css('border-bottom', '0');
        }
        if (_id === '2') {
            $('.special-receipt').show().find('input').val('');
            $('.receiptEdit-panel-receipt-company').css('border-bottom', '1px solid #e5e5e5');
        }
        $('.receiptEdit-panel-receipt-type .arrow').attr('id', _id).text(_text);
        $('#ctp-btnPanel').hide();
        $('#ctp-btnPanel-mask').hide();
    });


    //删除发票信息
    $('#receiptEdit-panel-delete').bind('click', function () {
        var paramsDelete = {
            userCode: session.user.userId,
            invoiceCode: receiptDetailsData['invoiceCode'],

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'invoice.del',
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
                    exports.location.href = './receiptTmpList.html?v=' + new Date().getTime();
                }
            }
        });
    });


    //选择发票种类
    $('.receiptEdit-panel-receipt-type .arrow').bind('click', function () {
        var self = $(this),
            _id = self.attr('id') * 1,
            _text = self.text(),
            _data = {
                title: '请选择你要申请的发票类型',
                selected: _id,
                content: [
                    {text: '增值税普通发票', id: 1},
                    {text: '增值税专用发票', id: 2}
                ]
            };

        CTP.btnPanel(_data);

    });

})(window);
