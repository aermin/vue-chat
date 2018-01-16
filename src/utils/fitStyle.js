//获取屏幕比例
function sreenRatio() {
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    var dpr = window.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
    }
    return dpr;
}
//初始化屏幕比例
function screenRatio(baseFontSize, fontscale) {
    var ratio = sreenRatio();
    var scale = document.createElement('meta');
    var scaleRatio = 1 / ratio;
    scale.name = 'viewport';
    <%/*安卓设备兼容*/%>
    if (/Android/i.test(navigator.userAgent) == true) {
        scale.content = 'width=device-width, target-densitydpi=device-dpi,'+' initial-scale=' + scaleRatio + ', maximum-scale=' + scaleRatio + ', minimum-scale=' +
            scaleRatio + ', user-scalable=no';
    <%/*iOS设备*/%>
    } else {
        scale.content = 'width=device-width,'+'initial-scale=' + scaleRatio + ', maximum-scale=' + scaleRatio + ', minimum-scale=' +
            scaleRatio + ', user-scalable=no';
    }
    var s = document.getElementsByTagName('title')[0];
    s.parentNode.insertBefore(scale, s);
    var _baseFontSize = baseFontSize || 100;
    var _fontscale = fontscale || 1;
    document.documentElement.style.fontSize = _baseFontSize / 2 * ratio * _fontscale+'px';
}
var isAndroid = /Android/i.test(navigator.userAgent) ? true : false;
<%/*安卓设备不做高清放大处理*/%>
if (window.screen.width >= 768 && !isAndroid) {
    screenRatio(null, 1.5);<%/*字体放大1.5倍*/%>
} else {
    screenRatio();
}
