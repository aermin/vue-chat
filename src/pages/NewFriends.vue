<template>
<div class="wrapper">
	<Header goback='true' chatTitle="新好友通知"></Header>
	<ul>
		<li v-for="data in newFriendGetter">
			<div @click="enterIt(data.from_user)">
				<img :src="data.avator" alt="">
				<div class="content">
					<p>{{data.name}}</p>
					<p>{{data.content}}</p>
				</div>
			</div>

			<div class="result">
				<span v-if="data.status === 0" class="agree-btn" @click="agreeBeFriend(data.from_user)">同意</span>
				<span v-if="data.status === 1">已通过验证</span>
			</div>
		</li>
	</ul>
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
			userInfo: {},
			time: ""
		}
	},
	computed: {
		...mapGetters([
			'newFriendGetter',

		])
	},

	watch: {},

	methods: {
		enterIt(val) {
			this.$router.push(`/user_info/${val}`)
		},
		//同意加好友
		async agreeBeFriend(val) {
			this.time = Date.parse(new Date()) / 1000;
			await axios.post('/api/v1/be_friend', {
				// user_id: this.userInfo.user_id,
				other_user_id: val,
				time: this.time //时间
			})
			this.updateNewFriends(val);
		},
		//更新验证状态
		async updateNewFriends(val) {
			await axios.put('/api/v1/update_newfriends', {
				from_user: val
				// to_user: this.userInfo.user_id
			})
			let data = {};
			this.newFriendGetter.forEach((ele) => {
				if (ele.from_user == val) {
					ele.status = 1;
					data = {
						avator: ele.avator, //加我的人的头像
						id: val, //加我的人的id
						other_user_id: val,
						message: "我们已成为好友，开始聊天吧！",
						time: Date.parse(new Date()) / 1000,
						name: ele.name, //加我的人的名字
						type: "private",
						action: "push"
					}
				}
			})
			this.$store.commit('updateListMutation', data)
			const data2 = {
				from_user: this.userInfo.user_id, //自己的id
				to_user: val,
				name: this.userInfo.name, //自己的昵称
				avator: this.userInfo.avator, //自己的头像
				message: data.message, //消息内容
				type: 'private',
				action: "request",
				status: '1', //是否在线 0为不在线 1为在线
				time: Date.parse(new Date()) / 1000 //时间
			};
			socket.emit('sendPrivateMsg', data2); //让对方的信息列表也可以显示添加成功的信息

		}
	},
	created() {
		this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
		this.$store.dispatch('newFriendAction', this.userInfo.user_id);
		this.$store.commit('friendReqTipsMutation', false);
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 0.7rem;
    ul {
        margin-top: 0.2rem;
        li {
            cursor: pointer;
            background-color: #fff;
            list-style-type: none;
            margin-bottom: 0.16rem;
            position: relative;
            img {
                width: 0.8rem;
                height: 0.8rem;
            }
            .content {
                display: inline-block;
                p:nth-child(1) {
                    font-size: 0.24rem;
                }
                p:nth-child(2) {
                    font-size: 0.2rem;
                    line-height: 0.8rem;
                    // margin-bottom: 0.02rem;
                }
            }
            .result {
                z-index: 999;
                span {
                    font-size: 0.2rem;
                    position: absolute;
                    right: 0.3rem;
                    // top: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .agree-btn {
                    color: #fff;
                    background-color: #1E90FF;
                    padding: 0.1rem 0.2rem;
                    border-radius: 0.03rem;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
