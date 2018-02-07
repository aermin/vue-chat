<template>
    <div class="wrapper">
        <Message-box :visible="visible" @confirm="confirm" @cancel ="cancel" >
            <p slot="content">{{messagebox}}</p>
        </Message-box>
        <Header goback='true' chatTitle="用户资料"></Header>
        <p>你需要发送验证申请，等对方通过</p>
        <textarea rows="5" v-model="message"></textarea>
        <p class="send-btn" @click="send">发送</p>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import axios from "axios"
    import {
        mapGetters
    } from 'vuex'
    export default {
    
        components: {
            Header
        },
    
        data() {
            return {
                message: "你好，我想加你为好友",
                visible: false,
                messagebox: ""
            }
        },
        computed: {
            ...mapGetters([
                'addAsFriendGetter'
            ])
        },
    
        watch: {},
    
        methods: {
            send() {
                socket.emit('sendRequest', {
                    to_user: this.addAsFriendGetter.other_user_id, //对方id
                    message: this.message,
                    time: Date.parse(new Date()) / 1000 //时间
                })
                this.visible = true;
                this.messagebox = "发送成功，等候回复哦"
            },
            confirm(value) {
                if(value){
                   const path = `/user_info/${this.$route.params.user_id}`
                this.$router.push(path)  
                }
            },
            cancel(value){
                if (value) {
                    this.visible = false;
                }
            }
        },
    
        mounted() {}
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        padding-top: 1rem;
        text-align: center;
        textarea {
            width: 100%;
            // margin: 0 auto;
            margin: 0.3rem 0;
            font-size: 0.26rem;
            /*去除点击出现轮廓颜色*/
            outline: none;
            /*去掉右下角的可拉伸变大小的图标和功能*/
            resize: none;
        }
        p {
            font-size: 0.32rem;
            margin: 0.2rem 0;
        }
        .send-btn {
            background-color: #4290F7;
            color: #fff;
            display: inline-block;
            font-size: 0.2rem;
            line-height: 0.26rem;
            padding: 0.16rem 0;
            width: 40%;
            cursor: pointer;
        }
    }
</style>