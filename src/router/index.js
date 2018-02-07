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

import axios from "axios";

Vue.use(Router);

const router = new Router({
  routes: [
    { // 消息首页
      path: "/message",
      name: "Message",
      component: Message
    },
    { //机器人聊天
      path: "/robot",
      name: "Robot",
      component: Robot
    },
    { //通讯录
      path: "/contact_list",
      name: "ContactList",
      component: ContactList
    },
    { //个人中心
      path: "/me",
      name: "Me",
      component: Me
    },
    { //登录
      path: "/login",
      name: "Login",
      component: Login
    },
    { //注册
      path: "/register",
      name: "Register",
      component: Register
    },
    { //群聊
      path: "/group_chat/:group_id",
      name: "GroupChat",
      component: GroupChat
    },
    { //私聊
      path: "/private_chat/:user_id",
      name: "PrivateChat",
      component: PrivateChat
    },
    { //用户信息
      path: "/user_info/:user_id",
      name: "UserInfo",
      component: UserInfo
    },
    { //加好友请求验证
      path: "/user_info/verify/:user_id",
      name: "VerifyReq",
      component: VerifyReq
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
    if (to.path === "/login" || to.path === "/register" ) {
      next();
    } else {
      next("/login");
    }
  } else{
    if (to.path === "/login" || to.path === "/register" ) {
      next("/message");
    } else{
      next();
    }
  }
});

export default router;
