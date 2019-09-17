<template>
<!-- 机器人聊天 -->
<div class="wrapper">
	<Header :currentTab="currentTab"></Header>
	<ul>
		<li v-for="msg in robotMsgGetter">
			<ChatItem v-if="msg.user" img="https://avatars2.githubusercontent.com/u/24861316?s=460&v=4" :msg="msg.message" :name="msg.user" :time="time"></ChatItem>
			<ChatItem v-if="!msg.user" me="true" :img=img :msg="msg.message" :time="time"></ChatItem>
		</li>
	</ul>
	<div class="input-msg">
		<textarea v-model="inputMsg" @keydown.enter.prevent="sendMessage" ref="message"></textarea>
		<p class="btn" :class="{'enable':inputMsg!=''}" @click="sendMessage">发送</p>
	</div>

	<Footer :currentTab="currentTab"></Footer>

</div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ChatItem from '../components/ChatItem.vue'
import axios from "axios";
import {
	mapGetters
} from 'vuex';
import {
	toNomalTime
} from "../utils/transformTime";
export default {
	name: 'Robot',
	data() {
		return {
			currentTab: 2,
			time: toNomalTime(Date.parse(new Date()) / 1000),
			inputMsg: "",
			img: "",
			isScrollToBottom: true
		}
	},
	components: {
		Header,
		Footer,
		ChatItem
	},
	methods: {
		async sendMessage() {
			if (this.inputMsg.trim() == '') return;
			this.$store.commit('robotMsgMutation', { //提交自己的内容
				message: this.inputMsg
			})
			await this.$store.dispatch('robatMsgAction', { //提交由自己输入内容作为参数请求接口异步得来的内容（机器人的回复）
				message: this.inputMsg
			})
			this.inputMsg = '';
		},
		refresh() {
			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight + 10000)
			}, 0)
		}
	},
	watch: {
		robotMsgGetter() { //当数据改变了,则自动刷新
			this.refresh();
		}
	},
	computed: {
		...mapGetters([
			'robotMsgGetter'
		])
	},
	created() {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		this.img = userInfo.avator;
	},
	mounted() {
		// const date = Date.parse(new Date());
		// console.log('date', date)
		// this.time = ;
		setTimeout(() => {
			this.refresh();
		}, 200)
	},
}
</script>

<style lang="scss" scoped>
.wrapper {
    // height: 100vh;
    padding-top: 0.6rem;
    z-index: 1;
    ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-bottom: 1.6rem;
        // touch-action:none !important;
        li {
            margin-top: -1rem;
            padding: 0;
        }
    }
    .input-msg {
        height: 0.46rem;
        position: fixed;
        bottom: 0.62rem;
        display: flex;
        width: 100%;
        z-index: 999;
        textarea {
            width: 87.8%;
            margin: 0 0.06rem;
            padding-top: 0.07rem;
            padding-left: 0.06rem;
            border-radius: 0.02rem;
            outline: none;
            resize: none;
            border: none;
            overflow-y: hidden;
            font: 0.16rem/0.18rem 'Microsoft Yahei';
        }
        p.btn {
            font-size: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin-right: 0.06rem;
            height: 100%;
            width: 11%;
            background: #ccc;
            color: white;
            border-radius: 0.02rem;
            cursor: not-allowed;
            font-family: 'Microsoft Yahei';
            &.enable {
                background: #1E90FF;
                cursor: pointer;
            }
        }
    }
}
</style>
