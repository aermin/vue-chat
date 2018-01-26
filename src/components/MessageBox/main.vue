<template>
    <!--  MessageBox弹窗组件 -->
    <div class="message-box" v-if="visible">
        <div class="bg"></div>
        <div class="message-box-wrapper">
            <h1> {{title}}</h1>
            <p>
                <slot name="content"></slot>
            </p>
            <div v-if="hasCancel" class="hasCancel">
                <a href="javscript:void(0)" @click="cancel">取消</a>
                <a href="javscript:void(0)" @click="confirm">确定</a>
            </div>
            <div v-else class="noCancel">
                <a href="javscript:void(0)" @click="confirm">确定</a>
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
                this.$emit("cancel", false);
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
            font-size: 0.12rem;
            margin: 0.15rem 0.01rem 0.2rem;
        }
        p {
            text-align: center;
            font-size: 0.1rem;
            margin: 0 0.2rem 0.7rem;
        }
        .hasCancel {
            a {
                background: transparent;
                color: #1678E5;
                height: 0.46rem;
                font-size: 0.14rem;
                line-height: 0.46rem;
                width: 50%;
                position: absolute;
                bottom: 0;
                text-decoration: none;
            }
            a:nth-of-type(1) {
                border-top: 1px solid #B4B4B4;
                border-right: 1px solid #B4B4B4;
                left: 0;
                border-radius: 0 0 0 0.1rem;
            }
            a:nth-of-type(2) {
                border-top: 0.01rem solid #B4B4B4;
                right: 0;
                border-radius: 0 0 0.1rem 0;
            }
            a:focus,
            a:hover {
                font-weight: bold;
                background: #EFEFEF;
            }
            a:active {
                background: #D6D6D6;
            }
        }
        .noCancel{
                a {
                background: transparent;
                color: #1678E5;
                height: 0.46rem;
                font-size: 0.14rem;
                line-height: 0.46rem;
                width: 100%;
                position: absolute;
                bottom: 0;
                text-decoration: none;
                border-top: 1px solid #B4B4B4;
                left: 0;
                 right: 0;
                border-radius: 0 0 0 0.1rem;
            }
            a:focus,
            a:hover {
                font-weight: bold;
                background: #EFEFEF;
            }
            a:active {
                background: #D6D6D6;
            }
        }
    }
</style>
