<template>
<div class="header">
	<svg v-show="goback" class="icon goback" aria-hidden="true" @click="goBack">
            <use  xlink:href="#icon-back"></use>
    </svg>
	<div>{{title}}</div>
	<svg v-show="currentTab === 1 || currentTab === 3" class="icon add" aria-hidden="true" @click="add">
            <use  xlink:href="#icon-add"></use>
    </svg>
	<svg v-show="groupInfo" class="icon add" aria-hidden="true" @click="lookGroupInfo">
            <use  xlink:href="#icon-group_fill-copy"></use>
    </svg>
	<svg v-show="userInfo" class="icon add" aria-hidden="true" @click="lookUserInfo">
            <use  xlink:href="#icon-group_fill-copy"></use>
    </svg>
</div>
</template>

<script>
export default {
	name: 'Header',
	props: ['currentTab', 'chatTitle', 'goback', 'groupInfo', 'userInfo'],
	data() {
		return {}
	},
	computed: {
		title() {
			if (this.currentTab === 1) {
				return '消息'
			} else if (this.currentTab === 2) {
				return '机器人'
			} else if (this.currentTab === 3) {
				return '通讯录'
			} else if (this.currentTab === 4) {
				return '我'
			} else {
				return this.chatTitle
			}
		}
	},
	methods: {
		add() {
			this.$router.push("/add");
		},
		lookGroupInfo() {
			const path = `/group_info/${this.$route.params.group_id}`;
			this.$router.push(path);
		},
		lookUserInfo() {
			const path = `/user_info/${this.$route.params.user_id}`;
			this.$router.push(path);
		},
		goBack() {
			this.$router.back();
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    line-height: 0.76rem;
    background: #1E90FF;
    color: white;
    font-size: 0.32rem;
    letter-spacing: 0.04rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9;
    .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }
    .add {
        font-size: 0.36rem;
        right: 0.2rem;
    }
    .goback {
        left: 0.2rem;
    }
}
</style>
