/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var receiptOrders = JSON.parse(exports.sessionStorage.getItem('receiptOrders')),
        session = JSON.parse(exports.sessionStorage.getItem('session'));


    //订单列表
    function initReceiptOrders(data) {
        var receiptOrdersStr = '';

        $.each(data, function (k, v) {
            var _title = '<li class="receiptOrdersItem" style="height: auto;"><h2 class="receiptOrders-title"><span class="to-select"></span>' + v.month + '</h2>',
                itemAry = v.list,
                items = '';
            $.each(itemAry, function (m, n) {
                var chargeElectricity = n.chargeElectricity === null ? '暂无' : ('<i>' + n.chargeElectricity + '</i>元');
                var item = '<div style="height: auto;" data-site="' + n.siteCode + '" id="' + n.orderCode + '">' +
                    '<p class="order-list-item-title"><span></span>' + n.siteName + '</p>' +
                    '<p class="order-list-item-mark">' +
                    '<span class="charging-time">' + n.chargeTime + '</span>' +
                    '<span class="charging-quality">' + n.chargeQuantity + '</span>' +
                    '<span class="charging-electricity">' + chargeElectricity + '</span>' +
                    '<span class="to-select"></span>' +
                    '</p>' +
                    '</div>';
                items += item;
            });
            _title += items;
            receiptOrdersStr += _title + '</li>';

        });
        $('.receiptOrdersList ul').html(receiptOrdersStr);
    }

    initReceiptOrders(receiptOrders);

    //发票记录
    function initReceiptHistory(data) {
        var initReceiptHistoryStr = '';
        $.each(data, function (k, v) {
            var invoiceType = v.invoiceType === '1' ? 'normal' : 'special',
                invoiceStatusAry = ['未提交', '被退回', '出票中', '已出票'];
            var item = '<li id="' + v.invoiceCode + '" class="initReceipt-' + invoiceType + '"><p class="title"><span class="initReceipt-status">' + invoiceStatusAry[v.invoiceStatus] + '</span>' + v.company + '</p>' +
                '<p class="money">' + v.money + '元</p>' +
                '</li>';
            initReceiptHistoryStr += item;
        });

        $('.receiptHistory ul').html(initReceiptHistoryStr);

    }

    $('.receiptOrders-tab').delegate('li', 'click', function () {
        var _index = $(this).index();
        $('.receiptOrders-tab li').removeClass('selected');
        $(this).addClass('selected');
        $('.receiptOrders-tab-sub-container ._sub').hide();
        if (_index == 1) {
            var paramsReceiptList = {
                userCode: session.user.userId,

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'invoice.history',
                locale: 'zh_CN',
                appKey: '00014b81addb04bf',
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: paramsReceiptList,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    if (e.state === 0) {
                        initReceiptHistory(e.data);
                        $('.receiptOrders-tab-sub-container ._sub:eq(' + _index + ')').show();
                    }
                }
            });
        } else {
            var paramsReceiptList = {
                userCode: session.user.userId,

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'invoice.orders',
                locale: 'zh_CN',
                appKey: '00014b81addb04bf',
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: paramsReceiptList,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    if (e.state === 0) {
                        initReceiptOrders(e.data);
                        exports.sessionStorage.setItem('receiptOrders', JSON.stringify(e.data));
                        $('.receiptOrders-tab-sub-container ._sub:eq(' + _index + ')').show();
                    }


                }
            });
        }
    });

    $('._sub').delegate('li div', 'click', function () {
        var self = $(this), childCls = self.find('p').attr('class');
        self.find('.to-select').toggleClass('selected')
    });
    $('._sub').delegate('.receiptOrders-title .to-select', 'click', function () {
        var self = $(this);

        if (self.hasClass('selected')) {
            self.parent('h2').siblings('div').find('.to-select').removeClass('selected');
        } else {
            self.parent('h2').siblings('div').find('.to-select').addClass('selected');
        }
        self.toggleClass('selected');

    });

    //订单提交
    $('#receiptOrdersList-submit').bind('click', function () {

        var selectItemAry = [];
        $.each($('.order-list-item-mark'), function (k, v) {
            if ($(v).find('.selected').length) {
                var _orderCode = $(v).parent('div').attr('id'),
                    _chargeElectricity = $(v).parent('div').find('.charging-electricity i').text();
                _chargeElectricity = _chargeElectricity === '暂无' ? 0:_chargeElectricity*1;
                var data = {
                    orderCode: _orderCode,
                    chargeElectricity: _chargeElectricity

                };
                selectItemAry.push(data);
            }
        });
        if (selectItemAry.length) {
            exports.sessionStorage.setItem('selectedOrderToReceipt', JSON.stringify(selectItemAry));

            exports.location.href = './receiptEdit.html?v=' + new Date().getTime();
        } else {
            alert('请选择订单再提交~');
        }
    });

    //发票记录详情
    $('.receiptHistory').delegate('li', 'click', function () {
        var self = $(this),
            invoiceCode = self.attr('id');
        var paramsReceiptHistoryDetails = {
            invoiceCode: invoiceCode,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'invoice.info',
            locale: 'zh_CN',
            appKey: '00014b81addb04bf',
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: paramsReceiptHistoryDetails,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state === 0) {
                    exports.sessionStorage.setItem('receiptHistoryDetails', JSON.stringify(e.data));
                    //exports.location.href='receiptHistoryDetails.html?v=' + new Date().getTime();
                }


            }
        });
    });
})(window);