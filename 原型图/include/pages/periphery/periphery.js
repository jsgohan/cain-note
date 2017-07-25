/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function(exports) {

    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        //currentPosition = JSON.parse(exports.sessionStorage.getItem('currentPosition')),
        currentSiteCode = JSON.parse(exports.sessionStorage.getItem('currentSiteCode'));



    function initListHtml(d) {
        var html = '';
        $.each(d, function(k, v) {
            var overallRating = v.overallRating * 1,
                startNum = parseInt(overallRating),
                dotIndex = overallRating % 1 >= 0.5 ? 1 : 'half',
                tempDescription = v.type === 'hotel' ? '起' : '人均';
            var item = ' <li>' +
                '<p class="periphery-panel-list-item-price">' +
                '<span class="price-num">¥' + v.price + '</span>' +
                '<span class="price-mark">' + tempDescription + '</span>' +
                '</p>' +
                '<p class="periphery-panel-list-item-title">' + v.name + '</p>' +
                '<p class="periphery-panel-list-item-start start_' + (startNum + dotIndex) + '"><i></i><i></i><i></i><i></i><i></i></p>' +
                '<p class="periphery-panel-list-item-mark">' + v.tag + '|' + v.businessCircle + '(' + v.distance + '米)</p>' +
                '</li>';
            html += item;
        });
        $('.periphery-panel-list').html(html);
        $.each($('.periphery-panel-list-item-start'), function(k, v) {
            var clsIndex = $(v).attr('class').indexOf('_'),
                clsStarts = $(v).attr('class').substring(clsIndex, $(v).attr('class').length),
                startFirstNum = clsStarts.substring(1, 2);
            if (clsStarts.indexOf('half') > -1) {
                if (startFirstNum == 0) {
                    $(v).find('i:lt(' + startFirstNum + ')').addClass('selected-start');
                } else {
                    $(v).find('i:lt(' + startFirstNum + ')').addClass('selected-start');
                    $(v).find('i:eq(' + (startFirstNum) + ')').addClass('selected-start-half');
                }
            } else {
                $(v).find('i:lt(' + startFirstNum + ')').addClass('selected-start');
            }
        });
        for (var i = 0; i <= 5; i++) {
            $('.start_' + i + ' i:lt(' + i + ')').addClass('selected-start');
            $('.start_' + i + '_half i:lt(' + i + ')').addClass('selected-start');
            $('.start_' + i + '_half i:eq(' + (i + 1) + ')').addClass('selected-start-half');
        }
        CTP.Tips('数据加载完毕');
    }

    function initList(text, index) {
        CTP.Tips('数据加载中...', false);
        var appKey = session === null ? '' : session.appKey,
            sessionId = session === null ? '' : session.sessionId;
        var params = {
            keyword: text,
            pageSize: 20,
            pageNo: 0,
            siteCode: currentSiteCode,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'place.poilist',
            locale: 'zh_CN',
            appKey: appKey,
            sessionId: sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: params,
            url: '/msp-charge/router',
            type: 'POST',
            success: function(e) {
                if (e.state == 0) {
                    setTimeout(function() {
                        $('.periphery-panel-tab li').removeClass('selected');
                        $('.periphery-panel-tab li:eq(' + index + ')').addClass('selected');
                        var data = e.data;
                        initListHtml(data);
                    }, 500);
                }
            }
        });
    }

    $('.periphery-panel-tab').delegate('li', 'click', function() {
        CTP.Tips('数据加载中...', false);
        var self = $(this),
            _text = self.text(),
            _index = self.index();
        initList(_text, _index);
    });

    initList('美食', 0);
    var tempH = $(window).height() - 120
    $('.periphery-panel-list').height(tempH);

})(window);