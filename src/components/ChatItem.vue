<template>
    <div class="chat-item">
        <div v-if="!me" class="otherchat">
            <img :src="img" alt="" class="img">
            <div class="nt"><span v-if="name">{{name}}</span><span v-if="time">{{time}}</span></div>
            <div class="msg">{{msg}}</div>
        </div>
    
        <div v-if="me" class="mychat">
                <div class="nt"><span v-if="time">{{time}}</span><span v-if="name">{{name}}</span></div>
                <div class="msg">{{msg}}</div>
            <img :src="img" alt="" class="img">
        </div>
    
    
    </div>
</template>

<script>
    export default {
        name: 'chat-item',
        props: ['me', 'name', 'img', 'msg', 'time'],
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
    .chat-item {
        position: relative;
        width: 100%;
        .otherchat {
            position: relative;
            display: flex;
            display: -webkit-flex; /* Safari */
            align-items: center;
            width: 100%;
            .img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                margin: 0 0.1rem;
            }
            .nt {
                font-size: 0.2rem;
                left: 0.8rem;
                top: -0.1rem;
                position: absolute;
                line-height: 0.4rem;
                color: #686868;
                span {
                    padding-right: 0.1rem;
                }
                span:nth-child(2) {
                    font-size: 0.1rem;
                }
            }
            .msg {
                max-width: 70%;
                margin-top: 0.4rem;
                padding: 0.12rem;
                border-radius: 0.1rem;
                font-size: 0.24rem;
                background-color: #fff;
                color: #424242;
                text-align: left;
            }
        }
        .mychat {
            display: flex;
            display: -webkit-flex; /* Safari */
            align-items: center;
            justify-content: flex-end;
            text-align: right;
            .img {
                min-width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                margin: 0 0.1rem;
            }
            .nt {
                font-size: 0.2rem;
                right: 0.8rem;
                top: -0.1rem;
                position: absolute;
                line-height: 0.4rem;
                color: #686868;
                span {
                    padding-right: 0.1rem;
                }
                span:nth-child(1) {
                    font-size: 0.1rem;
                }
            }
            .msg {
                text-align: left;
                max-width: 70%;
                margin-top: 0.4rem;
                padding: 0.12rem;
                border-radius: 0.1rem;
                font-size: 0.24rem;
                background-color: #4290F7;
                color: #fff;
            }
        }
    }
</style>