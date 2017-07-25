/**
 * Title: transfer.js
 * Belonged: charging
 * Package:
 * param:
 * returns {*}
 * Description: (转账详细页面)
 * Created by zhanghang
 * Email: suchiva@126.com
 * Date: 17/3/21
 * Time: 10:37
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    var pageNo = 1, pageSize = 10;

    //高度
    var winH = $(window).height();
    $('.transfer-obj-list').height(winH - 177 - 50);

    //跳转
    $('.transfer-btn a').bind('click', function () {
        var keywordStr = $('.transfer-obj').val();
        if(!keywordStr || keywordStr==''){
            CTP.Tips('请输入小南充电账号或手机号');
            return;
        }

        var _params = {
            keyword: keywordStr,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'balance.transfer.user',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: _params,
            url: '/msp-charge/router',
            type: 'POST',
            success: function (e) {
                if (e.state == 0) {
                    var transferUser = new Object();
                    transferUser.phone = e.data.phone;
                    transferUser.userId = e.data.userId;
                    transferUser.nick = e.data.nick;
                    transferUser.avatar = e.data.avatarId;
                    console.log(transferUser);
                    console.log(JSON.stringify(transferUser));
                    exports.sessionStorage.setItem('transferUser', JSON.stringify(transferUser));
                    exports.location.href = './transferSure.html?v=' + new Date().getTime();
                } else {
                    CTP.Tips(e.message);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    //查询最近转账人
    function loadTransferUser(type){
        var _paramsHomeInfo = {
            userCode: session.user.userId,
            pageNo: pageNo,
            pageSize: pageSize,

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'balance.transfer.detail',
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
                    CTP.Tips('查询成功');

                    var detailsHtml = "";
                    var detailsData = e.data;
                    if(type == 'append'){//加载更多
                        if (detailsData.length) {
                            $(detailsData).each(function(i, item){
                                var nick = item.nick;
                                if(nick == null || nick == ''){
                                    nick = item.account;
                                }
                                if(nick == null){
                                    nick = '';
                                }


                                var itemHtml = "<li " +
                                    "data-user-id=\""+item.userId+"\" data-phone=\""+item.phone+ "\" " +
                                    "data-avatar=\""+item.avatarId+"\" data-nick=\""+item.nick+"\">" +
                                    "<span class=\"transfer-obj-list-icon\">" +
                                    "<img src=\""+ window.SERVER_URL+"/cloudfs/api/fs/view/"+item.avatarId+"\"/>" +
                                    "</span><i>"+nick+"</i>" + CTP.encryptPhone(item.phone) +
                                    "</li>";

                                detailsHtml += itemHtml;
                            });

                            $('.transfer-details-list').append(detailsHtml);

                            if (detailsData.length < pageSize) {
                                var itemHtml = "<li class=\"noMorePage\">没有更多数据了</li>";
                                $('.transfer-details-list').append(itemHtml);

                            } else {
                                var itemHtml = "<li class=\"add-more\">加载更多</li>";
                                $('.transfer-details-list').append(itemHtml);

                                //加载更多数据
                                $('.add-more').bind('click', function () {
                                    if (!$(this).hasClass('noMorePage')) {
                                        pageNo++;
                                        $(this).text('加载中...');
                                        loadTransferUser('append');
                                        $(this).remove();
                                    }
                                });
                            }
                        } else { //再次加载没有更多数据了


                        }
                    }else{//没有数据
                        $('.transfer-details-list').html('');
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

    //加载最近转账人
    loadTransferUser("append");


    $('.transfer-details-list').delegate("li","click",function(){
        if($(this).attr('class') == 'noMorePage'){
            return;
        }

        var transferUser = new Object();
        transferUser.phone = $(this).attr("data-phone");
        transferUser.userId = $(this).attr("data-user-id");
        transferUser.nick = $(this).attr("data-nick");
        transferUser.avatar = window.SERVER_URL + "/cloudfs/api/fs/view/" + $(this).attr("data-avatar");
        console.log(transferUser);
        console.log(JSON.stringify(transferUser));
        exports.sessionStorage.setItem('transferUser', JSON.stringify(transferUser));
        exports.location.href = './transferSure.html?v=' + new Date().getTime();
    });

})(window);

