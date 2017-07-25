/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

  function imgError() {
        $.each($('img'), function(k, v) {
            $(v).error(function() {
                $(v).hide();
                $(v).attr('src', '../../assets/images/c_default_avatar.png');
                $(v).show();
            })
        });
    }


    function successFn(e) {
        var user = e.user,
            account = (user.nick !== null && typeof user.nick !== 'undefined') ? user.nick : '无昵称';
        //资料设置
        $('.mine-panel-top .name-info .name').text(account);
        $('.mine-panel-top .name-info .tel').text(user.phone);
        $('.account-info-top .total b').text(user.balance);
                $('.mine-panel-top .user-icon img').attr('src', user.avatarId).css({"width": "50px", "height": "50px;"});

        if ($('.mine-panel-top .user-icon img').attr('src') === '') {
            $('.mine-panel-top .user-icon img').attr('src', '../../assets/images/c_default_avatar.png').css({"width": "50px", "height": "50px;"});
        }
        imgError();

        //事件添加
        $('.name-icon').bind('click', function (e) {
            exports.location.href = "./mineInfo.html?v=" + new Date().getTime();
        });
        $('.msg').bind('click', function (e) {
            exports.location.href = "./msg.html?v=" + new Date().getTime();
        });
        $('.account-info-top').bind('click', function (e) {
            exports.location.href = "./account.html?v=" + new Date().getTime();
        });
        $('.add-action').bind('click', function (e) {
            e.stopPropagation();
            //if (window.sessionStorage.getItem('isPLT') == 'EPO') {
            //    $('#add-money-tips-mask').fadeIn();
            //    $('#add-money-tips').fadeIn();
            //}else {
                exports.location.href = '../mine/addMoney.html?v=' + new Date().getTime();
            //}

        });
        //跳转小南充电地址
        $('.add-money-tips-content-btn').bind('click', function () {
            setTimeout(function () {
                exports.location.href='http://www.sznfhs.com/upgrade/api/version/setup_version?appCode=charge';
            }, 500)
        })
        $('.myOrder').bind('click', function (e) {//获取我的订单
            e.stopPropagation();
            CTP.Tips('加载中...',false);
            setTimeout(function () {
                exports.location.href = "../order/myOrder.html?v=" + new Date().getTime();
            }, 1000);
        });
        $('.myCarType').bind('click', function (e) {
            e.stopPropagation();
            CTP.Tips('加载中...',false);
            setTimeout(function () {
                exports.location.href = "./myCarType.html?v=" + new Date().getTime();
            }, 1000);
        });
        $('.orderHistory').bind('click', function (e) {
            e.stopPropagation();

            CTP.Tips('加载中...',false);
            setTimeout(function () {
                exports.location.href = "appointment.html?v=" + new Date().getTime();
            }, 1000);

        });
        $('.favStation').bind('click', function (e) {
            e.stopPropagation();

            CTP.Tips('加载中...',false);
            setTimeout(function () {
                exports.location.href = "../find/favorite.html?v=" + new Date().getTime();
            }, 1000);

        });
        $('.cRank').bind('click', function (e) {
            e.stopPropagation();
            CTP.Tips('加载中...',false);

            var session = JSON.parse(exports.sessionStorage.getItem('session'));
            var _paramsCrank = {
                userCode: session.user.userId,
                type: 1,

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'carboreduction.list',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: _paramsCrank,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    if (e.state == '0') {
                        exports.sessionStorage.setItem('cRankList', JSON.stringify(e));
                        setTimeout(function () {
                            exports.location.href = "./cRank.html?v=" + new Date().getTime();
                        }, 1000);
                    } else {
                        CTP.Tips(e.message);
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        });
        $('.settings').bind('click', function (e) {
            e.stopPropagation();

            CTP.Tips('加载中...',false);
            setTimeout(function () {
                exports.location.href = "./settings.html?v=" + new Date().getTime();
            }, 1000);
        });
    }

    function failFn(e) {
        exports.sessionStorage.setItem('comePage', '../mine/mine.html?v=' + new Date().getTime());
        CTP.Tips('加载中...',false);
        setTimeout(function () {
            exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
        }, 1000);

    }
    //
    CTP.checkSession(CTP.weChatAccount, {
        success: function (e) { //如果用户存在
            successFn(e);
        },
        fail: function (e) {//如果用户不存在
            failFn(e);
        }
    });
    //
    $('.closeDot').bind('click', function () {
        $('.add-money-tips').fadeOut();
        $('.ctp-mask').fadeOut();
    });



})(window);