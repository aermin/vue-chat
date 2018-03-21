<template>
<!--  登录 -->
<div class="login">
	<Message-box :visible="this.messageBox.visible" :messageBoxEvent="this.messageBox.messageBoxEvent" @confirm="confirm" :hasCancel=false>
		<p slot="content">{{this.messageBox.message}}</p>
	</Message-box>
	<div class="wrapper fadeInDown">
		<div id="formContent">
			<h2 class="active"> 登录 </h2>
			<router-link to="/register">
				<h2 class="inactive"> 注册 </h2>
			</router-link>
			<div class="fadeIn first">
				<img src="../assets/icon.svg" id="icon" alt="User Icon" />
			</div>

			<form>
				<input type="text" class="fadeIn second" placeholder="用户名" v-model="name">
				<input type="password" class="fadeIn third" placeholder="密码" v-model="password">
				<input type="button" @click="login" class="fadeIn fourth" value="登录">
			</form>
		</div>
	</div>
</div>
</template>

<script>
import axios from "axios";
export default {
	name: "login",
	props: {},
	components: {},
	data() {
		return {
			name: "",
			password: "",
			messageBox: {
				visible: false,
				message: "", //弹窗内容
				hasCancel: true, //弹窗是否有取消键
				messageBoxEvent: "" // 弹窗事件名称
			}
		};
	},

	computed: {},

	watch: {},

	methods: {
		login() {
			if (this.name !== "" && this.password !== "") {
				axios.post("/api/v1/login", {
					name: this.name,
					password: this.password
				}).then(res => {
					if (res.data.success) {
						//保存soket.io
						socket.emit('login', res.data.userInfo.user_id)
						localStorage.setItem("userToken", res.data.token);
						localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
						//弹窗
						this.messageBox.messageBoxEvent = 'login'
						this.messageBox.visible = true;
						this.messageBox.message = "您已登录成功"
					} else {
						this.$message({
							message: res.data.message,
							type: "error"
						});
					}
				}).catch(err => {
					console.log(err)
					this.$message({
						message: '服务器出错啦',
						type: "error"
					});
				});
			} else {
				const message = this.name === "" ? "请输入用户名" : "请输入密码";
				this.$message({
					message: message,
					type: "warn"
				});
			}
		},
		confirm(value) {
			console.log('confirm', value)
			if (value === 'login') {
				this.messageBox.visible = false;
				this.$router.push("/message");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/loginregister.scss";
</style>
