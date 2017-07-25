/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        cRankList = JSON.parse(exports.sessionStorage.getItem('cRankList'));

    function imgError() {
        $.each($('img'), function(k, v) {
            $(v).error(function() {
                $(v).hide();
                $(v).attr('src', '../../assets/images/c_default_avatar.png');
                $(v).show();
            })
        });
    }

    $('.cRank-panel-top-img img').attr('src', cRankList.data.avatar);
    $('.cRank-panel-top-total').text((cRankList.data.carbonReduction*1/1000).toFixed(3));
    $('.cRank-panel-top-rank').text(cRankList.data.carReduRanking);

    function initView(data) {

        var data = data || cRankList.data.leaderboard;
        var htmlStr = '';
        if (data.length > 0) {
            $.each(data, function (k, v) {
                var special = '';
                if (session.user.userId == v.userCode) {
                    special += '<i>我</i>';
                }
                var item = '<li><span class="total-num">' + (v.carbonReduction*1/1000).toFixed(3) + '</span><span class="item-rank rank-' + v.carReduRanking +'">' + v.carReduRanking +'</span>' +
                    '<img src="' + v.avatar + '"/><span class="user-name">' + (v.userName == null ? '无昵称':v.userName )+ '</span>' + special +'</li>';
                htmlStr += item;
            });
            $('.cRank-panel-list').html(htmlStr);
            imgError();
        } else {
            htmlStr = '<li>没有数据</li>';
            $('.cRank-panel-list').addClass('list-no-data');
        }



        //加载更多数据
        $('.add-more').bind('click', function () {
            initView(data);
        });
    }

    initView();

    $('.cRank-panel-tab').delegate('li', 'click', function () {
        CTP.Tips('加载中...',false);

        var self = $(this),
            _index = self.index() + 1;
        var session =  JSON.parse(exports.sessionStorage.getItem('session'));
        var _text = self.text();
        $('.cRank-panel-top-info span').text(_text);
        var _paramsCrank = {
            userCode: session.user.userId,
            type: _index,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'carboreduction.list',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime(),
        };
        CTP.Ajax({
            params: _paramsCrank,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                CTP.Tips('加载完毕');
                exports.sessionStorage.setItem('cRankList', JSON.stringify(e));

                $('.cRank-panel-top-total').text((e.data.carbonReduction*1/1000).toFixed(3));
                $('.cRank-panel-top-rank').text(e.data.carReduRanking);
                $('.cRank-panel-tab li').removeClass('selected');
                self.addClass('selected');
                initView(e.data.leaderboard);
                imgError();
            },
            error: function (e) {
                console.log(e);
            }
        });
    })


    //高度
    $('.cRank-panel-list-container').height($(window).height() - 255)
})(window);