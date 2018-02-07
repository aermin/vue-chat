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

import axios from "axios";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/message",
      name: "Message",
      component: Message
    },
    {
      path: "/robot",
      name: "Robot",
      component: Robot
    },
    {
      path: "/me",
      name: "Me",
      component: Me
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/group_chat/:group_id",
      name: "GroupChat",
      component: GroupChat
    },
    {
      path: "/private_chat/:user_id",
      name: "PrivateChat",
      component: PrivateChat
    },
    {
      path: "/user_info/:user_id",
      name: "UserInfo",
      component: UserInfo
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
