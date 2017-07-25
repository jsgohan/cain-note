/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }


    var session = JSON.parse(exports.sessionStorage.getItem('session'));
    if (CTP.checkLogin()) {
        var user = session.user;
        console.log('user---', user);
        //exports.sessionStorage.setItem('session', JSON.stringify(e));
        var gender = user.gender == '2'? '男': '女';
        $('.mineInfo-panel-top-icon').attr('src', user.avatarId).css({"width": "50px", "height": "50px;"});
        if ($('.mineInfo-panel-top-icon').attr('src') === '') {
            $('.mineInfo-panel-top-icon').attr('src', '../../assets/images/c_main_tab_more_pressed.png').css({"width": "50px", "height": "50px;"});
        }
        $('.mineInfo-panel-top-name').text(user.nick);
        $('.mineInfo-panel-top-description').text(user.introduction);

        $('.mineInfo-panel-bottom-account input').val(user.account);
        $('.mineInfo-panel-bottom-tel input').val(user.phone);
        $('.mineInfo-panel-bottom-nick input').val(user.nick);
        $('.mineInfo-panel-bottom-sex input').val(gender);
        $('.mineInfo-panel-bottom-description input').val(user.introduction);
    } else {
        exports.sessionStorage.setItem('comePage', '../mine/mine.html?v=' + new Date().getTime());
        exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
    }
    function initEdit () {
        var getParams = getUrlParam('updateParams');
        var defaultValue = decodeURI(getUrlParam(getParams));
        $('.mineInfo-panel-bottom-account-editInput').val(defaultValue);
    }

    initEdit();
    $('.mineInfo-panel-bottom-account-editInput').on('input', function () {
        if ($('.mineInfo-panel-bottom-account-editInput').val().length > 20)
            CTP.Tips('昵称不能超过20位')
        var temp = $('.mineInfo-panel-bottom-account-editInput').val().substring(0, 20);
        console.log(temp);
        $('.mineInfo-panel-bottom-account-editInput').val(temp);
            return;
    })
    function saveMe (type) {
        var carTypeParams = {
            userId: user.userId,

            nonce: 'abc',
            format: 'json',
            v: '1.0',
            method: 'user.save',
            locale: 'zh_CN',
            appKey: session.appKey,
            sessionId: session.sessionId,
            timestamp: new Date().getTime()
        };

        if (type == 'gender') {
            carTypeParams[type] = $('.mineInfo-panel-bottom-account-editInput').val() == '男' ? '2': '1';
        } else {
            carTypeParams[type] = $('.mineInfo-panel-bottom-account-editInput').val() + '';
        }
        if (type == 'nick') {
            if ($('.mineInfo-panel-bottom-account-editInput').val().trim() == '') {
                CTP.Tips('昵称不能为空');
                return;
            }
            if ($('.mineInfo-panel-bottom-account-editInput').val().length > 20) {
                CTP.Tips('昵称不能超过20位');
                var temp = $('.mineInfo-panel-bottom-account-editInput').val().substring(0, 20);
                console.log(temp);
                $('.mineInfo-panel-bottom-account-editInput').val(temp);
                return;
            }

        }

        CTP.Ajax({
            params: carTypeParams,
            url: '/msp-cas/router',
            type: 'POST',
            success: function (_r) {
                if (typeof _r.user !== 'undefined') {
                    CTP.Tips('信息已保存!');
                    setTimeout(function () {
                        exports.location.href = './mineInfo.html?v=' + new Date().getTime();
                    }, 800)
                } else {
                    CTP.Tips('保存失败')
                }
            }
        });
    }
    $('.btnEdit').bind('click', function () {
        CTP.Tips('信息保存中...', false)
        saveMe(getUrlParam('updateParams'));
    });
})(window);