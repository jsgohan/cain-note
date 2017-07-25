/**
 * Created by zhanghang on 2016/10/9.
 */

if (!CTP) {
    var CTP = {};
}

(function (exports) {

   if (CTP.checkLogin()) {
       var session = JSON.parse(exports.sessionStorage.getItem('session'));
       $('p.tel input').val(session.user.phone);

       function countdownFn(val, sec) {
           var countdown = sec;

           function settime(val) {
               if (countdown == 0) {
                   $(val).next('a').text('发送验证码').removeClass('disable');
                   countdown = sec;

               } else {
                   $(val).next('a').text("重新发送(" + countdown + ")").addClass('disable');
                   countdown--;
                   setTimeout(function () {
                       settime(val);
                   }, 1000)
               }

           }

           settime(val);
       }
       function getJyCode(me) {
           var _params = {
               mobile: $('.tel input').val(),
               validCode: '',
               method: 'user.sendvalidcode',
               reason: 'bind_wechat',

               appKey: session.appKey,
               locale: 'zh_CN',
               format: 'json',
               v: '1.0',
               nonce: 'abc'
           };
           CTP.Ajax({
               params: _params,
               url: '/msp-cas/router',
               type: 'POST',
               success: function (e) {
                   if (e.successful) {
                       if (!e.userexists) {
                       } else {
                           countdownFn(me, 60);
                           $('.btn').bind('click', function () {
                                exports.location.href='./bindNewPhone.html?v=' + new Date().getTime();
                           });
                       }
                   }
                   if (e.code == '9') {
                       CTP.Tips(e.subErrors[0].message);
                   }

               },
               error: function (e) {
                   alert('status' + e.status);
                   alert('readyState' + e.readyState);
                   alert('textStatus' + e.statusText);
               }
           });
       }
       $('.sendCode a').bind('click', function () {
           var self = $(this),
               input = self.parent().find('input').get(0);
           if (!self.hasClass('disable')) {
               getJyCode(input);
           } else {
               CTP.Tips('不要频繁获取!');
           }
       });


   } else {

   }

})(window);