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
        <!-- <div class="input-msg">
            <textarea v-model="inputMsg" @keydown.enter.prevent="sendMessage" ref="message"></textarea>
            <a href="javscript:void(0)" class="btn" :class="{'enable':inputMsg!=''}" @click="sendMessage">发送</a>
        </div> -->
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
                chatTitle:"加载中..."
            };
        },
    
        computed: {
            //     ...mapGetters([
            //     'chatListGetter'
            //   ])
        },
    
        watch: {},
    
        mounted() {}
    }
</script>

<style lang="scss" scoped>
    
</style>
