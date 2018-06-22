<template>
<!--  MessageBox弹窗组件 -->
<div class="message-box" v-if="visible">
	<div class="bg"></div>
	<div class="message-box-wrapper">
		<h1> {{title}}</h1>
		<input v-if="canInput" type="text" v-model="canInputText" maxlength="10" placeholder="最多10个字哦">
		<form class="editor-info" v-if="canEditorInfo">
			<div class="">
				<span>github:</span><input type="text" v-model="myInfo.github">
			</div>
			<div class="">
				<span>website:</span><input type="text" v-model="myInfo.website">
			</div>
			<div class="info-sex">
				<span>性别:</span>
				<select v-model="myInfo.sex">
			   <option disabled value="">性别</option>
			   <option>男</option>
			   <option>女</option>
			 </select>
			</div>
			<div class="">
				<span>来自:</span><input type="text" v-model="myInfo.place" maxlength="12">
			</div>
		</form>
		<p v-else class="content">
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
import {
	mapGetters
} from 'vuex'
export default {
	name: 'MessageBox',
	props: {
		messageBoxEvent: {
			type: String
		},
		visible: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: "提示"
		},
		//单行输入
		canInput: {
			type: Boolean,
			default: false
		},
		//编辑个人信息
		canEditorInfo: {
			type: Boolean,
			default: false
		},
		hasCancel: {
			type: Boolean,
			default: true
		},
		myInfo: {
			type: Object
		}
	},
	components: {},
	data() {
		return {
			canInputText: ""
		};
	},

	computed: {},

	watch: {},

	methods: {
		cancel() {
			this.$emit("cancel", this.messageBoxEvent);
		},
		confirm() {
			if (this.canInput) {
				this.$emit("confirm", {
					messageBoxEvent: this.messageBoxEvent,
					canInputText: this.canInputText
				});
				return
			} else if (this.canEditorInfo) {
                console.log('myInfo',this.myInfo); 
                this.myInfo.sex = this.myInfo.sex === '男' ? 0 : 1;
				this.$emit("confirm", {
					messageBoxEvent: this.messageBoxEvent,
					myInfo: this.myInfo
				});
				return
			}
			this.$emit("confirm", this.messageBoxEvent);
		}
	}
}
</script>

<style lang="scss" scoped>
.bg {
    position: fixed;
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
    -moz-transform: translate(-50%, -50%);
    //Mozilla内核浏览器：firefox3.5+
    -webkit-transform: translate(-50%, -50%); //Webkit内核浏览器：Safari and Chrome
    -o-transform: translate(-50%, -50%);
    //Opera
    -ms-transform: translate(-50%, -50%);
    //IE9
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
    /*在IE10+浏览器中, 使用css即可隐藏input文本输入框右侧的叉号*/
    ::-ms-reveal,
    input[type=text]::-ms-clear {
        display: none;
    }
    ::-ms-reveal,
    input::-ms-clear {
        display: none;
    }
    input {
        // display: inline-block;
        /*去除点击出现轮廓颜色*/
        width: 60%;
        outline: none;
        border:: 0.01rem solid #fff;
        border-bottom:: 0.01rem solid #999;
        padding: 0.06rem 0 0.1rem 0.1rem;
        font-size: 0.28rem;
        -webkit-appearance: none;
        /*去除系统默认的样式，苹果手机上的阴影*/
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        /*点击高亮的颜色*/
        /*padding已在重置样式中去除，如果没有去除，记得有padding哦*/
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
    .editor-info {
        display: flex;
        display: -ms-flexbox;
        flex-direction: column;
        justify-content: center;
        font-size: 0.2rem;
        div {
            width: 100%;
            margin: 0.3rem auto;
            select {
                width: 60%;
            }
            input {
                font-size: 0.1rem;
            }
        }
    }
}
</style>
