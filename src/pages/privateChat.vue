<template>
    <!--  群聊 -->
    <div class="wrapper">
        <Header goback='true' :chatTitle="someOneInfoGetter.name"></Header>
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
                toUserInfo: { //被私聊者 
                    to_user: '',
                    avator: '',
                    sex: '',
                    place: '',
                    status: ''
                },
                fromUserInfo: {}, //用户自己
                btnInfo: "发送"
            }
        },
    
        computed: {
            ...mapGetters([
                'someOneInfoGetter'
            ])
        },
    
        watch: {},
    
        methods: {
            //获取数据库的消息
            getPrivateMsg() {
                axios.get(
                        '/api/v1/private_detail', {
                            params: {
                                to_user: this.toUserInfo.to_user,
                                from_user: this.fromUserInfo.user_id
                            }
                        })
                    .then(res => {
                        console.log('res222', res)
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
            //发送信息
            sendMessage() {
                if (this.inputMsg.trim() == '') return
                // console.log('sendPrivateMsg', this.groupInfoGetter)
                const data = {
                    from_user: this.fromUserInfo.user_id, //自己的id
                    to_user: this.toUserInfo.to_user,
                    name: this.fromUserInfo.name, //自己的昵称
                    avator: this.fromUserInfo.avator, //自己的头像
                    message: this.inputMsg, //消息内容
                    status:'1', //是否在线 0为不在线 1为在线
                    time: Date.parse(new Date()) / 1000 //时间
                }
                socket.emit('sendPrivateMsg', {
                    from_user: this.fromUserInfo.user_id, //自己的id
                    to_user: this.toUserInfo.to_user, //对方id
                    name: this.fromUserInfo.name, //自己的昵称
                    avator: this.fromUserInfo.avator, //自己的头像
                    message: this.inputMsg, //消息内容
                    status:'1', //是否在线 0为不在线 1为在线
                    time: Date.parse(new Date()) / 1000 //时间
                })
                // 存此条私聊信息
                    axios.post('/api/v1/private_save_msg', data)
                    .then(res => {
                        console.log('saveGroupMsg', res)
                    })
                data.time = toNomalTime(data.time)
                this.privateDetail.push(data); //保存本地
                this.refresh();
            },
            // 获取socket消息
            getMsgBySocket() {
                socket.removeAllListeners();
                socket.on('getPrivateMsg', (data) => {
                    data.time = toNomalTime(data.time);
                    this.privateDetail.push(data);
                    this.refresh();
                })
            },
            // //获取to_user 私聊对象的用户资料
            // someOneInfoAction(){
                
            // },
            // 消息置底
            refresh() {
                setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight + 10000)
                }, 0)
            }
        },
        //必须用monted 不然用creat生命周期的话  得到的将是挂载前旧的soket.id 。。是个坑
        mounted() {
            this.toUserInfo.to_user = this.$route.params.user_id;
            this.fromUserInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.getPrivateMsg();
             this.getMsgBySocket();
             this.$store.dispatch('someOneInfoAction',this.toUserInfo.to_user )
        }
    }
</script>

<style lang="scss" scoped>
   @import "../assets/chat.scss";
</style>
