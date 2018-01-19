<template>
    <!--  登录 -->
    <div class="login">
        <Tips :tipStyle="tipStyle" :tipMessage="tipMessage" :ifShow="ifShow"></Tips>
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
    import Tips from '../components/Tips.vue'
    export default {
        components: {
            Tips
        },
        data() {
            return {
                name: '',
                password: '',
                tipStyle: "",
                tipMessage: '',
                ifShow: false
            }
        },
        methods: {
            register() {
                axios.post(
                        '/api/v1/register', {
                            name: this.name,
                            password: this.password
                        })
                    .then(res => {
                        if (res.data.resCode === "SUCCESS") {
                            console.log(213)
                            this.ifShow = true;
                            this.tipStyle = "success";
                            this.tipMessage = "注册成功！";
                            let self = this;
                            setTimeout(function() {
                                self.ifShow = false;
                                this.$router.push('/login')
                            }, 3000)
                        } else if (res.data.resCode === "URSER_EXIST") {
                            this.ifShow = true;
                            this.tipStyle = "success";
                            this.tipMessage = "用户名已存在";
                            let self = this;
                            setTimeout(function() {
                                self.ifShow = false;
                            }, 3000)
                        }
    
                    })
                    .catch(err => {
                        const errorMsg = err.response.data.error
                        alert(errorMsg)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/loginregister.scss';
</style>
