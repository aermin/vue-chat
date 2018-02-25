<template>
<div class="wrapper">
	<Header :currentTab="currentTab"></Header>
	<router-link class="new-friend" to="contact_list/new_friends">
		<svg class="icon img" aria-hidden="true"> <use  xlink:href="#icon-pengyouquan"></use></svg><span>新朋友</span>
		<svg class="icon enter" aria-hidden="true"> <use  xlink:href="#icon-right"></use></svg>
	</router-link>
	<p class="tab"><span :class="friend" @click="showFriends">朋友</span><span :class="group" @click="showGroups">群组</span></p>
	<ul>

	</ul>
	<Footer :currentTab="currentTab"></Footer>
</div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import axios from "axios"
export default {
	components: {
		Header,
		Footer
	},

	data() {
		return {
			currentTab: 3,
			friend: "hover",
			group: ""
		}
	},

	computed: {},

	watch: {},

	methods: {
		showFriends() {
			this.friend = "hover";
			this.group = '';
		},
		showGroups() {
			this.friend = '';
			this.group = "hover";
		},

	},

	mounted() {
		// this.getMsgBySocket();
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 1rem;
    .new-friend {
        background-color: #fff;
        color: #333;
        display: flex;
        display: -webkit-flex;
        padding: 0.16rem;
        margin-bottom: 0.16rem;
        text-decoration: none;
        .icon {
            font-size: 0.4rem;
            line-height: 0.4rem;
        }
        .enter {
            position: absolute;
            right: 0.2rem;
        }
        span {
            font-size: 0.28rem;
            line-height: 0.5rem;
            margin-left: 0.2rem;
            // overflow: hidden;
        }
    }
    .tab {
        font-size: 0.3rem;
        background-color: #fff;
        color: #333;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        // border: red;
        span {
            padding: 0.16rem;
        }
        .hover {
            color: #1E90FF;
            border-bottom: 0.03rem solid #1E90FF;
        }
    }
}
</style>
