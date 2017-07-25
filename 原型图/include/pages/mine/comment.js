/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    $('.comment-container textarea').focus();
    $('.comment-btn').bind('click', function () {
        CTP.Tips('提交反馈中...', false);
        var clientType;
        if (window.sessionStorage.getItem('isPLT') =='WECHAT') {
            clientType = 'wechat';
        }
        if (window.sessionStorage.getItem('isPLT') =='EPO') {
            clientType = 'epo';
        }
        var _comment = $('.comment-container textarea').val(),
            commentParams = {
                userCode: session.user.userId,
                content: _comment,
                nonce: 'abc',
                format: 'json',
                clientId: clientType,
                clientType: clientType,
                feedbackDate: new Date().getTime(),
                v: '1.0',
                method: 'feedback.save',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
        CTP.Ajax({
            params: commentParams,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (_r) {
               setTimeout(function () {
                   if (_r.state == '0') {
                       CTP.Tips('保存成功');
                       exports.location.href= '../find/findStake.html?v=' + new Date().getTime()
                   }
               }, 1000)
            }
        });
    });


})(window);