import Vue from "vue";
import Router from "vue-router";
import Message from "@/pages/Message";
import Robot from "@/pages/Robot";
import Me from "@/pages/Me";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import GroupChat from "@/pages/GroupChat";
import PrivateChat from "@/pages/PrivateChat";
import UserInfo from "@/pages/UserInfo";
import VerifyReq from "@/pages/VerifyReq";
import ContactList from "@/pages/ContactList";
import NewFriends from "@/pages/NewFriends";
import Add from "@/pages/Add";
import AddSeach from "@/pages/AddSeach";
import GroupInfo from "@/pages/GroupInfo";
import CreatEditorGroup from "@/pages/CreatEditorGroup";

import axios from "axios";

Vue.use(Router);

const router = new Router({
	routes: [{ // 消息首页
			path: "/message",
			component: Message
		},
		{ //群聊
			path: "/group_chat/:group_id",
			component: GroupChat
		},
		{ //私聊
			path: "/private_chat/:user_id",
			component: PrivateChat
		},
		{ //机器人聊天
			path: "/robot",
			component: Robot
		},
		{ //通讯录
			path: "/contact_list",
			component: ContactList
		},
		{ //加好友通知
			path: "/contact_list/new_friends",
			component: NewFriends
		},
		{ //个人中心
			path: "/me",
			component: Me
		},
		{ //登录
			path: "/login",
			component: Login
		},
		{ //注册
			path: "/register",
			component: Register
		},
		{ //用户信息卡
			path: "/user_info/:user_id",
			component: UserInfo
		},
		{ //群信息卡
			path: "/group_info/:group_id",
			component: GroupInfo
		},
		{ //加好友请求验证
			path: "/user_info/verify/:user_id",
			component: VerifyReq
		},
		{ //加人或进群
			path: "/add",
			component: Add
		},
		{ //搜人
			path: "/add_seach/user/:username",
			component: AddSeach
		},
		{ //搜群
			path: "/add_seach/group/:groupname",
			component: AddSeach
		},
		{ //建群
			path: "/creat_group",
			component: CreatEditorGroup
		},
		{ //编辑群
			path: "/editor_group",
			component: CreatEditorGroup
		},
		{
			path: "/",
			redirect: "/login"
		}
	]
});

//路由守卫
router.beforeEach((to, from, next) => {
	if (!localStorage.userToken) {
		if (to.path === "/login" || to.path === "/register") {
			next();
		} else {
			next("/login");
		}
	} else {
		if (to.path === "/login" || to.path === "/register") {
			next("/message");
		} else {
			next();
		}
	}
});

export default router;