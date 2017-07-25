/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var receiptOrders = JSON.parse(exports.sessionStorage.getItem('receiptOrders')),
        session = JSON.parse(exports.sessionStorage.getItem('session')),
        selectedOrderToReceipt = JSON.parse(exports.sessionStorage.getItem('selectedOrderToReceipt')),
        selectedReceiptItem = JSON.parse(exports.sessionStorage.getItem('selectedReceiptItem')),
        selectedAddressItem = JSON.parse(exports.sessionStorage.getItem('selectedAddressItem'));


    var selectedOrderToReceiptOrderCodeAry = [], selectedOrderToReceiptChargeElectricityAry = [];
    $.each(selectedOrderToReceipt, function (k, v) {
        selectedOrderToReceiptOrderCodeAry.push(v.orderCode);
        selectedOrderToReceiptChargeElectricityAry.push(v.chargeElectricity);

    });

    var totalChargeElectricity = 0;
    $.each(selectedOrderToReceiptChargeElectricityAry, function (k, v) {
        totalChargeElectricity += v * 1;
    });
    $('.receiptEdit-panel-top span').text(totalChargeElectricity);


    function initDefaultInfo() {
        var paramsInit = {
            userCode: session.user.userId,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'invoice.info.default',
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
                    var defaultReceipt,
                        defaultAdress;

                    if (selectedReceiptItem !== null) {
                        defaultReceipt = selectedReceiptItem;
                    } else {
                        defaultReceipt = e.data.invoice;
                    }

                    if (selectedAddressItem !== null) {
                        defaultAdress = selectedAddressItem;
                    } else {
                        defaultAdress = e.data.address;
                    }

                    //默认发票信息
                    var invoiceType = ['增值税普通发票', '增值税专用发票'];
                    $('.receiptEdit-panel-information').attr('data-code', defaultReceipt.invoiceCode);
                    $('.receiptEdit-panel-receipt-type .arrow').text(invoiceType[defaultReceipt.invoiceType - 1]);
                    $('.receiptEdit-panel-receipt-type .arrow').attr('id', defaultReceipt.invoiceType);
                    $('.receiptEdit-panel-receipt-company input').val(defaultReceipt.company);
                    if (defaultReceipt.invoiceType * 1 === 1) {
                        $('.special-receipt').hide();
                        $('.receiptEdit-panel-receipt-company').css('border-bottom', '0');
                    }
                    if (defaultReceipt.invoiceType * 1 === 2) {
                        $('.special-receipt').show();
                        $('.receiptEdit-panel-receipt-company').css('border-bottom', '1px solid #e5e5e5');
                        $('.receiptEdit-panel--receipt-invoiceCode input').val(defaultReceipt.invoiceCode);
                        $('.receiptEdit-panel-receipt-address input').val(defaultReceipt.address);
                        $('.receiptEdit-panel-receipt-phone input').val(defaultReceipt.phone);
                        $('.receiptEdit-panel-receipt-bank input').val(defaultReceipt.bank);
                        $('.receiptEdit-panel-receipt-bankAccount input').val(defaultReceipt.bankAccount);
                    }


                    //默认地址
                    $('.receiptEdit-panel-address').attr('data-code', defaultAdress.mailAddressCode);
                    $('.receiptEdit-panel-address-recipient input').val(defaultAdress.recipient);
                    $('.receiptEdit-panel-address-phone input').val(defaultAdress.phone);
                    $('.receiptEdit-panel-address-province input').val(defaultAdress.province);
                    $('.receiptEdit-panel-address-address input').val(defaultAdress.address);


                }
            }
        });
    }

    initDefaultInfo();

    //导入发票信息
    $('.receiptEdit-panel-information .title').bind('click', function () {
        var self = $(this);
        var defaultReceiptCode = self.parent('div').attr('data-code');
        exports.sessionStorage.setItem('defaultReceiptCode', defaultReceiptCode);
        exports.location.href = './receiptTmpList.html?v=' + new Date().getTime();

    });
    //导入收件地址
    $('.receiptEdit-panel-address .title').bind('click', function () {
        var self = $(this);
        var defaultAddressCode = self.parent('div').attr('data-code');
        exports.sessionStorage.setItem('defaultAddressCode', defaultAddressCode);
        exports.location.href = './addressTmpList.html?v=' + new Date().getTime();
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

    //提交发票
    $('.receiptEdit-panel-btn').bind('click', function () {
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
                    CTP.Tips(e.message);
                    exports.location.href = '../receipt/receiptOrders.html?v=' + new Date().getTime();
                }
            }
        });
    });

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

    //免责声明
    $('.receiptEdit-panel-duty').bind('click', function () {
        exports.location.href = './disclaimer.html?v=' + new Date().getTime()
    });

})(window);