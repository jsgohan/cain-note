/**
 * Title: transferSure
 * Belonged: charging
 * Package:
 * param:
 * returns {*}
 * Description: (用一句话描述该文件做什么)
 * Created by zhanghang
 * Email: suchiva@126.com
 * Date: 17/3/21
 * Time: 14:28
 */


if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session'));

    var transferUser = JSON.parse(exports.sessionStorage.getItem('transferUser'));

    //高度
    var winH = $(window).height();
    $('.transfer-obj-list').height(winH - 177 - 50);

    //跳转
    $('.transfer-sure-btn a').bind('click', function () {
        var amount = $('.transfer-amount-input').val();
        if(!amount || amount == '' || amount == 'null'){
            CTP.Tips('请填写转账金额!');
            return;
        }
        var validCode = $('.transfer-validate-input').val();
        var remark = $('.transfer-remark-input').val();

        var _params = {
            fromUserId: session.user.userId,
            toUserId: transferUser.userId,
            transferAmount: amount,
            validCode: validCode,
            remark: remark,

            method: 'balance.transfer.submit',
            sessionId: session.sessionId,
            appKey: session.appKey,
            locale: 'zh_CN',
            format: 'json',
            v: '1.0',
            nonce: 'abc'
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                console.log(e);
                if(e.state == 0){
                    exports.location.href = './transferDone.html?amount='+amount+'&v=' + new Date().getTime();
                }else if (e.code == '9') {
                    CTP.Tips(e.subErrors[0].message);
                }else{
                    CTP.Tips(e.message);
                }
            },
            error: function (e) {
                alert('status' + e.status);
                alert('readyState' + e.readyState);
                alert('textStatus' + e.statusText);
            }
        });
    });

    function countdownFn(val, sec) {
        var countdown = sec;

        function settime(val) {
            if (countdown == 0) {
                $(val).next('a').text('发送验证码').removeClass('disable');
                countdown = sec;

            } else {
                $(val).next('a').text("重新发送(" + countdown + ")").addClass('disable');
                countdown--;
                setTimeout(function () {
                    settime(val);
                }, 1000)
            }

        }

        settime(val);
    }
    function getJyCode(me) {
        var _params = {
            mobile: session.user.phone,
            validCode: '',
            method: 'user.sendvalidcode',
            reason: 'transfer',

            appKey: session.appKey,
            locale: 'zh_CN',
            format: 'json',
            v: '1.0',
            nonce: 'abc'
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (e) {
                if (e.successful) {
                    countdownFn(me, 60);
                }
                if (e.code == '9') {
                    CTP.Tips(e.subErrors[0].message);
                }

            },
            error: function (e) {
                alert('status' + e.status);
                alert('readyState' + e.readyState);
                alert('textStatus' + e.statusText);
            }
        });
    }
    $('.getValidateCode').bind('click', function () {
        var self = $(this),
            input = self.parent().find('input').get(0);
        if (!self.hasClass('disable')) {
            getJyCode(input);
        } else {
            CTP.Tips('不要频繁获取!');
        }
    });

    function initTransferUser(){
        $('.transfer-user-avatar').attr('src', transferUser.avatar);
        var nick = transferUser.nick;
        if(nick == null || nick == '' || nick == 'null'){
            nick = transferUser.account;
        }
        if(nick == null || nick == 'null'){
            nick = '';
        }
        $('.transfer-obj-details-name').html(nick);
        $('.transfer-obj-details-tel').html(CTP.encryptPhone(transferUser.phone));
    }

    function initBalance(){
        var balance = session.user.balance;
        console.log(balance);
        $('.user-balance').html("￥"+balance);
    }

    initTransferUser();

    initBalance();

})(window);
