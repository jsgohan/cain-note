/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        defaultReceiptCode = exports.sessionStorage.getItem('defaultReceiptCode');


    function initReceiptList() {
        var receiptListParams = {
            userCode: session.user.userId,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'invoice.list',
            locale: 'zh_CN',
            appKey: '00014b81addb04bf',
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: receiptListParams,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                console.log('ee---', e);
                if (e.state === 0) {
                    exports.sessionStorage.setItem('receiptList', JSON.stringify(e.data));
                    receiptList(e.data);
                }
            }
        });
    }

    initReceiptList();
    function receiptList(data) {
        var receiptListStr = '',
            invoiceTypeAry = ['增值税普通发票', '增值税专用发票'];
        $.each(data, function (k, v) {
            var objStr = JSON.stringify(v);
            var item, invoiceType = v.invoiceType * 1;
            if (invoiceType === 2) {
                item = '<li id="' + v.invoiceCode + '" data-obj=\'' + objStr + '\' class="receipt-type-' + invoiceType + '">' +
                    '<p class="receiptList-type">' + invoiceTypeAry[v.invoiceType - 1] + '</p>' +
                    '<p class="receiptList-company">' + v.company + '</p>' +
                    '<p class="receiptList-taxpayer">' + v.taxpayer + '</p>' +
                    '<p class="receiptList-adress">' + v.companyAddress + '</p>' +
                    '<p class="receiptList-bank">' + v.bank + '(' + v.bankAccount + ')</p>' +
                    '</li>';
            }
            if (invoiceType === 1) {
                item = '<li id="' + v.invoiceCode + '" data-obj=\''  + objStr + '\' class="receipt-type-' + invoiceType + '">' +
                    '<p class="receiptList-type">' + invoiceTypeAry[v.invoiceType - 1] + '</p>' +
                    '<p class="receiptList-company">' + v.company + '</p>' +
                    '</li>';

            }
            receiptListStr += item;
        });
        $('#receiptTmpList-panel ul').html(receiptListStr);
        $('#' + defaultReceiptCode).addClass('selected');
    }


    //转入编辑模式
    $('.receiptTmpList-panel-edit').bind('click', function () {
        var self = $(this), _text = self.find('span').text();
        if (_text === '编辑') {
            self.find('span').text('完成');
            self.find('span').attr('class', 'finish');
            $('#receiptTmpList-panel li').addClass('to-edit');
        }
        if (_text === '完成') {
            self.find('span').text('编辑');
            self.find('span').attr('class', 'edit');
            $('#receiptTmpList-panel li').removeClass('to-edit');
        }
    });

    //选择
    $('#receiptTmpList-panel').delegate('li', 'click', function () {
        var self = $(this),
            selectedReceiptItem = self.attr('data-obj');

        if (!self.hasClass('to-edit')) {//选择
            exports.sessionStorage.setItem('selectedReceiptItem',selectedReceiptItem);
            exports.location.href = './receiptEdit.html?v=' + new Date().getTime();
        } else {//编辑
            var self = $(this),
                id = self.attr('id'),
                data = self.attr('data-obj');
            exports.sessionStorage.setItem('receiptDetails', data);
            exports.sessionStorage.setItem('receiptDetailsId', id);
            exports.location.href = './receiptTmpEdit.html?v=' + new Date().getTime();


        }
    });


})(window);