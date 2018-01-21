<template>
    <!--  登录 -->
    <div class="login">
        <Tips :tipStyle="tipStyle" :tipMessage="tipMessage" :tipShow="tipShow"></Tips>
        <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 class="inactive underlineHover" @click="$router.push('/login')"> 登录 </h2>
                <h2 class="active">注册 </h2>
    
                <div class="fadeIn first">
                    <img src="../assets/icon.svg" id="icon" alt="User Icon" />
                </div>
    
                <form>
                    <input type="text" class="fadeIn second" v-model="name" placeholder="用户名">
                    <input type="text" class="fadeIn third" v-model="password" placeholder="密码">
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
                tipStyle: "",
                tipMessage: '',
                tipShow: false
            }
        },
        methods: {
            register() {
                if (this.name !== "" && this.password !== "") {
                    axios.post(
                            '/api/v1/register', {
                                name: this.name,
                                password: this.password
                            })
                        .then(res => {
                            this.tipShow = true;
                            if (res.data) {
                                if (res.data.resCode === "SUCCESS") {
                                    this.tipStyle = "success";
                                    this.tipMessage = "注册成功！";
    
                                } else if (res.data.resCode === "URSER_EXIST") {
                                    this.tipStyle = "warn";
                                    this.tipMessage = "用户名已存在";
                                }
                                let self = this;
                                setTimeout(function() {
                                    self.tipShow = false;
                                    self.$router.push({
                                        path: '/login'
                                    });
                                }, 2500)
                            }
                        })
                        .catch(err => {
                            const errorMsg = err.response.data.error
                            alert(errorMsg)
                        })
                } else {
                    this.tipShow = true;
                    this.tipStyle = "warn";
                    this.tipMessage = this.name === "" ? "请输入用户名" : "请输入密码";
                    let self = this;
                    setTimeout(function() {
                        self.tipShow = false;
                    }, 2500)
                }
    
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/loginregister.scss';
</style>
