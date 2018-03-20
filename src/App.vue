<template>
<div id="app">
	<!-- <img src="./assets/logo.png"> -->
	<router-view></router-view>
</div>
</template>

<style lang="scss" type="text/css">
*,
*:after,
*:before {
    max-height: 100000px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // -webkit-tap-highlight-color: rgba(0,0,0,0);
    // -ms-touch-action: none;
    // -webkit-touch-callout: none;
    // user-select: none;
    // text-size-adjust: none;
}

body,
html {
    background-color: #F5F6F8;
    width: 100%;
    height: 100%;
    font-family: 'Microsoft Yahei' !important;
}

::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .1);
}

.icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.3em;
    fill: currentColor;
    overflow: hidden;
}
</style>

<script>
export default {
	name: 'App',
	methods: {
		// 获取新好友通知
		getReqBySocket() {
			socket.on('getresponse', (data) => {
				console.log('获取新好友通知', data);
				// 存vuex
				this.$store.commit('newFriendMutation', data)
				this.$store.commit('friendReqTipsMutation',true);
			})
		}
	},
	created() {
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
			console.log(ratio)
			var scale = document.createElement('meta');
			var scaleRatio = 1 / ratio;
			scale.name = 'viewport';
			scale.content = 'width=device-width,' + 'initial-scale=' + scaleRatio + ', maximum-scale=' + scaleRatio + ', minimum-scale=' +
				scaleRatio + ', user-scalable=no';
			var s = document.getElementsByTagName('title')[0];
			s.parentNode.insertBefore(scale, s);
			var _baseFontSize = baseFontSize || 100;
			var _fontscale = fontscale || 1;
			document.documentElement.style.fontSize = _baseFontSize / 2 * ratio * _fontscale + 'px';

		}
		if (window.screen.width >= 768) {
			screenRatio(100, 1.3); //字体放大1.3倍
		} else {
			screenRatio();
		}
	},
	mounted() {
		this.getReqBySocket();
	}
}
</script>
