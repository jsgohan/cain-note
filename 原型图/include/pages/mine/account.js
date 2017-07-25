/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session'));

    var pageNo = 1, pageSize = 10;

    if (CTP.checkLogin) {
        $('.add-account-btn').bind('click', function () {
            exports.location.href = '../mine/addMoney.html?v=' + new Date().getTime();
        });
    } else {
        exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
    }


    function loadBalance(){
        var _paramsHomeInfo = {
            userCode: session.user.userId,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'home.info',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: _paramsHomeInfo,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {

                if (e.state == '0') {
                    CTP.Tips('查询成功');

                    var balance = e.data.balance;
                    $('.charging-top-position').html(balance);

                } else {
                    CTP.Tips(e.message);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    function loadBalanceDetailList(type){
        var _paramsHomeInfo = {
            userCode: session.user.userId,
            pageNo: pageNo,
            pageSize: pageSize,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'balance.detaillist',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: _paramsHomeInfo,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {

                if (e.state == '0') {
                    CTP.Tips('查询成功');

                    var detailsHtml = "";
                    var detailsData = e.data;
                    if(type == 'append'){//加载更多
                        if (detailsData.length) {
                            $(detailsData).each(function(i, item){
                                var cssStyle = "";
                                if(item.siteName == '充值'){
                                    cssStyle = "light-green-number";
                                }

                                var itemHtml = "<li>" +
                                    "<span class=\""+cssStyle+"\">"+item.chargeAmount+"</span>" +
                                    "<p class=\"account-details-list-item-name\">"+item.siteName+"</p>" +
                                    "<p class=\"account-details-list-item-date\">"+item.createTime+"</p>" +
                                    "</li>";

                                detailsHtml += itemHtml;
                            });

                            $('.account-details-list').append(detailsHtml);

                            if (detailsData.length < pageSize) {
                                var itemHtml = "<li class=\"noMorePage\">没有更多数据了</li>";
                                $('.account-details-list').append(itemHtml);
                                //$('.add-more').addClass('noMorePage').text('没有更多数据了!')

                            } else {
                                var itemHtml = "<li class=\"add-more\">加载更多</li>";
                                $('.account-details-list').append(itemHtml);
                                //$('.add-more').removeClass('noMorePage').text('加载更多');

                                //加载更多数据
                                $('.add-more').bind('click', function () {
                                    if (!$(this).hasClass('noMorePage')) {
                                        pageNo++;
                                        $(this).text('加载中...');
                                        loadBalanceDetailList('append');
                                        $(this).remove();
                                    }
                                });
                            }
                        } else { //再次加载没有更多数据了


                        }
                    }else{//没有数据
                        $('.account-details-list').html('');
                        $('.account-details-list-box').addClass('add-account-list-no-data');
                    }



                } else {
                    CTP.Tips(e.message);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    }


    //加载金额
    loadBalance();

    //加载余额明细
    loadBalanceDetailList('append');

    //跳转转账页面
    $('#charging-top-code-transfer-btn').bind('click', function () {
        exports.location.href= './transfer.html?v=' + new Date().getTime()
    });

})(window);