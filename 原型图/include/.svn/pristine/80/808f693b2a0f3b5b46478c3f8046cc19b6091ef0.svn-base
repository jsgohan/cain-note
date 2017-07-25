'use strict';
if (!CTP) {
    var CTP = {};
}
(function (window, undefined) {


    function initMask() {
        $('.ctp-mask').bind('click', function () {
            var self = $(this),
                cls = self.attr('class'),
                preClsIndex = cls.indexOf(' ctp-mask') - 5,
                preCls = cls.substring(0, preClsIndex);
            self.hide();
            $('.' + preCls).hide();

            var selectType = window.selectType;

            if(selectType == 1){
                var selectObj = window.selectObj;
                if ($(selectObj).hasClass('selected')) {
                    $(selectObj).removeClass('selected');
                    $('.searchTab-subDiv').hide();
                    $('.searchTab-subDiv-mask').hide();

                } else {
                    $('.searchTab li').removeClass('selected');
                    $(this).addClass('selected');
                    $('.searchTab-subDiv-mask').show();
                    $('.searchTab-subDiv').show();
                }
            }
        });

    }


    function initTip(txt, b) {
        var boolean = (b === false || typeof b === undefined) ? b : true;
        var html = '<div id="ctp-tips"><p>' + txt + '</p></div>';

        if ($('#ctp-tips').length) {
            $('#ctp-tips').find('p').html(txt);
        } else {
            $('body').append(html);
        }

        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;(u)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
            // $('#ctp-tips').css({"margin-left": (-1* ($('#ctp-tips').width()/2))+ 'px'});
        } else {
            $('#ctp-tips').css({"margin-left": (-1* ($('#ctp-tips').width()/2))+ 'px'});
        }

        $('#ctp-tips').fadeIn();
        if (boolean) {
            setTimeout(function () {
                $('#ctp-tips').fadeOut();
            }, 1000)
        }
        var tipsWidth = ($('#ctp-tips').width()/2 + 10) * -1;
        $('#ctp-tips').css({"margin-left": tipsWidth  + 'px'});

    }

    function initEditBox(txt, b) {
        if (typeof b !== 'undefined' && b === false) {
            $('.ctp-edit-box-mask').fadeOut();
            $('#ctp-edit-box').fadeOut();
        } else {
            var html = '<div id="ctp-edit-box" class="ctp-edit-box">' +
                '<p class="title">填写评论</p>' +
                '<div class="textarea-box"><textarea>' + txt + '</textarea></div>' +
                '<div class="ctp-edit-btn"><a class="ctp-edit-btn-cancel">取消</a><a class="ctp-edit-btn-submit">提交</a> </div> ' +
                '</div>';

            if ($('#ctp-edit-box').length) {
                $('#ctp-edit-box').find('textarea').val(txt);
            } else {
                $('#webapp').append(html);
            }
            $('.ctp-edit-box-mask').fadeIn();
            $('#ctp-edit-box').fadeIn();
        }


    }

    var ele ;
    //初始角度
    var degree = 0;
    var angle = [10,25,45,65,90,120];
    var angleIndex = 0;

    //单次旋转
    function singleRotate() {
        if(angleIndex == 6){
            angleIndex = 0;
        }
        //一次增加50度
        //degree = degree + 50 * Math.PI / 180;
        degree = 30 * Math.sin(angle[angleIndex] * Math.PI/180)
        ele.css("transform","rotate("+degree+"deg)");
        angleIndex ++;
    }

//自定义函数
    $.fn.extend({
        rotate: function () {
            ele = this ;
            setInterval(function(){
                singleRotate();
            },20);
        }
    });


    function dialog(title, txt, cb1, cb2, btns, flag) {
        var btns = btns || [{text: '取消'}, {text: '确定'}];
        var dialogHtml = '<div id="ctp-dialog" class="ctp-dialog">';
        if(flag){
            dialogHtml += '<div style="width: 100%; text-align: center; margin-top: 20px;"><img id="loadImg" src="/msp-charge/include/assets/images/loading_white.gif" style="width: 25px; height: 25px;"/></div>';
            dialogHtml += '<p class="ctp-dialog-title" style="margin-top: 0px;">' + title + '</p>';
        }
        if(!flag && title != ''){
            dialogHtml += '<p class="ctp-dialog-title">' + title + '</p>';
        }
        dialogHtml += '<div class="ctp-dialog-content">' + txt + '</div>';
        if(btns.length > 0){
            dialogHtml += '<p class="ctp-dialog-btn"><span class="ctp-dialog-btn-cancel">'+btns[0].text+'</span><span class="ctp-dialog-btn-submit">'+btns[1].text+'</span></p>';
        }
        dialogHtml += '</div>';

        if ($('#ctp-dialog').length && $('#ctp-dialog-mask').length) {
            $('#ctp-dialog').find('.ctp-dialog-title').html(title);
            $('#ctp-dialog').find('.ctp-dialog-content').html(txt);

        } else {
            $('#webapp').append(dialogHtml);
        }
        $('#ctp-dialog').toggle();
        $('#ctp-dialog-mask').toggle();
        $('#webapp').undelegate('.ctp-dialog-btn-submit', 'click');
        $('#webapp').undelegate('.ctp-dialog-btn-cancel', 'click');

        if (typeof cb2 == 'function') {
            $('#webapp').delegate('.ctp-dialog-btn-submit', 'click', cb2);
        }

        if (typeof cb1 == 'function') {
            $('#webapp').delegate('.ctp-dialog-btn-cancel',  'click', cb1);
        }

        //$("#loadImg").rotate();


    }



    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    //隐藏手机号
    function encryptPhone(phone){
        return phone.substring(0,3) + "****" + phone.substring(7);
    }

    function fD(a, b, c) {
        for (; a > c;)
            a -= c - b;
        for (; a < b;)
            a += c - b;
        return a;
    };
    function jD(a, b, c) {
        b != null && (a = Math.max(a, b));
        c != null && (a = Math.min(a, c));
        return a;
    };
    function yk(a) {
        return Math.PI * a / 180
    };
    function Ce(a, b, c, d) {
        var dO = 6370996.81;
        return dO * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
    };
    function getDistance(a, b) {
        if (!a || !b)
            return 0;
        a.lng = fD(a.lng, -180, 180);
        a.lat = jD(a.lat, -74, 74);
        b.lng = fD(b.lng, -180, 180);
        b.lat = jD(b.lat, -74, 74);
        return Ce(yk(a.lng), yk(b.lng), yk(a.lat), yk(b.lat));
    };

    CTP.getDistance = getDistance;
    CTP.getUrlParam = getUrlParam;
    CTP.encryptPhone = encryptPhone;
    CTP.dialog = dialog;
    CTP.Tips = initTip;
    CTP.initMask = initMask();
    CTP.initEditBox = initEditBox;
    function toTXT (str) { //Html结构转字符串形式显示
        var RexStr = /\<|\>|\"|\'|\&|　| /g
        str = str.replace(RexStr,
            function (MatchStr) {
                switch (MatchStr) {
                    case "<":
                        return "&lt;";
                        break;
                    case ">":
                        return "&gt;";
                        break;
                    case "\"":
                        return "&quot;";
                        break;
                    case "'":
                        return "&#39;";
                        break;
                    case "&":
                        return "&amp;";
                        break;
                    case " ":
                        return "&ensp;";
                        break;
                    case "　":
                        return "&emsp;";
                        break;
                    default:
                        break;
                }
            }
        )
        return str;
    };
    function ToHtmlString (htmlStr) { //Html结构转字符串形式显示 支持<br>换行
        return toTXT(htmlStr).replace(/\&lt\;br[\&ensp\;|\&emsp\;]*[\/]?\&gt\;|\r\n|\n/g, "<br/>");
    };
    CTP.ToHtmlString = ToHtmlString;
})(window);