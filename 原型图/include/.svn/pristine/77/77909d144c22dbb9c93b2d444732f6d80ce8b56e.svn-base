/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {


    $('.ctp-panel-settings').delegate('p', 'click', function () {
        var self = $(this);
        if (self.hasClass('account-security')) {
            exports.location.href= './accountSecurity.html?v=' + new Date().getTime()
        }
        if (self.hasClass('about')) {
            exports.location.href= './about.html?v=' + new Date().getTime()
        }
        if (self.hasClass('comments')) {
            exports.location.href= './comment.html?v=' + new Date().getTime()
        }
    });

    $('.logout-btn').bind('click', function () {

    });


})(window);