import Vue from "vue";
import Router from "vue-router";
import Message from "@/pages/Message";
import Robot from "@/pages/Robot";
import Me from "@/pages/Me";
import Register from "@/pages/Register";
import Login from "@/pages/Login";

Vue.use(Router);

export default new Router({
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
    }
    ,
    { 
      path: "/", 
      redirect: "/login" 
    }
  ]
});
