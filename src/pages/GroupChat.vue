<template>
<!--  群聊 -->
<div class="wrapper">
	<Header goback='true' groupInfo='true' :chatTitle="groupInfoGetter.group_name"></Header>
	<ul>
		<li v-for="item in message">
			<ChatItem v-if="userInfo.user_id === item.from_user" :href="item.from_user" :img="item.avator" me="true" :msg="item.message" :name="item.name" :time="item.time"></ChatItem>
			<ChatItem v-else :img="item.avator" :msg="item.message" :href="item.from_user" :name="item.name" :time="item.time"></ChatItem>
		</li>
	</ul>
	<div class="input-msg">
		<textarea v-model="inputMsg" @keydown.enter.prevent="sendMessage"></textarea>
		<p class="btn" :class="{'enable':inputMsg!=''}" @click="sendMessage">{{btnInfo}}</p>
	</div>
</div>
</template>

<script>
import Header from '../components/Header.vue'
import ChatItem from '../components/ChatItem.vue'
import axios from "axios"
import {
	toNomalTime
} from "../utils/transformTime";
import {
	mapGetters
} from 'vuex'
export default {
	components: {
		Header,
		ChatItem
	},
	data() {
		return {
			groupInfo: {
				groupId: '' //群id
			},
			groupAvator: '', //群头像
			groupMember: [], //群成员id
			message: [], //群消息
			inputMsg: '',
			userInfo: {},
			btnInfo: "发送"
		};
	},

	computed: {
		...mapGetters([
			'groupInfoGetter', //群资料
			'groupMemberGetter' //群成员
		])
	},

	watch: {
		message() {
			this.refresh();
		}
	},
	methods: {
		//获取聊天记录
		getChatMsg() {
			axios.get(
					'/api/v1/group_chat', {
						params: {
							groupId: this.groupInfo.groupId
						}
					}).then((res) => {
					if (res.data.success) {
						this.message = res.data.data.groupMsg;
						this.$store.commit('groupInfoMutation', res.data.data.groupInfo[0])
						this.$store.commit('groupMemberMutation', res.data.data.groupMember)
						// 群成员不存在此用户id，则添加
						if (!res.data.data.groupMember.includes(this.userInfo.user_id)) {
							this.addGroupUserRelation();
							const data = {
								action: "push",
								message: "您已成功加入此群！",
								group_avator: this.groupInfoGetter.group_avator,
								group_name: this.groupInfoGetter.group_name,
								time: this.groupInfoGetter.creater_time,
								group_id: this.groupInfoGetter.group_id,
								type: "group",
								id: this.groupInfoGetter.group_id
							}
							// this.$store.commit('updateListMutation', data)
							this.$store.commit('updateListMutation', data)
						}
						if (this.message.length == 0) return
						this.message.forEach(element => {
							element.time = toNomalTime(element.time);
							element.message = element.message.split(':')[1];
						});
					}
				})
				.catch(err => {
					const errorMsg = err.response.data.error
					this.$message({
						message: errorMsg,
						type: "error"
					});
				})
		},
		//发送信息
		async sendMessage() {
			if (this.inputMsg.trim() == '') return
			//  if (!this.groupMemberGetter.includes(this.userInfo.user_id)) {
			//        await this.addGroupUserRelation();
			// }
			// console.log('sendGroupMsg', this.groupInfoGetter)
			let data = {
				groupId: this.groupInfo.groupId, //群id
				group_name: this.groupInfoGetter.group_name, //群名称
				group_avator: this.groupInfoGetter.group_avator, //群头像
				groupMember: this.groupMemberGetter, //所有群成员的id
				from_user: this.userInfo.user_id, //自己的id
				name: this.userInfo.name, //自己的昵称
				avator: this.userInfo.avator, //自己的头像
				message: this.inputMsg, //消息内容
				time: Date.parse(new Date()) / 1000 //时间
			}
			socket.emit('sendGroupMsg', data)
			this.saveMsgByDB();

		},
		//保存此条信息到数据库
		saveMsgByDB() {
			axios.post('/api/v1/group_chat_msg', {
				groupId: this.groupInfo.groupId,
				message: this.inputMsg,
				name: this.userInfo.name,
				time: Date.parse(new Date()) / 1000
			}).then((res) => {
				this.inputMsg = '';
			})
		},

		// 把新成员加入群名单
		addGroupUserRelation() {
			axios.post(
				'/api/v1/group_chat_relation', {
					groupId: this.groupInfo.groupId
				}).then(res => {
				console.log('group_chat_relation', res)
				if (res.data.success) {
					// 更新群成员
					this.$store.commit('groupMemberMutation', res.data.data.groupMember)
				}
			})
		},
		// 获取socket消息
		getMsgBySocket() {
			socket.removeAllListeners('getGroupMsg');
			socket.on('getGroupMsg', (data) => {
				console.log('聊天内获取群聊消息', data);
				//收到soket群信息 如果该群群成员不包含自己 放弃这条soket
				// if (!data.groupMember.includes(this.userInfo.user_id)) return ;
				if (!this.groupMemberGetter.includes(this.userInfo.user_id)) return;
				//如果收到的soket信息不是来自当前聊天群 写入首页信息列表 并return
				data.type = 'group'
				if (data.groupId != this.groupInfo.groupId) {
					this.$store.commit('updateListMutation', data)
					return
				} else {
					//soket信息来自当前聊天群 vuex添加此条信息
					data.chatOfNow = true;
					this.$store.commit('updateListMutation', data)
					//本地添加此条信息
					// console.log('data.time', data.time)
					this.message.push(data);
				}
			})
		},
		//将未读信息归零
		resetUnred() {
			this.$store.commit('resetUnredMutation', this.groupInfo.groupId)
		},
		// 消息置底
		refresh() {
			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight + 10000)
			}, 0)
		}
	},
	async created() {
		this.groupInfo.groupId = this.$route.params.group_id;
		this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
		await this.getChatMsg();
		this.resetUnred();
		this.getMsgBySocket()
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/chat.scss";
</style>
