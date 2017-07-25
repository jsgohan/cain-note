/**
 * Created by zhanghang on 2016/9/28.
 */
if (!CTP) {
    var CTP = {};
}
(function (exports) {


    var session = JSON.parse(exports.sessionStorage.getItem('session')),
        pileDetails = JSON.parse(exports.sessionStorage.getItem('pileDetails'));
    var codeAry = [], brandAry = [], iconAry = [], vehicleModelCodeAry = [];
    CTP.weChatAccount = JSON.parse(exports.sessionStorage.getItem('weChatAccount'));


    var chargePileType = pileDetails.chargePileType == '1' ? '直流电' : '交流电',
        chargePileTypeCls = pileDetails.chargePileType == '1' ? 'dc' : 'ac';
    $('.charging-top-position').text(pileDetails.chargePileName);
    $('.charging-top-code span').text(pileDetails.chargePileCode);
    $('.charging-elect-type').addClass(chargePileTypeCls).text(chargePileType);
    $('.charging-elect-price').text(pileDetails.price + '元/kWh');


    $('.charging-elect-amount-fullof-button').bind('click', function () {
        var self = $(this);
        if (self.parent().hasClass('charging-elect-amount-fullof')) {
            $('.charging-elect-quota input').val('');
        }

        $('.charging-elect-amount-fullof-button').removeClass('clicked');
        self.toggleClass('clicked');
    });
    var configList = {};

    function validateFn() {
        var validateParams = {

            nonce: 'abc',
            v: '1.0',
            format: 'json',
            method: 'config.list',
            locale: 'zh_CN',
            appKey: session.appKey,
            timestamp: new Date().getTime()
        };
        CTP.Ajax({
            params: validateParams,
            url: '/msp-charge/router',
            type: 'GET',
            success: function (e) {
                $.each(e.data, function (k, v) {
                    if (v.confKey == "minThreshold") {
                        configList["minThreshold"] = v.confValue;
                    }
                    if (v.confKey == "maxThreshold") {
                        configList["maxThreshold"] = v.confValue;
                    }
                    if (v.confKey == "promptThreshold") {
                        configList["promptThreshold"] = v.confValue;
                    }
                });
                var defaultCharging = $('.charging-elect-amount-fullof'),
                    payCharging = $('.charging-elect-amount-input'),
                    balance = session.user.balance;

                $('.defaultChargingText').html('(账户余额:' + balance + '元)');
                var getConfigFlg = setInterval(function () {
                    console.log('*******---' + configList.promptThreshold);
                    if (typeof configList.promptThreshold !== 'undefined') {
                        //自动充满和输入金额都要判断当前用户余额是否小于等于10元，
                        console.log(getConfigFlg);
                        if (balance <= configList.promptThreshold) {
                            $('.charging-start-button').attr('data-role', 'false');
                            CTP.Tips('当前余额为' + balance + '元,请及时充值');
                        }


                        clearInterval(getConfigFlg);

                    }
                }, 300);

                //输入金额充电
                if (true) {
                    $('.charging-elect-amount-input').focus(function () {
                        var self = $(this);
                        if (!(self.next('i').next('span').hasClass('clicked'))) {
                            $('.charging-elect-amount-fullof-button').removeClass('clicked');
                            self.next('i').next('span').addClass('clicked');
                        }
                    });
                    $('.charging-elect-amount-input').bind('keypress', function () {
                        var self = $(this);
                        if (!(self.next('i').next('span').hasClass('clicked'))) {
                            $('.charging-elect-amount-fullof-button').removeClass('clicked');
                            self.next('i').next('span').addClass('clicked');
                        }

                        setTimeout(function () {
                            var val = self.val() * 1;
                            if (!(val > 0 && val <= balance - configList.minThreshold)) {
                                CTP.Tips('请输入正确的值');
                                self.val('');
                            } else {

                            }

                        }, 500)


                    });
                }

            }
        });

    }

    validateFn();
    //启动
    $('.charging-start-button').bind('click', function () {
        $('#ctp-dialog').remove();
        $('#charging-start-button-masks').fadeIn();
        $(this).addClass('clicked');
        var self = $(this);
        if (CTP.checkLogin()) {
            var isToCharge = self.attr('data-role');
            if (isToCharge === 'false') {
                CTP.Tips('余额小于等于10元,不能启动充电!');
            } else {
                //启动类型1：自动充满；2：按金额充电
                var chargeType, chargingMoney;
                if ($('.charging-elect-amount-fullof').find('.charging-elect-amount-fullof-button').hasClass('clicked')) {
                    chargeType = "1";
                    chargingMoney = session.user.balance * 1;
                }
                if ($('.charging-elect-quota').find('.charging-elect-amount-fullof-button').hasClass('clicked')) {
                    chargeType = "2";
                    chargingMoney = $('.charging-elect-amount-fullof-button.clicked').prev('i').prev('input').val() * 1;
                    if (chargingMoney === '' || chargingMoney == 0) {
                        CTP.Tips("输入金额不能为空！");
                        return;
                    }
                    if (chargingMoney > session.user.balance) {
                        CTP.Tips("输入金额不能大于余额！");
                        return;
                    }
                }

                var params = {
                    userCode: session.user.userId,
                    chargingPileCode: pileDetails.chargePileCode + '01',//枪的编号
                    type: chargeType,
                    amount: chargingMoney,
                    //chargeAmount: fChargeAmount,
                    staticRequest: '0',

                    nonce: 'abc',
                    v: '1.0',
                    format: 'json',
                    method: 'charge.start',
                    locale: 'zh_CN',
                    appKey: session.appKey,
                    sessionId: session.sessionId,
                    timestamp: new Date().getTime()
                };
                CTP.dialog('充电启动中...', "如果长时间未启动成功,请检查充电枪是否连接成功。", function () {
                    //$('#ctp-dialog').hide();
                }, function () {
                    //exports.location.href = '../mine/addMoney.html?v=' + new Date().getTime();
                }, [], true);

                CTP.Ajax({
                    params: params,
                    url: '/msp-charge/router',
                    type: 'POST',
                    success: function (e) {
                        $('#charging-start-button-masks').fadeOut();
                        var stateAry = {
                            "2105": "充电桩状态为离线",//通过
                            "2100": "",
                            "2101": "",
                            "2102": "您有进行中的充电，请在完成充电并支付后再启动新充电！",//未测，没有其他的桩
                            "3100": "连接异常，请检查充电枪是否插入！",
                            "3101": "连接异常，请检查充电枪是否插入！",
                            "3102": "设备异常，请稍后再试或换其他充电桩！",
                            "3103": "该桩正在充电中，请勿再次启动！",//通过
                            "3104": "设备异常，请稍后再试或换其他充电桩！",
                            "3105": "设备异常，请稍后再试或换其他充电桩！",
                            "3106": "设备异常，请稍后再试或换其他充电桩！",
                            "3107": "设备异常，请稍后再试或换其他充电桩！",
                            "3108": "下发参数有误",
                            "3109": "车已充满",
                            "3110": "设备异常，请稍后再试或换其他充电桩！",
                            "3111": "设备异常，请稍后再试或换其他充电桩！",
                            "3120": "",
                            "2107": "该桩正在充电中，请勿再次启动！",
                            "2108": "编码不存在，请检查",
                            "2109": "编码不存在，请检查",
                            "2110": "设备异常，请稍后再试或换其他充电桩！",
                            "2111": "余额小于充电防溢出阈值",
                            "2112": "余额小于充电金额提示阈值",
                            "2113": "充电金额小于充电防溢出阈值"
                        };

                        setTimeout(function () {
                            $('#ctp-dialog').hide();
                            $('#ctp-dialog-mask').hide();

                            if (e.state == '0') {
                                $('#ctp-dialog').hide();
                                exports.sessionStorage.setItem('chargingOrderCode', e.data.orderCode);
                                setTimeout(function () {
                                    exports.location.href = './charging.html?v=' + new Date().getTime();
                                }, 500)
                            } else if (e.state == '1090') {//这个功能暂时不要了！
                                CTP.dialog('提示', e.message, function () {
                                    $('#ctp-dialog').hide();
                                }, function () {
                                    exports.location.href = '../mine/addMoney.html?v=' + new Date().getTime();
                                }, [{text: '稍后充值'}, {text: '马上充值'}]);
                            } else if (e.state == '2100') { //启动充电，有未支付订单
                                CTP.Tips("您订单未支付,请先支付订单后再充电");
                            } else if (e.state == '2101') {//该用户在当前枪有充电中的订单（重复启动充电的情况）
                                exports.setTimeout(function () {
                                    exports.location.href = './charging.html?v=' + new Date().getTime();
                                }, 500)
                            } else {
                                setTimeout(function () {
                                    $('#ctp-dialog').hide();
                                    CTP.Tips(e.message);
                                }, 1000)
                            }
                        }, 500)


                    },
                    complete: function (XHR, TextStatus) {
                        if (TextStatus === 'timeout')
                            CTP.Tips('请求超时！');
                    },
                    error: function (XHR, TextStatus) {
                        if (TextStatus === 'timeout')
                            CTP.Tips('请求超时！');
                    }
                });
            }

        } else {
            exports.location.href = '../register/userBind.html?v=' + new Date().getTime();
        }
    });
})(window);