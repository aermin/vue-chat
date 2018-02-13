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
		// 获取socket消息
		getMsgBySocket() {
			socket.on('getresponse', (data) => {
				console.log('getresponse', data);
				this.$store.commit('newFriendMutation', data)
			})
		},
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
						avator: ele.avator,
						id: val,
						other_user_id: val,
						message: "你们已成为好友！",
						time: this.time,
						name: ele.name,
						type: "private",
						action: "push",
					}
				}
			})
			// console.log('updateListMutationdata', data)
			this.$store.commit('updateListMutation', data)
		}
	},
	created() {
		this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
		this.$store.dispatch('newFriendAction', this.userInfo.user_id)
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
