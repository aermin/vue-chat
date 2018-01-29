<template>
    <!--  主页面底部 -->
    <div class="wrapper">
        <Header :chatTitle="chatTitle"></Header>
        <ul>
            <li>
                <!-- <ChatItem img="../../static/prople1.jpg" :msg="msg.message" :name="msg.user" :time="time"></ChatItem>
                        <ChatItem me="true" img="../../static/me.jpg" :msg="msg.message" :time="time"></ChatItem> -->
            </li>
        </ul>
        <div class="input-msg">
            <textarea v-model="inputMsg" @keydown.enter.prevent="sendMessage" ref="message"></textarea>
            <a href="javscript:void(0)" class="btn" :class="{'enable':inputMsg!=''}" @click="sendMessage">发送</a>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import ChatItem from '../components/ChatItem.vue'
    export default {
        components: {
            Header
        },
        data() {
            return {
                chatTitle: "加载中...",
                dataList: {
                    groupId: '', //群id
                    groupName: '正在加载中...', //群名称
                    groupAvator: '', //群头像
                    groupMember: [], //其它群成员的id（方便socket給指定群成员发送消息）
                    message: [] //拉取到的消息
                },
            };
        },
    
        computed: {
            //     ...mapGetters([
            //     'chatListGetter'
            //   ])
        },
    
        watch: {},
        methods: {
            sendMessage() {},
            sendBySocket() {
                socket.emit('sendGroupMessage', {
                    group_id: this.dataList.groupId, //群id
                    group_name: this.dataList.groupName, //群名称
                    group_avator: this.dataList.groupAvator, //群头像
                    group_member: this.dataList.groupMember, //所有群成员的id,方便socket判断
                    from_user_id: this.userId, //自己的id
                    from_user_face: this.userInfo.face, //自己的头像
                    message: this.writeMessage, //消息内容
                    time: Date.parse(new Date()) / 1000 //时间
                })
            },
        },
        mounted() {}
    }
</script>

<style lang="scss" scoped>
    .wrapper {
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
            a.btn {
                font-size: 0.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
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
