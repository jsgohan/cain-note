/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var pageNo = 1, pageSize = 20;

    CTP.Tips('加载中...', false);
    var session = JSON.parse(exports.sessionStorage.getItem('session'));

    function initMyOrder(type) {

        var user = session.user,
            myOrderListStr = '',
            paramsGetMyOrder = {
                userCode: user.userId,
                pageNo: pageNo,
                pageSize: pageSize,

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'order.list',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
        CTP.Ajax({
            params: paramsGetMyOrder,
            url: '/msp-charge/router',
            type: 'GET',
            success: function (result) {
                CTP.Tips('加载完毕');
                if (result.state == 0) {
                    var myOrderList = result.data, myOrderListStr = '';

                    function initData(myOrderList) {
                        $.each(myOrderList, function (k, v) {
                            var chargeTime = (v.chargeTime * 1 / 60).toFixed(0) + '分钟',
                                chargeQuantity = (v.chargeQuantity === null ? '0' : v.chargeQuantity) + 'kWh',
                                btnArea;
                            var orderStartTime = v.orderStartTime.split(' ');
                            orderStartTime = orderStartTime[0].substring(5, orderStartTime[0].length) + ' ' + orderStartTime[1].substring(0, orderStartTime[0].length - 5);
                            if (v.orderState == '2') {//充电中
                                btnArea = '<div class="charging-span">充电中</div>';
                            } else if (v.orderState == '3') {//未支付
                                btnArea = '<div class="to-pay">支付</div>';
                            } else if (v.orderState == '4') {//已支付
                                if (v.isComment == '1') {//未评价
                                    btnArea = '<div class="eval-btn">评价</div>';
                                }
                                if (v.isComment == '2') {//已评价
                                    btnArea = '';
                                }
                            } if (v.orderState == '5') {
                                btnArea = '<div class="hangup-span">挂起</div>';
                            }

                            var item = '<li data-orderState="' + v.orderState + '" data-carbonReduction="' + v.carbonReduction + '" data-chargeTime="' + v.chargeTime + '" data-siteName="' + v.siteName + '" data-chargeElectricity="' + v.chargeElectricity + '" data-img="' + v.img + '" data-siteAddress="' + v.siteAddress + '"  data-chargeQuantity="' + v.chargeQuantity + '" data-site="' + v.siteCode + '" id="' + v.orderCode + '">' + btnArea +
                                '<p class="order-list-item-title"><span>' + orderStartTime + '</span>' + v.siteName + '</p>' +
                                '<p class="order-list-item-mark">' +
                                '<span class="charging-time">' + chargeTime + '</span>' +
                                '<span class="charging-quality">' + chargeQuantity + '</span>' +
                                '<span class="charging-electricity">' + (v.chargeElectricity === null ? '无' : v.chargeElectricity) + '元</span>' +
                                '</p>' +
                                '</li>';
                            myOrderListStr += item;
                        });
                        return myOrderListStr;
                    }

                    if (type === 'append') {
                        myOrderListStr = initData(myOrderList);
                        $('.myOrderList').append(myOrderListStr);
                        if (myOrderList.length < pageSize) {
                            $('.add-more').addClass('noMorePage').text('没有更多数据了!');

                        } else {
                            $('.add-more').removeClass('noMorePage').text('加载更多');
                        }
                    } else {
                        if (myOrderList.length) {
                            if (myOrderList.length < pageSize) {
                                $('.add-more').addClass('noMorePage').text('没有更多数据了!')
                            } else {
                                $('.add-more').removeClass('noMorePage').text('加载更多');
                            }
                            $('.receipt-apply-btn').show();
                            myOrderListStr = initData(myOrderList);

                        } else {
                            $('.myOrderList').html('');
                            $('.ctp-list-box').addClass('order-list-no-data');
                        }

                        $('.myOrderList').html(myOrderListStr);
                    }

                }

            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    if (CTP.checkLogin()) {
        initMyOrder();
    } else {

    }

    //订单详情
    $('.myOrderList').delegate('li', 'click', function (e) {
        var self = $(this),
            orderCode = self.attr('id');
        exports.sessionStorage.setItem('myOrderDetailsCode', orderCode);
        var self = $(this);
        var siteCode = self.attr('data-site'),
            orderCode = self.attr('id') || exports.sessionStorage.getItem('myOrderDetailsCode'),
            orderState = self.attr('data-orderState'),
            siteName = self.attr('data-siteName'),
            img = self.attr('data-img'),
            chargeTime = self.attr('data-chargeTime'),
            chargeElectricity = self.attr('data-chargeElectricity'),
            chargeQuantity = self.attr('data-chargeQuantity'),
            siteAddress = self.attr('data-siteAddress'),
            carbonReduction = self.attr('data-carbonReduction'),
            params = {
                siteCode: siteCode,
                siteName: siteName,
                orderCode: orderCode,
                img: img,
                chargeTime: chargeTime,
                chargeElectricity: chargeElectricity,
                chargeQuantity: chargeQuantity,
                siteAddress: siteAddress,
                carbonReduction: carbonReduction
            };
        if (orderState == '2') {//充电中
            var paramsChargingInfo = {
                userCode: session.user.userId,
                orderCode: orderCode,

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'charge.info',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: paramsChargingInfo,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    if (e.state == 0) {
                        exports.sessionStorage.setItem('chargingOrderCode', orderCode);
                        exports.location.href = '../charging/charging.html?v=' + new Date().getTime();
                    }
                }
            });
        } else {
            exports.sessionStorage.setItem('chargedPayment', JSON.stringify(params));
            exports.location.href = './myOrderDetails.html?v=' + new Date().getTime();
        }


    });
    //评价
    $('.myOrderList').delegate('li .eval-btn', 'click', function (e) {
        e.stopPropagation();
        var self = $(this),
            siteCode = self.parent('li').attr('data-site'),
            orderCode = self.parent('li').attr('id'),
            siteName = self.parent('li').attr('data-siteName'),
            img = self.parent('li').attr('data-img'),
            chargeTime = self.parent('li').attr('data-chargeTime'),
            chargeElectricity = self.parent('li').attr('data-chargeElectricity'),
            chargeQuantity = self.parent('li').attr('data-chargeQuantity'),
            siteAddress = self.parent('li').attr('data-siteAddress'),
            carbonReduction = self.parent('li').attr('data-carbonReduction'),
            params = {
                siteCode: siteCode,
                siteName: siteName,
                orderCode: orderCode,
                img: img,
                chargeTime: chargeTime,
                chargeElectricity: chargeElectricity,
                chargeQuantity: chargeQuantity,
                siteAddress: siteAddress,
                carbonReduction: carbonReduction
            };

        exports.sessionStorage.setItem('chargedPayment', JSON.stringify(params));
        exports.sessionStorage.setItem('evaluationNeedParams', JSON.stringify(params));
        exports.location.href = '../mine/evaluation.html?v=' + new Date().getTime();
    });
    //支付
    $('.myOrderList').delegate('li .to-pay', 'click', function (e) {
        e.stopPropagation();
        var self = $(this);
        var siteCode = self.parent('li').attr('data-site'),
            orderCode = self.parent('li').attr('id'),
            siteName = self.parent('li').attr('data-siteName'),
            img = self.parent('li').attr('data-img'),
            chargeTime = self.parent('li').attr('data-chargeTime'),
            chargeElectricity = self.parent('li').attr('data-chargeElectricity'),
            chargeQuantity = self.parent('li').attr('data-chargeQuantity'),
            siteAddress = self.parent('li').attr('data-siteAddress'),
            carbonReduction = self.parent('li').attr('data-carbonReduction');


        var params = {
            siteCode: siteCode,
            siteName: siteName,
            orderCode: orderCode,
            img: img,
            chargeTime: chargeTime,
            chargeElectricity: chargeElectricity,
            chargeQuantity: chargeQuantity,
            siteAddress: siteAddress,
            carbonReduction: carbonReduction
        };

        exports.sessionStorage.setItem('chargedPayment', JSON.stringify(params));
        exports.location.href = '../charging/orderToPay.html?v=' + new Date().getTime();
    });

    //申请发票
    $('.receipt-apply-btn').bind('click', function () {
        var paramsReceiptOrder = {
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
            params: paramsReceiptOrder,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state == 0) {
                    var data = e.data;
                    exports.sessionStorage.setItem('receiptOrders', JSON.stringify(data));
                    exports.location.href = "../receipt/receiptOrders.html"
                }

            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    //加载更多数据
    var flg = true;
    $('.add-more').bind('click', function () {
        if (!$(this).hasClass('noMorePage') & $(this).prev('ul').find('li').length > 0) {
            if (flg) {
                pageNo++;
                $(this).text('加载中...');
                initMyOrder('append');
                flg = false;
                setTimeout(function () {
                    flg = true;
                }, 500)
            }
        }


    });
    //高度
    // var tempH = $(window).height() - 51;
    var tempH = $(window).height();
    $('#myOrderList').height(tempH);

})(window);