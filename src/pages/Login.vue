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
                    <input type="text" class="fadeIn second" placeholder="用户名" v-model="name">
                    <input type="text" class="fadeIn third" placeholder="密码" v-model="password">
                    <input type="submit" @click="login" class="fadeIn fourth" value="登录">
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
                password: ""
            };
        },
    
        computed: {},
    
        watch: {},
    
        methods: {
            login() {
                if (this.name !== "" && this.password !== "") {
                    axios
                        .post("/api/v1/login", {
                            name: this.name,
                            password: this.password
                        })
                        .then(res => {
                            console.log(res);
                            if (res) {
                                if (res.data.success) {
                                    localStorage.setItem("userToken", res.data.token);
                                    this.$message({
                                        message: res.data.message,
                                        type: "success"
                                    });
                                    let self = this;
                                    setTimeout(function() {
                                        self.$router.push({
                                            path: "/message"
                                        });
                                    }, 4000);
                                } else {
                                    this.$message({
                                        message: res.data.message,
                                        type: "error"
                                    });
                                }
    
                            }
                        })
                        .catch(err => {
                            const errorMsg = err.response.data.error;
                            this.$message({
                                message: errorMsg,
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/loginregister.scss";
</style>
