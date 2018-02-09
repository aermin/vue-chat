<template>
    <!-- 用户资料 -->
    <div class="wrapper">
        <Message-box :messageBoxEvent="this.messageBox.messageBoxEvent" :visible="this.messageBox.visible" :hasCancel="this.messageBox.hasCancel" @cancel="cancel" @confirm="confirm">
            <p slot="content">{{this.messageBox.message}}</p>
        </Message-box>
        <Header goback='true' chatTitle="用户资料"></Header>
        <div class="content">
            <img :src="userInfo.avator" alt="">
            <p class="href">
                <span @click="goGithub"><svg class="icon" aria-hidden="true"><use  xlink:href="#icon-github"></use></svg></span>
                <span @click="goWebsite"><svg class="icon" aria-hidden="true"><use  xlink:href="#icon-web"></use></svg></span>
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
        </div>
        <div v-if="this.isMyFriend" class="action">
            <span class="editor-remark" @click="editorRemark">修改备注</span>
            <span class="go-chat" @click="goChat">发消息</span>
            <span class="shield-it" @click="shieldIt">屏蔽此人</span>
            <span class="de-friended" @click="deFriended">删除好友</span>
        </div>
        <div v-else class="action">
            <span class="add-as-friend" @click="addAsFriend">加为好友</span>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import axios from "axios"
    export default {
        data() {
            return {
                userInfo: {}, //用户信息
                myInfo: {}, //我的信息
                remark: '', //备注
                isMyFriend: false, //是否为好友关系
                messageBox: {
                    visible: false,
                    message: "", //弹窗内容
                    hasCancel: true, //弹窗是否有取消键
                    messageBoxEvent: "" //弹窗事件名称
                }
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
            //点击跳转到对方的gihub
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
            //点击跳转到对方的网站
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
            //加为好友
            addAsFriend() {
                // axios.post(
                //         '/api/v1/add_as_friend', {
                //             user_id: this.myInfo.user_id,
                //             other_user_id: this.$route.params.user_id
                //         })
                //     .then(res => {
                //           this.visible = true;
                //         this.message = "好友添加成功"
                //     }).catch(err => {
                //         const errorMsg = err.response.data.error
                //         this.$message({
                //             message: errorMsg,
                //             type: "error"
                //         });
                //     })
                this.$store.commit('addAsFriendMutation', {
                    user_id: this.myInfo.user_id,
                    other_user_id: this.$route.params.user_id
                })
                const path = `/user_info/verify/${this.$route.params.user_id}`
                this.$router.push(path)
            },
            //进入聊天页面
            goChat() {
                const path = `/private_chat/${this.$route.params.user_id}`
                this.$router.push(path)
            },
            //修改备注
            editorRemark() {
            },
            //屏蔽此人
            shieldIt() {},
            //删除好友
            deFriended() {
                this.messageBox.messageBoxEvent = 'delFriend'
                this.messageBox.visible = true;
                this.messageBox.message = "确定要删除此好友？"
            },
            cancel(value) {
                this.messageBox.visible = false;
            },
            confirm(value) {
                if (value === 'delFriend') {
                    axios.delete('/api/v1/del_friend', {
                        params: {
                            user_id: this.myInfo.user_id,
                            other_user_id: this.$route.params.user_id
                        }
                    }).then(res => {
                        this.messageBox.visible = false;
                        this.$message({
                            message: '删除此好友成功',
                            type: "success"
                        });
                        this.isMyFriend = false;
                    }).catch(err => {
                        const errorMsg = err.response.data.error
                        this.$message({
                            message: errorMsg,
                            type: "error"
                        });
                    })
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
            .href {
                text-align: center;
                span {
                    font-size: 0.3rem;
                    cursor: pointer;
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
            .editor-remark {
                background-color: #fff;
                color: #4290F7;
            }
            .shield-it {
                background-color: #fff;
                color: #4290F7;
            }
            .de-friended {
                background-color: #E16762;
                color: #fff;
            }
            .add-as-friend {
                background-color: #4290F7;
                color: #fff;
            }
        }
    }
</style>