<template>
    <!--  登录 -->
    <div class="login">
        <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 class="inactive underlineHover" @click="$router.push('/login')"> 登录 </h2>
                <h2 class="active">注册 </h2>
    
                <div class="fadeIn first">
                    <img src="../assets/icon.svg" id="icon" alt="User Icon" />
                </div>
    
                <form>
                    <input type="text" id="login" class="fadeIn second" v-model="username" placeholder="用户名">
                    <input type="text" id="password" class="fadeIn third" v-model="password" placeholder="密码">
                    <input type="submit"  @click="register" class="fadeIn fourth" value="注册">
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
                username: '',
                password: ''
            }
        },
        methods: {
            register() {
                axios.post(
                        '/api/v1/register', {
                            username: this.username,
                            password: this.password
                        })
                    .then(res => {
                        const data = res.resCode;
                        // localStorage.setItem('ashenToken', data)
                        console.log(data);
                        // this.$router.push('/login')
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
