/**
 * Title: transferDone
 * Belonged: charging
 * Package:
 * param:
 * returns {*}
 * Description: (用一句话描述该文件做什么)
 * Created by zhanghang
 * Email: suchiva@126.com
 * Date: 17/3/21
 * Time: 14:30
 */
if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session'));

    var transferUser = JSON.parse(exports.sessionStorage.getItem('transferUser'));

    $('.transfer-user-phone').html(CTP.encryptPhone(transferUser.phone));

    $('.transfer-done').click(function(){
        exports.location.href = "./account.html?v=" + new Date().getTime();
    });

    var amount = CTP.getUrlParam("amount");
    $('.transfer-user-amount').html(amount);

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
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: _paramsHomeInfo,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {

                if (e.state == '0') {
                    var balance = e.data.balance;
                    session.user.balance = balance;
                    exports.sessionStorage.setItem('session', JSON.stringify(session));
                } else {
                    CTP.Tips(e.message);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
    loadBalance();
})(window);