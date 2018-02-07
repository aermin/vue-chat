<template>
    <!--  MessageBox弹窗组件 -->
    <div class="message-box" v-if="visible">
        <div class="bg"></div>
        <div class="message-box-wrapper">
            <h1> {{title}}</h1>
            <p class="content">
                <slot name="content"></slot>
            </p>
            <div v-if="hasCancel" class="hasCancel">
                <p @click="cancel">取消</p>
                <p @click="confirm">确定</p>
            </div>
            <div v-else class="noCancel">
                <p @click="confirm">确定</p>
            </div>
    
        </div>
    
    
    </div>
</template>

<script>
    export default {
        name: 'MessageBox',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "提示"
            },
            hasCancel: {
                type: Boolean,
                default: true
            }
        },
        components: {},
        data() {
            return {};
        },
    
        computed: {},
    
        watch: {},
    
        methods: {
            cancel() {
                this.$emit("cancel", true);
            },
            confirm() {
                this.$emit("confirm", true);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #000;
        opacity: 0.3;
        z-index: 100;
    }
    
    .message-box-wrapper {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: auto;
        background-color: white;
        border-radius: 0.1rem;
        border-top: 0.01rem solid white;
        animation: fade 1s ease 1 forwards;
        text-align: center;
        z-index: 999;
        @keyframes fade {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        h1 {
            text-align: center;
            font-size: 0.18rem;
            margin: 0.16rem 0.01rem 0.2rem;
        }
        p {
            font-size: 0.18rem;
            color: rgba(0, 0, 0, 0.808);
            margin-bottom: 0.18rem;
        }
        .hasCancel {
            height: 0.6rem;
            p {
                background: transparent;
                color: #1678E5;
                font-size: 0.14rem;
                height: 0.6rem;
                line-height: 0.6rem;
                width: 50%;
                position: absolute;
            }
            p:nth-of-type(1) {
                border-top: 0.01rem solid #B4B4B4;
                border-right: 0.01rem solid #B4B4B4;
                left: 0;
                border-radius: 0 0 0 0.1rem;
            }
            p:nth-of-type(2) {
                border-top: 0.01rem solid #B4B4B4;
                right: 0;
                border-radius: 0 0 0.1rem 0;
            }
            p:focus,
            p:hover {
                font-weight: bold;
                background: #EFEFEF;
            }
            p:active {
                background: #D6D6D6;
            }
        }
        .noCancel {
            height: 0.6rem;
            p {
                background: transparent;
                color: #1678E5;
                height: 0.6rem;
                font-size: 0.14rem;
                line-height: 0.6rem;
                width: 100%;
                position: absolute;
                text-decoration: none;
                border-top: 1px solid #B4B4B4;
                left: 0;
                right: 0;
                border-radius: 0 0 0 0.1rem;
            }
            p:focus,
            p:hover {
                font-weight: bold;
                background: #EFEFEF;
            }
            p:active {
                background: #D6D6D6;
            }
        }
    }
</style>
