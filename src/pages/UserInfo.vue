<template>
<!-- 用户资料 -->
<div class="wrapper">
	<!--弹窗-->
	<Message-box :messageBoxEvent="this.messageBox.messageBoxEvent" :visible="this.messageBox.visible" :title="	this.messageBox.title" :canInput="this.messageBox.canInput" :hasCancel="this.messageBox.hasCancel" @cancel="cancel" @confirm="confirm">
		<p slot="content">{{this.messageBox.message}}</p>
	</Message-box>
	<!--编辑用户资料-->
	<Message-box v-if="this.isMe" :messageBoxEvent="this.messageBox.messageBoxEvent" :visible="this.messageBox.visible" :title="this.messageBox.title" :canEditorInfo="this.messageBox.canEditorInfo" :myInfo="this.myInfo" :hasCancel="this.messageBox.hasCancel"
	    @cancel="cancel" @confirm="confirm">
		<p slot="content">{{this.messageBox.message}}</p>
	</Message-box>
	<Header goback='true' chatTitle="用户资料"></Header>
	<div class="content">
		<img :src="userInfo.avator" alt="">
		<p class="href">
			<span @click="goGithub"><svg class="icon" aria-hidden="true"><use  xlink:href="#icon-github"></use></svg></span>
			<span @click="goWebsite"><svg class="icon" aria-hidden="true"><use  xlink:href="#icon-web"></use></svg></span>
		</p>
		<p v-if="this.isMyFriend">
			<svg class="icon" aria-hidden="true"><use  xlink:href="#icon-tianjiabeizhu"></use></svg><span>备注</span>：{{this.remark}}
		</p>
		<p>
			<svg class="icon" aria-hidden="true"><use  xlink:href="#icon-yonghu"></use></svg><span>用户名</span>：{{userInfo.name}}
		</p>
		<p>
			<svg class="icon" aria-hidden="true"><use  xlink:href="#icon-xingbie"></use></svg><span>性别</span>：{{userInfo.sex === 0 ? '男' : '女' }}
		</p>
		<p>
			<svg class="icon" aria-hidden="true"><use  xlink:href="#icon-placeholder"></use></svg><span>来自</span>：{{userInfo.place}}
		</p>
	</div>
	<div v-if="this.isAddingMe" class="action">
		<span class="add-as-friend" @click="agreeBeFriend">通过验证</span>
	</div>
	<div v-if="this.isMyFriend === true && this.isHisFriend === true " class="action">
		<span class="editor-remark" @click="editorRemark">修改备注</span>
		<span class="go-chat" @click="goChat">发消息</span>
		<span class="shield-it" @click="shieldIt">屏蔽此人</span>
		<span class="de-friended" @click="deFriended">删除好友</span>
	</div>

	<div v-if="this.isMyFriend === true && this.isHisFriend === false " class="action">
		<span class="de-friended" @click="deFriended">删除好友</span>
		<span class="add-as-friend" @click="enterReqPage">让对方重新加自己为好友</span>
	</div>
	<div v-if="this.isMyFriend === false && this.isHisFriend === true && this.isAddingMe === false " class="action">
		<span class="add-as-friend" @click="enterReqPage">加为好友</span>
	</div>
	<div v-if="this.isMyFriend === false && this.isHisFriend === false && this.isAddingMe === false && this.isMe === false" class="action">
		<span class="add-as-friend" @click="enterReqPage">加为好友</span>
	</div>
	<div v-if="this.isMe" class="action">
		<span class="editor-info" @click="editorInfo">编辑我的信息</span>
	</div>
