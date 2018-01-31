<template>
    <!--  主页面底部 -->
    <div class="wrapper">
        <Header goback = 'true'  :chatTitle="groupDetailGetter.groupInfo.group_name"></Header>
        <ul>
            <li v-for="item in dataList.message">
                <ChatItem v-if="userInfo.user_id === item.from_user" :img="item.avator" me="true" :msg="item.message" :name="item.name" :time="item.time"></ChatItem>
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
                groupInfo: {
                    groupId: '' //群id
                },
                dataList: {
                    groupAvator: '', //群头像
                    groupMember: [], //群成员id
                    message: [] //群消息
                },
                inputMsg: '',
                userInfo: {},
                btnInfo: "发送"
            };
        },
    
        computed: {
            ...mapGetters([
                'groupDetailGetter' // 为了查看群资料组件共用此状态
            ])
        },
    
        watch: {},
        methods: {
            getChatMsg() {
                axios.get(
                        '/api/v1/group_chat', {
                            params: {
                                groupId: this.groupInfo.groupId
                            }
                        })
                    .then(res => {
                        if (res.data.success) {
                            this.dataList.message = res.data.data.groupMsg;
                            if(!res.data.data.groupMember.includes(this.userInfo.user_id)){ // 群成员不存在此用户id，则添加
                                this.addGroupUserRelation;
                            }
                            if(this.dataList.message.length==0) return
                            this.dataList.message.forEach(element => {
                                element.time = toNomalTime(element.time);
                                element.message = element.message.split(':')[1];
                            });
                            this.$store.commit('groupDetailMutation', {
                                groupInfo: res.data.data.groupInfo[0],
                                groupMember: res.data.data.groupMember
                            })
                            this.refresh()
                            //  console.log('getChatMsg',this.dataList);
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
                this.sendBySocket()
            },
            async sendBySocket() {
                console.log('sendGroupMsg', this.groupDetailGetter)
                socket.emit('sendGroupMsg', {
                    groupId: this.groupInfo.groupId, //群id
                    group_name: this.groupDetailGetter.groupInfo.group_name, //群名称
                    group_avator: this.groupDetailGetter.groupInfo.group_avator, //群头像
                    groupMember: this.groupDetailGetter.groupMember, //所有群成员的id
                    from_user: this.userInfo.user_id, //自己的id
                    name: this.userInfo.name, //自己的昵称
                    avator: this.userInfo.avator, //自己的头像
                    message: this.inputMsg, //消息内容
                    time: Date.parse(new Date()) / 1000 //时间
                })
                await this.saveGroupMsg();

            },
            saveGroupMsg(){
                    axios.post(
                            '/api/v1/group_chat_msg', {
                                userId: this.userInfo.user_id,
                                groupId: this.groupInfo.groupId,
                                message:this.inputMsg,
                                name:this.userInfo.name,
                                time: Date.parse(new Date()) / 1000
                            })
                    .then(res => {
                        console.log('saveGroupMsg' ,res)
                    })
            },
            addGroupUserRelation(){
                    axios.post(
                            '/api/v1/group_chat_relation', {
                                userId: this.userInfo.user_id,
                                groupId: this.groupInfo.groupId
                            })
                    .then(res => {
                        console.log('group_chat_relation' ,res)
                    })
            },
            receiveBySocket() {
                socket.removeAllListeners();
                socket.on('receiveGroupMsg', (data) => {
                    if (!data.groupMember.includes(this.userInfo.user_id)) return
                    console.log('receiveGroupMsg', data);
                    data.time = toNomalTime(data.time);
                    this.dataList.message.push(data);
                    this.refresh();
                })
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
            this.groupInfo.groupId = this.$route.params.group_id;
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.getChatMsg();
            this.receiveBySocket()
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
