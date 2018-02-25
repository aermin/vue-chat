<template>
<!--  注册 -->
<div class="login">
	<div class="wrapper fadeInDown">
		<div id="formContent">
			<router-link to="/login">
				<h2 class="inactive underlineHover"> 登录 </h2>
			</router-link>
			<h2 class="active">注册 </h2>

			<div class="fadeIn first">
				<img src="../assets/icon.svg" id="icon" alt="User Icon" />
			</div>

			<form>
				<input type="text" class="fadeIn second" v-model="name" placeholder="用户名">
				<input type="password" class="fadeIn third" v-model="password" placeholder="密码">
				<input type="submit" @click="register" class="fadeIn fourth" value="注册">
			</form>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			name: '',
			password: '',
		}
	},
	methods: {
		register() {
			if (this.name !== "" && this.password !== "") {
				axios.post(
					'/api/v1/register', {
						name: this.name,
						password: this.password
					}).then(res => {
					console.log(res);
					if (res) {
						if (res.data.success) {
							this.$message({
								message: res.data.message,
								type: "success"
							});
							let self = this;
							setTimeout(function() {
								self.$router.push({
									path: "/login"
								});
							}, 4000);
						} else {
							this.$message({
								message: res.data.message,
								type: "error"
							});
						}
					}
				}).catch(err => {
					console.log(err)
					// const errorMsg = err.response.data.error
					// this.$message({
					// 	message: errorMsg,
					// 	type: "error"
					// });
				})
			} else {
				const message = this.name === "" ? "请输入用户名" : "请输入密码";
				this.$message({
					message: message,
					type: "warn"
				});
			}

		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/loginregister.scss';
</style>
