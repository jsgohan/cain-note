/**
 * Created by zhanghang on 2016/9/28.
 */

if (!CTP) {
    var CTP = {};
}
(function (exports) {
    function str2asc(strstr) {
        return ("0" + strstr.charCodeAt(0).toString(16)).slice(-2);
    }

    function asc2str(ascasc) {
        return String.fromCharCode(ascasc);
    }

    /*这里开始时UrlEncode和UrlDecode函数*/
    function UrlEncode(str) {
        var ret = "";
        var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
        var tt = "";

        for (var i = 0; i < str.length; i++) {
            var chr = str.charAt(i);
            var c = str2asc(chr);
            tt += chr + ":" + c + "n";
            if (parseInt("0x" + c) > 0x7f) {
                ret += "%" + c.slice(0, 2) + "%" + c.slice(-2);
            } else {
                if (chr == " ")
                    ret += "+";
                else if (strSpecial.indexOf(chr) != -1)
                    ret += "%" + c.toString(16);
                else
                    ret += chr;
            }
        }
        return ret;
    }

    function UrlDecode(str) {
        var ret = "";
        for (var i = 0; i < str.length; i++) {
            var chr = str.charAt(i);
            if (chr == "+") {
                ret += " ";
            } else if (chr == "%") {
                var asc = str.substring(i + 1, i + 3);
                if (parseInt("0x" + asc) > 0x7f) {
                    ret += asc2str(parseInt("0x" + asc + str.substring(i + 4, i + 6)));
                    i += 5;
                } else {
                    ret += asc2str(parseInt("0x" + asc));
                    i += 2;
                }
            } else {
                ret += chr;
            }
        }
        return ret;
    }

    if (CTP.checkLogin) {
        var session = JSON.parse(exports.sessionStorage.getItem('session'));


        $('.wx span').bind('click', function () {
            $(this).toggleClass('selectedItem');
        });
        $('.zfb span').bind('click', function () {
            $(this).toggleClass('selectedItem');
        });
        //如果是微信则启用微信支付 2.01
        if (window.sessionStorage.getItem('isPLT') == 'WECHAT') { //微信浏览器
            $('.orderToPay-method-item-title').text('微信支付');
            $('.orderToPay-method-item-mark').text('推荐安装微信5.0以上版本用户使用');
            $('.orderToPay-method-item-title').parent('div').attr('class', 'wx');

        }
        if (window.sessionStorage.getItem('isPLT') == 'EPO') {//非微信第三方浏览器
            $('.orderToPay-method-item-title').text('支付宝支付');
            $('.orderToPay-method-item-mark').text('数亿用户都在用，安全可托付');
            $('.orderToPay-method-item-title').parent('div').attr('class', 'zfb');
            $('.zfb span').toggleClass('selectedItem');
        }

        function payFn (type) {
            if ($('.'+type+' span').hasClass('selectedItem')) {
                if (type == 'wx') {
                    wechatPay();
                }
                if (type == 'zfb') {
                    aliPay();
                }
            } else {
                CTP.Tips('请选择支付方式！');
            }
        }


        function wechatPay () {
            var payAmount = $('.inputPay').val();
            if(!payAmount || payAmount == '' || payAmount == 'null'){
                CTP.Tips('请输入充值金额！');
                return;
            }
            var _params = {
                userCode: session.user.userId,
                chargeAmount: payAmount,//支付金额
                payType: '1',//1微信支付 2支付宝支付
                openId: session.user.weChatId,
                tradeType: 'JSAPI',

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'balance.pay',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: _params,
                url: '/msp-charge/router',
                type: 'GET',
                success: function (e) {
                    if (e.state == '0') {
                        var data = e.data,
                            weChatPay = data.weChatPay;


                        function onBridgeReady() {
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId": "wx6d08e0b296d9e872",     //公众号名称，由商户传入
                                    "timeStamp": data.weChatPay.timestamp,        //时间戳，自1970年以来的秒数
                                    "nonceStr": data.weChatPay.noncestr, //随机串
                                    "package": 'prepay_id=' + data.weChatPay.prepayid,
                                    "signType": "MD5",         //微信签名方式：
                                    "paySign": data.weChatPay.wechatpay_sign,//微信签名,
                                },
                                function (res) {
                                    switch (res.err_msg) {
                                        case 'get_brand_wcpay_request:cancel':
                                            CTP.Tips('用户取消支付！');
                                            break;
                                        case 'get_brand_wcpay_request:fail':
                                            CTP.Tips('支付失败！（' + res.err_desc + '）');
                                            break;
                                        case 'get_brand_wcpay_request:ok':
                                            var successParams = {
                                                userCode: session.user.userId,
                                                orderCode: data.orderCode,//支付订单
                                                payType: '1',//1微信支付 2支付宝支付

                                                nonce: 'abc',
                                                v: '1.0',
                                                format: 'json',
                                                method: 'balance.payCallback',
                                                locale: 'zh_CN',
                                                appKey: session.appKey,
                                                sessionId: session.sessionId,
                                                timestamp: new Date().getTime()
                                            };
                                            CTP.Ajax({
                                                params: successParams,
                                                url: '/msp-charge/router',
                                                type: 'GET',
                                                success: function (e) {
                                                    if (e.state == '0') {
                                                        var data = e.data;
                                                        CTP.Tips('支付成功！');

                                                        setTimeout(function () {
                                                            exports.history.go(-1)
                                                        }, 1000)
                                                    }
                                                }
                                            });

                                            break;
                                        default:
                                            CTP.Tips(JSON.stringify(res));
                                            break;
                                    }
                                }
                            )
                            ;
                        }

                        if (typeof WeixinJSBridge == "undefined") {
                            if (document.addEventListener) {
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            } else if (document.attachEvent) {
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        } else {
                            onBridgeReady();
                        }


                    }
                    console.log('充值返回结果---', e);

                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
        function aliPay () {
            var _params = {
                userCode: session.user.userId,
                chargeAmount: '1.01',//支付金额
                payType: '1',//1微信支付 2支付宝支付
                openId: session.user.weChatId,
                tradeType: 'MWEB',

                nonce: 'abc',
                v: '1.0',
                format: 'json',
                method: 'balance.pay',
                locale: 'zh_CN',
                appKey: session.appKey,
                sessionId: session.sessionId,
                timestamp: new Date().getTime()
            };
            CTP.Ajax({
                params: _params,
                url: '/msp-charge/router',
                type: 'GET',
                success: function (e) {
                    if (e.state == '0') {
                        var data = e.data,
                            weChatPay = data.weChatPay;

                        // var backUrl = 'http://mspshow.szcomtop.com/msp-charge/include/pages/mine/mine.html?v=' + new Date().getTime();
                        var backUrl = 'http://mspshow.szcomtop.com/msp-charge/include/pages/mine/mine.html';

                        // var ztPayUrl = 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=' + weChatPay.prepayid + '&package=' + weChatPay.partnerid + '&redirect_url=' + UrlEncode(backUrl);

                        // var ztPayUrl = data.mweb_url;
                        var ztPayUrl = 'weixin://wap/'+UrlEncode('payappid=wx6d08e0b296d9e872' + '&noncestr=' + weChatPay.noncestr+'&package=' + weChatPay.partnerid + '&prepayid=' +weChatPay.prepayid + '&sign=' +weChatPay.wechatpay_sign+ '&timestamp=' + weChatPay.timestamp);
                        $('.orderToPay-btn a').attr('href', ztPayUrl)

                    }

                },
                error: function (e) {
                    console.log(e);
                }
            });
        }


        $('.orderToPay-btn').bind('click', function () {
            if ($('.orderToPay-method-item-title').parent().hasClass('wx')) {
                payFn('wx');
            } else {
                // payFn('zfb');
                //var addZfbUrl = "http://mspshow.szcomtop.com/msp-charge/epo/alipay?userCode="+session.user.userId+"&amount=" + $('.inputPay').val();
                var payAmount = $('.inputPay').val();
                if(!payAmount || payAmount == '' || payAmount == 'null'){
                    CTP.Tips('请输入充值金额！');
                    return;
                }
                var addZfbUrl = window.SERVER_URL + "/msp-charge/epo/alipay?userCode="+session.user.userId+"&amount=" + payAmount;
                exports.location.href= addZfbUrl;
            }
        });
    } else {
        exports.location.href = '../register/userBind.html?v=' + new Date().getTime()
    }


})(window);