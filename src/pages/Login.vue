<template>
    <!--  登录 -->
    <div class="login">
        <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 class="active"> 登录 </h2>
                <h2 class="inactive underlineHover" @click="$router.push('/register')">注册 </h2>
    
                <div class="fadeIn first">
                    <img src="../assets/icon.svg" id="icon" alt="User Icon" />
                </div>
    
                <form>
                    <input type="text" id="login" class="fadeIn second" name="login" placeholder="用户名">
                    <input type="text" id="password" class="fadeIn third" name="login" placeholder="密码">
                    <input type="submit" class="fadeIn fourth" value="登录">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        props: {},
        components: {},
        data() {
            return {};
        },
    
        computed: {},
    
        watch: {},
    
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '../assets/loginregister.scss';
</style>
