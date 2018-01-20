<template>
    <!--  提示组件 -->
    <div class="tips" v-if="tipShow">
        <div  v-if="tipStyle === 'success' " class="success-tip">
            <svg class="icon" aria-hidden="true" style="font-size : 0.2rem">
                        <use  xlink:href="#icon-success1"></use>
                    </svg> {{tipMessage}}
        </div>
        <div v-if="tipStyle === 'warn' " class="warn-tip">
            <svg class="icon" aria-hidden="true" style="font-size : 0.2rem">
                        <use  xlink:href="#icon-warn1"></use>
                    </svg> {{tipMessage}}
        </div>
        <div v-if="tipStyle === 'error' " class="error-tip">
            <svg class="icon" aria-hidden="true" style="font-size : 0.2rem">
                        <use  xlink:href="#icon-error1"></use>
                    </svg> {{tipMessage}}
        </div>
    
    
    </div>
</template>

<script>
    export default {
        name: 'Tips',
        props: {
            tipStyle: {
                type: String,
                default: ""
            },
            tipMessage: {
                type: String,
                default: ""
            },
            tipShow:{
                type: Boolean,
                default:false
            }
        },
    
        data() {
            return {};
        },
    
        computed: {},
    
        watch: {},
    
        methods: {
    
        },
        mounted() {
            // let a = this.$refs.tipdom;
            // setTimeout(function() {
            //     a.style = "display:none;";
            // }, 3000)
        }
    }
</script>

<style lang="scss" scoped>
    .tips {
        position: absolute;
        left: 50%;
        font-size: 0.14rem;
        transform: translate(-50%, 0);
        // display: none;
        // transform: translateY()
        .success-tip,
        .warn-tip,
        .error-tip {
            pointer-events: all;
            padding: 0.12rem 0.18rem;
            border-radius: 0.06rem;
            box-shadow: 0 0.02rem 0.08rem rgba(0, 0, 0, .2);
            background: #fff;
            // position: relative;
            color: #495060;
        }
    }
</style>
