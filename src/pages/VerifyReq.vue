<template>
<div class="wrapper">
	<Message-box :messageBoxEvent="this.messageBox.messageBoxEvent" :visible="this.messageBox.visible" :hasCancel="this.messageBox.hasCancel" @cancel="cancel" @confirm="confirm">
		<p slot="content">{{this.messageBox.message}}</p>
	</Message-box>
	<Header goback='true' chatTitle="用户资料"></Header>
	<p>你需要发送验证申请，等对方通过</p>
	<textarea rows="5" v-model="textAreaContent"></textarea>
	<p class="send-btn" @click="send">发送</p>
</div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from "axios"
import {
	mapGetters
} from 'vuex'
export default {

	components: {
		Header
	},

	data() {
		return {
			textAreaContent: "您好，我想加您为好友",
			messageBox: {
				visible: false,
				message: "", //弹窗内容
				hasCancel: true, //弹窗是否有取消键
				messageBoxEvent: "" //弹窗事件名称
			},
			fromUserInfo: {}
		}
	},
	computed: {
		// ...mapGetters([
		//     'addAsFriendGetter'
		// ])
	},

	watch: {},

	methods: {
		send() {
			socket.emit('sendRequest', {
				from_user: this.fromUserInfo.user_id,
				to_user: this.$route.params.user_id, //对方id
				name: this.fromUserInfo.name,
				avator: this.fromUserInfo.avator,
				sex: this.fromUserInfo.sex,
				content: this.textAreaContent,
				time: Date.parse(new Date()) / 1000 //时间
			})
			//db持久化储存
			axios.post(
					'/api/v1/insert_newfriends', {
						// from_user: this.fromUserInfo.user_id,
						to_user: this.$route.params.user_id, //对方id
						content: this.textAreaContent,
						time: Date.parse(new Date()) / 1000, //时间
						status: 0
					})
				.catch(err => {
					console.log('err', err)
				})
			this.messageBox.messageBoxEvent = 'send'
			this.messageBox.visible = true;
			this.messageBox.message = "发送成功，等候回复哦"
		},
		confirm(value) {
			if (value === 'send') {
				const path = `/message`
				this.$router.push(path)
			}
		},
		cancel(value) {
			this.messageBox.visible = false;
		}
	},

	mounted() {
		this.fromUserInfo = JSON.parse(localStorage.getItem("userInfo"));
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 1rem;
    text-align: center;
    textarea {
        width: 100%;
        // margin: 0 auto;
        margin: 0.3rem 0;
        font-size: 0.26rem;
        /*去除点击出现轮廓颜色*/
        outline: none;
        /*去掉右下角的可拉伸变大小的图标和功能*/
        resize: none;
    }
    p {
        font-size: 0.32rem;
        margin: 0.2rem 0;
    }
    .send-btn {
        background-color: #4290F7;
        color: #fff;
        display: inline-block;
        font-size: 0.2rem;
        line-height: 0.26rem;
        padding: 0.16rem 0;
        width: 40%;
        cursor: pointer;
    }
}
</style>
