<template>
<!-- 群资料 -->
<div class="wrapper">
	<Header goback='true' chatTitle="群资料"></Header>
	<div class="content">
		<img :src="this.groupInfo.group_avator" alt="">
		<p>
			<span>群名</span>：{{this.groupInfo.group_name}}
		</p>
		<p>
			<span>群创建者</span>：{{this.groupInfo.group_creater}}
		</p>
		<p>
			<span>群创建时间</span>：{{this.groupInfo.creater_time}}
		</p>
		<p>
			<span>群公告</span>：{{this.groupInfo.group_notice}}
		</p>
	</div>
	<div class="action">
		<span v-if="isMyGroup" class="del-group" @click="exitGroup">退出群聊</span>
		<span class="go-chat" @click="goChat">{{isMyGroup ? '进入群聊' : '加入群聊' }}</span>
	</div>
	<!-- <div v-else class="action">
        <span class="go-chat" @click="goChat">加入群聊</span>
    </div> -->
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
			groupInfo: {}, //群资料
			userInfo: {}, //本机用户资料
			isMyGroup: null
		}
	},
	computed: {},
	components: {
		Header
	},
	methods: {
		//获取群资料
		getGroupInfo() {
			axios.get('/api/v1/get_group_info', {
				params: {
					groupId: this.$route.params.group_id
				}
			}).then(res => {
				console.log(res);
				this.groupInfo = res.data.data.groupInfo[0];
			}).catch(err => {
				console.log('err', err)
			})
		},
		//看该用户是否在某个群中(根据返回的数组长度是不是为零
		isInGroup() {
			axios.get('/api/v1/is_in_group', {
				params: {
					// user_id: this.userInfo.user_id,
					group_id: this.$route.params.group_id
				}
			}).then((res) => {
				this.isMyGroup = res.data.data.group_user.length === 0 ? false : true;
			})
		},
		exitGroup() {
			axios.delete('/api/v1/exit_group', {
				params: {
					// user_id: this.userInfo.user_id,
					group_id: this.$route.params.group_id
				}
			}).then((res) => {
				const data = {
					action: "delete",
					id: this.$route.params.group_id
				}
				this.$store.commit('updateListMutation', data)
				this.$router.push('/message');
			})
		},
		goChat() {
			const path = `/group_chat/${this.$route.params.group_id}`
			this.$router.push(path)
		}
	},
	async created() {
		this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
		await this.isInGroup();
		this.getGroupInfo();

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
        .del-group {
            background-color: #E16762;
            color: #fff;
        }
    }
}
</style>
