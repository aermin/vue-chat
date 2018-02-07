<template>
    <!-- 用户资料 -->
    <div class="wrapper">
        <Message-box :visible="visible" :title="title" @cancel="cancel" @confirm="confirm">
            <p slot="content">{{message}}</p>
        </Message-box>
        <Header goback='true' chatTitle="用户资料" @showMessageBox="showMessageBox"></Header>
        <div class="content">
            <img :src="userInfo.avator" alt="">
            <p class="href">
                <span @click="goGithub">
                            <svg class="icon" aria-hidden="true"><use  xlink:href="#icon-github"></use></svg>
                        </span>
                <span @click="goWebsite">
                            <svg class="icon" aria-hidden="true"><use  xlink:href="#icon-web"></use></svg>
                        </span>
            </p>
            <p v-if="this.isMyFriend">
                <svg class="icon" aria-hidden="true"><use  xlink:href="#icon-tianjiabeizhu"></use></svg><span>备注</span>：{{this.remark}}
            </p>
            <p>
                <svg class="icon" aria-hidden="true"><use  xlink:href="#icon-yonghu"></use></svg><span>用户名</span>：{{userInfo.name}}
            </p>
            <p>
                <svg class="icon" aria-hidden="true"><use  xlink:href="#icon-xingbie"></use></svg><span>性别</span>：{{userInfo.sex}}
            </p>
            <p>
                <svg class="icon" aria-hidden="true"><use  xlink:href="#icon-placeholder"></use></svg><span>来自</span>：{{userInfo.place}}
            </p>
    
            <p>
    
            </p>
        </div>
    
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import axios from "axios"
    export default {
        data() {
            return {
                visible: false,
                title: "提示",
                message: "",
                userInfo: {}, //用户信息
                myInfo: {}, //我的信息
                remark: '', //备注
                isMyFriend: false
            }
        },
        components: {
            Header
        },
        methods: {
            //获取用户资料
            getInfo() {
                axios.get('/api/v1/user_info', {
                    params: {
                        user_id: this.$route.params.user_id
                    }
                }).then(res => {
                    console.log(res);
                    this.userInfo = res.data.data.userInfo[0];
                }).catch(err => {
                    const errorMsg = err.response.data.error
                    this.$message({
                        message: errorMsg,
                        type: "error"
                    });
                })
            },
            // 查询此用户是否是我的好友
            isFriend() {
                axios.get('/api/v1/is_friend', {
                    params: {
                        user_id: this.myInfo.user_id,
                        other_user_id: this.$route.params.user_id
                    }
                }).then(res => {
                    console.log("isFriend", res)
                    const isFriend = res.data.data.isFriend
                    if (isFriend.length !== 0) {
                        this.isMyFriend = true;
                        this.remark = isFriend[0].remark;
                    }
                }).catch(err => {
                    const errorMsg = err.response.data.error
                    this.$message({
                        message: errorMsg,
                        type: "error"
                    });
                })
            },
            goGithub() {
                if (this.userInfo.github) {
                   window.location.href = this.userInfo.github;
                } else {
                    this.$message({
                        message: '对方尚未放他的github链接哦',
                        type: "error"
                    });
                }
            },
            goWebsite() {
                if (this.userInfo.website) {
                   window.location.href = this.userInfo.website;
                } else {
                    this.$message({
                        message: '对方尚未放他的网站链接哦',
                        type: "error"
                    });
                }
            },
            showMessageBox(value) {
                if (value) {
                    this.visible = value;
                    this.message = "确定要退出登录？"
                }
            },
            cancel(value) {
                this.visible = value;
            },
            confirm(value) {
                if (value) {
                    //登出
                    socket.emit('logout', this.userInfo.user_id)
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("userInfo");
                    let self = this;
                    setTimeout(function() {
                        self.$router.push({
                            path: "/login"
                        });
                    }, 1000);
                }
            }
        },
        mounted() {
            this.myInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.getInfo();
            this.isFriend();
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        position: relative;
        background-color: #fff;
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
                    font-size: 1.4em;
                }
                span {
                    font-size: 0.1rem;
                }
            }
            .href {
                text-align: center;
                span {
                    font-size: 0.3rem;
                    cursor:pointer;
                }
            }
        }
    }
</style>