/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session'));

    function initAbout() {
        var _paramsCrank = {
            tag: 'weChat',

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'config.info',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: _paramsCrank,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (e) {
                var data = e.mapData;
                var liStr = '', v = data;
                for(var i in v) {
                    var item 
                    if(i == 'about') {
                        item = '<li data-url="' + v[i][0]['cval'] + '"><span class="arrow"></span>关于</li>';
                    }
                    if(i == 'recommend') {
                        item = '<li data-url="' + v[i] + '"><span class="arrow"></span>推荐</li>';
                    }
                    
                    liStr += item;
                }
                $('.about-list').html(liStr);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    initAbout();

    $('.about-list').delegate('li', 'click', function () {
        var self = $(this),
            url = self.attr('data-url');
        console.log(url);
        exports.location.href = url;
    });
})(window);