</div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from "axios"
import {
	mapGetters
} from 'vuex'
export default {
	data() {
		return {
			userInfo: {}, //用户信息
			myInfo: {}, //我的信息
			remark: '', //备注
			isMyFriend: false, //他是否是我的好友
			isHisFriend: false, //我是否是他的好友
			isAddingMe: false,
			isMe: false,
			messageBox: {
				visible: false, //弹窗是否显示
				title: "提示", //弹窗名称
				message: "", //弹窗内容
				canInput: false, //弹窗是否能输入
				hasCancel: true, //弹窗是否有取消键
				messageBoxEvent: "", //弹窗事件名称
				canEditorInfo: false //编辑用户资料的弹窗
			}
		}
	},
	computed: {
		...mapGetters([
			'newFriendGetter'
		])
	},
	components: {
		Header
	},
	methods: {
		//获取用户资料
		getInfo() {
			//如果是自己，那就用本地的个人信息即可，省一次请求
			if (this.isMe) {
				this.userInfo = this.myInfo;
				return
			}
			axios.get('/api/v1/user_info', {
				params: {
					user_id: this.$route.params.user_id
				}
			}).then(res => {
				this.userInfo = res.data.data.userInfo[0];
			}).catch(err => {
				console.log('err1', err)
			})
		},
		// 查询此用户是否是我的好友
		isFriend() {
			axios.get('/api/v1/is_friend', {
				params: {
					// user_id: this.myInfo.user_id,
					other_user_id: this.$route.params.user_id
				}
			}).then(res => {
				// console.log("isFriend", res)
				if (res.data.data.isMyFriend.length != 0) {
					this.isMyFriend = true;
					this.remark = res.data.data.isMyFriend[0].remark;
				}
				if (res.data.data.isHisFriend.length != 0) {
					this.isHisFriend = true;
				}
				// console.log(this.isMyFriend, "====", this.isHisFriend)
			}).catch(err => {
				console.log('err2', err)
			})
		},
		//判断这个人是否请求加我未通过
		isAddingMeFun() {
			console.log('this.newFriendGetter', this.newFriendGetter)
			this.newFriendGetter.forEach((ele) => {
				// console.log(ele.from_user, '=====', this.$route.params.user_id)
				if (ele.from_user == this.$route.params.user_id && ele.status !== 1) {
					this.isAddingMe = true;
					return
				}
			})
		},
		//点击跳转到对方的gihub
		goGithub() {
			if (this.userInfo.github) {
				window.location.href = this.userInfo.github;
			} else {
				this.$message({
					message: '对方尚未放他的github链接哦',
					type: "error"
				});
			}
		},
		//点击跳转到对方的网站
		goWebsite() {
			if (this.userInfo.website) {
				window.location.href = this.userInfo.website;
			} else {
				this.$message({
					message: '对方尚未放他的网站链接哦',
					type: "error"
				});
			}
		},
		//进入验证页面
		enterReqPage() {
			const path = `/user_info/verify/${this.$route.params.user_id}`
			this.$router.push(path)
		},
		//进入聊天页面
		goChat() {
			const path = `/private_chat/${this.$route.params.user_id}`
			this.$router.push(path)
		},
		//重新加载本页面
		stay() {
			const path = `/user_info/${this.$route.params.user_id}`
			this.$router.push(path)
		},
		//修改备注
		editorRemark() {
			this.messageBox.messageBoxEvent = 'editorRemark'
			this.messageBox.visible = true;
			this.messageBox.canInput = true;
			this.messageBox.title = '修改备注';
		},
		//修改我的信息
		editorInfo() {
			this.messageBox.messageBoxEvent = 'editorInfo'
			this.messageBox.visible = true;
			this.messageBox.canEditorInfo = true;
			this.messageBox.title = '修改我的信息';
		},
		//屏蔽此人
		shieldIt() {},
		//删除好友
		deFriended() {
			this.messageBox.messageBoxEvent = 'delFriend'
			this.messageBox.visible = true;
			this.messageBox.message = "确定要删除此好友？"
		},
		//同意加好友
		async agreeBeFriend() {
			await axios.post('/api/v1/be_friend', {
				// user_id: this.myInfo.user_id,
				other_user_id: this.$route.params.user_id
			})
			await this.updateNewFriends();
			this.messageBox.messageBoxEvent = 'agreeBeFriend'
			this.messageBox.visible = true;
			this.messageBox.message = "添加好友成功，进入聊天？"
			// })
		},
		//更新验证状态
		async updateNewFriends() {
			await axios.put('/api/v1/update_newfriends', {
				from_user: this.$route.params.user_id
				// to_user: this.myInfo.user_id
			})
		},
		//弹窗取消事件
		cancel(value) {
			this.messageBox.visible = false;
			this.messageBox.canInput = false;
			this.messageBox.message = null;
			if (value === 'agreeBeFriend') {
				location.reload();
			}
		},
		//弹窗确定事件
		confirm(value) {
			//删除好友
			if (value === 'delFriend') {
				axios.delete('/api/v1/del_friend', {
					params: {
						// user_id: this.myInfo.user_id,
						other_user_id: this.$route.params.user_id
					}
				}).then(res => {
					this.messageBox.visible = false;
					this.messageBox.message = null;
					const data = {
						action: "delete",
						id: this.$route.params.user_id
					}
					this.$store.commit('updateListMutation', data)
					this.$message({
						message: '删除此好友成功',
						type: "success"
					});
					this.isMyFriend = false;
				}).catch(err => {
					console.log('err', err)
				})
			}
			//同意加为好友
			if (value === 'agreeBeFriend') {
				this.goChat();
			}
			//修改备注
			if (value.messageBoxEvent === 'editorRemark') {
				axios.put('/api/v1/editor_remark', {
					remark: value.canInputText,
					// user_id: this.myInfo.user_id,
					other_user_id: this.$route.params.user_id
				}).then((res) => {
					this.remark = value.canInputText;
					this.messageBox.canInput = false;
					this.messageBox.visible = false;
				})
			}
			//编辑个人信息
			if (value.messageBoxEvent === 'editorInfo') {
				//验证url
				var urlP = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
				var re = new RegExp(urlP);
				console.log('value.myInfo.website', value.myInfo.website)
				if (value.myInfo.website) {
					if (!re.test(value.myInfo.website)) {
						this.$message({
							message: '请输入正确的网址',
							type: "error"
						});
						return
					} else {
						value.myInfo.website = value.myInfo.website.substr(0, 4) != 'http' ? ('http://' + value.myInfo.website) : value.myInfo.website;
					}
				}
				if (value.myInfo.github) {
					if (!re.test(value.myInfo.github)) {
						this.$message({
							message: '请输入正确的网址',
							type: "error"
						});
						return
					} else {
						value.myInfo.github = value.myInfo.github.substr(0, 4) != 'http' ? ('http://' + value.myInfo.github) : value.myInfo.github;
					}
				}
				console.log(value.myInfo)
				axios.put('/api/v1/editor_info', {
					github: value.myInfo.github,
					website: value.myInfo.website,
					sex: value.myInfo.sex,
					place: value.myInfo.place
				}).then((res) => {
					localStorage.setItem("userInfo", JSON.stringify(value.myInfo));
					this.messageBox.visible = false;
				})
			}
		}
	},
	async created() {
		this.myInfo = JSON.parse(localStorage.getItem("userInfo"));
		this.isMe = this.myInfo.user_id == this.$route.params.user_id ? true : false;
		await this.$store.dispatch('newFriendAction', this.myInfo.user_id)
		await this.isAddingMeFun();
		await this.isFriend();
		this.getInfo();
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    padding-top: 0.1rem;
    .content {
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        img {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            margin: 1rem 0 0.6rem;
        }
        p {
            font-size: 0.28rem;
            line-height: 0.8rem;
            color: #4290F7;
            .icon {
                font-size: 1.6em;
            }
            span {
                font-size: 0.14rem;
            }
        }
        .href {
            text-align: center;
            span {
                font-size: 0.3rem;
                cursor: pointer;
            }
        }
    }
    .action {
        position: absolute;
        width: 100%;
        top: 8.8rem;
        text-align: center;
        span {
            display: inline-block;
            font-size: 0.26rem;
            line-height: 0.26rem;
            padding: 0.16rem 0;
            width: 40%;
            cursor: pointer;
        }
        .go-chat {
            background-color: #4290F7;
            color: #fff;
        }
        .editor-remark {
            background-color: #fff;
            color: #4290F7;
        }
        .shield-it {
            background-color: #fff;
            color: #4290F7;
        }
        .de-friended {
            background-color: #E16762;
            color: #fff;
        }
        .add-as-friend,
        .editor-info {
            background-color: #4290F7;
            color: #fff;
        }
    }
}
</style>
