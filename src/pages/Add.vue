<template>
<div class="wrapper">
	<Header goback='true' :chatTitle="chatTitle"></Header>
	<div class="creat-group" @click="createGroup">
		<svg class="icon" aria-hidden="true"> <use  xlink:href="#icon-group1"></use></svg>
		<span>建一个群</span>
		<svg class="icon icon-right" aria-hidden="true"><use  xlink:href="#icon-right"></use></svg>
	</div>
	<div class="search">
		<svg class="icon" aria-hidden="true"> <use  xlink:href="#icon-search1"></use></svg>
		<input type="text" v-model="inputContent" placeholder="在这边输入用户名或者群名称哦" />
	</div>
	<div class="choose">
		<p v-show="this.inputContent !='' " class="find-people" @click="findPeople">
			<svg class="icon" aria-hidden="true"> <use  xlink:href="#icon-my-copy"></use></svg><span>加人:&nbsp&nbsp{{this.inputContent}}</span>
		</p>
		<p v-show="this.inputContent !='' " class="find-group" @click="findGroup"><svg class="icon" aria-hidden="true"> <use  xlink:href="#icon-group1"></use></svg><span>进群:&nbsp&nbsp{{this.inputContent}}</span>
		</p>

	</div>
</div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from "axios"
export default {
	components: {
		Header
	},

	data() {
		return {
			chatTitle: "加人,进群,建群",
			inputContent: ""
		}
	},

	computed: {},

	watch: {},

	methods: {
		findPeople() {
			const path = `/add_seach/user/${this.inputContent}`
			this.$router.push(path)
		},
		findGroup() {
			const path = `/add_seach/group/${this.inputContent}`
			this.$router.push(path)
		},
		createGroup() {
			const path = `/creat_group`
			this.$router.push(path)
		}
	},

	mounted() {}
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 1rem;
    .creat-group {
        font-size: 0.3rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        background-color: #fff;
        margin-bottom: 0.2rem;
        padding: 0.1rem;
        .icon {
            width: 0.5rem;
            height: 0.5rem;
            margin: 0 0.2rem 0 0.4rem;
        }
        .icon-right {
            width: 0.4rem;
            height: 0.4rem;
            position: absolute;
            right: 0.2rem;
        }
        span {
            font-size: 0.3rem;
            color: #555;
        }
    }
    .search {
        display: flex;
        display: -webkit-flex;
        background-color: #fff;
        padding: 0.1rem;
        width: 100%;
        .icon {
            width: 0.5rem;
            height: 0.5rem;
            margin: 0 0 0 0.4rem;
        }
        // input {
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
            /*去除点击出现轮廓颜色*/
            width: 90%;
            outline: none;
            border: 0.01rem solid #fff;
            padding-left: 0.05rem;
            font-size: 0.3rem;
            -webkit-appearance: none;
            /*去除系统默认的样式，苹果手机上的阴影*/
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            /*点击高亮的颜色*/
            /*padding已在重置样式中去除，如果没有去除，记得有padding哦*/
        }
    }
    .choose {
        background-color: #fff;
        margin: 0.22rem;
        padding: 0 0.1rem;
        color: #555;
        p {
            display: flex;
            display: -webkit-flex;
            padding: 0.1rem;
            // border-top: 0.01rem solid #f0ecec;
            .icon {
                font-size: 0.38rem;
                // line-height: 0.4rem;
                margin-left: 0.2rem;
            }
            span {
                margin-left: 0.2rem;
                font-size: 0.3rem;
            }
        }
        p:nth-child(2) {
            border-top: 0.01rem solid #f0ecec;
        }
    }
    // }
}
</style>
