
function getBrowser(){
	var browser = {
		versions: function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {//移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}

	return browser;
}

var browser = getBrowser();
//console.log("android:"+browser.versions.android);
//
//console.log("ios:"+browser.versions.ios);
//
//console.log("mobile:" + browser.versions.mobile);

if(!browser.versions.ios && !browser.versions.android && !browser.versions.mobile){
	$('body').html("<div style='color:#808080; width: 100%;'>当前浏览器不支持，请在移动端打开此页面，O(∩_∩)O谢谢！</div>");
}


function appdownFun(){
	var appDownUrl = "http://119.29.100.43:7888/upgrade/api/version/setup_version?appCode=charge&nsukey=dpNp%2Fbj67reZloWYnKpOiS1%2FRhPbx6mFT16FlO4oNsnVtxE26Hxx0z8DxdK3x3yLkJ%2BOc9oWyUGrIKiaPYPGwQ%3D%3D";
	
	window.location.href = appDownUrl;
}

function appmousedown(imgObj){
	if(imgObj.src){
		imgObj.src = "c_share_download_pressed.png";
	}
}

function appmouseup(imgObj){
	if(imgObj.src){
		imgObj.src = "c_share_download_normal.png";
	}
}