/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        stakeDetails = JSON.parse(exports.sessionStorage.getItem('stakeDetails')),
        chargedPayment = JSON.parse(exports.sessionStorage.getItem('chargedPayment'));


    if (CTP.checkLogin()) {
        function getStationTag() {
            var tagParams = {
                userCode: session.user.userId,

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'station.scorelable',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: tagParams,
                url: '/msp-charge/router',
                type: 'GET',
                success: function (e) {
                    var str = '';
                    $.each(e.data, function (k, v) {
                        var level = '';
                        $.each(v.items, function (m, n) {
                            var item = '<li class="tag_' + v.score + '" data-labelCode="' + n.labelCode + '">' + n.labelName + '</li>';
                            level += item;
                        });
                        str += level;
                    });
                    $('.evaluation-phase').html(str);
                }
            })
        }

        getStationTag();
        function submitEvaluation(comment, score) {
            var labels = [];
            $.each($('.evaluation-phase li.selected'), function (k, v) {
                labels.push($(v).attr('data-labelcode'));
            });
            labels = labels.join(',');
            var paramsGetMyOrder = {
                userCode: session.user.userId,
                orderCode: chargedPayment.orderCode,
                siteCode: chargedPayment.siteCode,
                score: score,
                comment: comment,
                labels: labels,

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'station.submitscore',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: paramsGetMyOrder,
                url: '/msp-charge/router',
                type: 'POST',
                success: function (e) {
                    if (e.state == 0) {
                        var data = e.data;
                        console.log(e);
                        setTimeout(function () {
                            exports.location.href = '../order/myOrder.html?v=' + new Date().getTime();
                        }, 1000)
                    } else {
                        CTP.Tips(e.message);
                        setTimeout(function () {
                            // exports.history.go(-1);
                        }, 1000)
                    }

                },
                error: function (e) {
                    console.log(e);
                }
            });
        }

        $('.start-area').delegate('i', 'click', function () {
            var self = $(this), index = self.index();
            $('.start-area i:lt(' + (index + 1) + ')').addClass('selected');
            $('.evaluation-phase li').hide();
            $('.evaluation-phase li.tag_' + (index+1)).show();
            if (self.hasClass('selected')) {
                $('.start-area i').removeClass('selected');
                $('.start-area i:lt(' + (index + 1) + ')').addClass('selected');
            }

        });
        $('.evaluation-phase').delegate('li', 'click', function () {
            $(this).toggleClass('selected');
        });
        $('.evaluation-submit').bind('click', function () {
            var comment = $('.evaluation-text textarea').val(),
                score = $('.start-area .selected').length;
            if (score > 0) {
                submitEvaluation(comment, score);
            } else {
                CTP.Tips('请评分!');
            }
        });


    }


})(window);