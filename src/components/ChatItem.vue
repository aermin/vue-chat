<template>
    <div class="private-chat">
        <div v-if="!me" class="otherchat">
            <img :src="img" alt="" class="img">
            <div class="content">
                <div class="nt"><span v-if="name">{{name}}</span><span v-if="time">{{time}}</span></div>
                <div class="msg">{{msg}}</div>
            </div>
        </div>
    
        <div v-if="me" class="mychat">
            <div class="content">
                <div class="nt"><span v-if="time">{{time}}</span><span v-if="name">{{name}}</span></div>
                <div class="msg">{{msg}}</div>
            </div>
            <img :src="img" alt="" class="img">
        </div>
    
    
    </div>
</template>

<script>
    export default {
        name: 'Private-chat',
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
    .private-chat {
        position: relative;
        width: 100%;    
        .otherchat {
            position: relative;
            display: flex;
            align-items: center;
            .img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                margin: 0 0.1rem;
            }
            .content {
                display: inline-block;
                max-width: 80%;
                .nt {
                    font-size: 0.2rem;
                    display: block;
                    line-height: 0.4rem;
                    color: #686868;
                    span {
                        padding-right: 0.2rem;
                    }
                    span:nth-child(2) {
                        font-size: 0.1rem;
                    }
                }
                .msg {
                    padding: 0.12rem;
                    border-radius: 0.1rem;
                    font-size: 0.24rem;
                    background-color: #fff;
                    color: #424242;
                }
            }
        }
        .mychat {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            text-align: right;
            .img {
                min-width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                margin: 0 0.1rem;
            }
            .content {
                display: inline-block;
                max-width: 80%;
                .nt {
                    font-size: 0.2rem;
                    display: block;
                    line-height: 0.4rem;
                    color: #686868;
                    span {
                        padding-right: 0.2rem;
                    }
                    span:nth-child(1) {
                        font-size: 0.1rem;
                    }
                }
                .msg {
                    padding: 0.12rem;
                    border-radius: 0.1rem;
                    font-size: 0.24rem;
                    background-color: #4290F7;
                    color: #fff;
                }
            }
        }
    }
</style>