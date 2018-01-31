<template>
    <!--  群聊 -->
    <div class="wrapper">
        <Header goback='true' chatTitle="哈哈i"></Header>
        <ul>
            <li v-for="item in privateDetail"> 
                 <ChatItem v-if="fromUserInfo.user_id === item.from_user" :img="item.avator" me="true" :msg="item.message" :name="item.name" :time="item.time"></ChatItem>
                <ChatItem v-else :img="item.avator" :msg="item.message" :name="item.name" :time="item.time"></ChatItem>
            </li>
        </ul>
        <div class="input-msg">
            <textarea v-model="inputMsg" @keydown.enter.prevent="sendMessage" ref="message"></textarea>
            <p class="btn" :class="{'enable':inputMsg!=''}" @click="sendMessage">{{btnInfo}}</p>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import ChatItem from '../components/ChatItem.vue'
    import axios from "axios"
    import {
        toNomalTime
    } from "../utils/transformTime";
    import {
        mapGetters
    } from 'vuex'
    export default {
        components: {
            Header,
            ChatItem
        },
    
        data() {
            return {
                inputMsg: '',
                privateDetail: [], //私聊相关
                toUserInfo:{ //被私聊者 
                    to_user:'',
                    avator:'',
                    sex:'',
                    place:'',
                    status:''
                },
                fromUserInfo: {}, //用户自己
                btnInfo: "发送"
            }
        },
    
        computed: {
               ...mapGetters([
                'toUserInfoGetter'
            ])
        },
    
        watch: {},
    
        methods: {
            getPrivateMsg() {
                axios.get(
                        '/api/v1/private_detail', {
                            params: {
                                to_user: this.toUserInfo.to_user,
                                from_user:this.fromUserInfo.user_id
                            }
                        })
                    .then(res => {
                        console.log('res222',res)
                        if (res.data.success) {
                            this.privateDetail = res.data.data.privateDetail;
                            // if (!res.data.data.privateMember.includes(this.userInfo.user_id)) { // 如果尚未成为互相朋友，则添加
                            //     this.addGroupUserRelation;
                            // }
                            if (this.privateDetail.length == 0) return
                            this.privateDetail.forEach(element => {
                                element.time = toNomalTime(element.time);
                                element.message = element.message.split(':')[1];
                            });
                            // const  toUserInfo ={

                            // }
                            // this.$store.commit('toUserInfoMutation', res.data.data.privateInfo[0])
                            this.refresh()
                            //  console.log('getPrivateMsg',this.getPrivateMsg);
                        }
    
                    })
                    .catch(err => {
                        const errorMsg = err.response.data.error
                        this.$message({
                            message: errorMsg,
                            type: "error"
                        });
                    })
            },
            sendMessage() {
                if (this.inputMsg.trim() == '') return
                this.$refs.message.focus()
                this.btnInfo = '发送中'
            },
            // 消息置底
            refresh() {
                setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight + 10000)
                    console.log(111)
                }, 0)
            }
        },
    
        created() {
            this.toUserInfo.to_user = this.$route.params.user_id;
            this.fromUserInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.getPrivateMsg();
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        height: 100vh;
        padding-top: 0.6rem;
        z-index: 1;
        ul {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-bottom: 1.6rem;
            // touch-action:none !important;
            li {
                margin-top: -1rem;
                padding: 0;
            }
        }
        .input-msg {
            height: 0.46rem;
            position: fixed;
            bottom: 0.03rem;
            display: flex;
            width: 100%;
            z-index: 999;
            textarea {
                width: 87.8%;
                margin: 0 0.06rem;
                padding-top: 0.07rem;
                padding-left: 0.06rem;
                border-radius: 0.02rem;
                outline: none;
                resize: none;
                border: none;
                overflow-y: hidden;
                font: 0.16rem/0.18rem 'Microsoft Yahei';
            }
            p.btn {
                font-size: 0.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                margin-right: 0.06rem;
                height: 100%;
                width: 11%;
                background: #ccc;
                color: white;
                border-radius: 0.02rem;
                cursor: not-allowed;
                font-family: 'Microsoft Yahei';
                &.enable {
                    background: #1E90FF;
                    cursor: pointer;
                }
            }
        }
    }
</style>
