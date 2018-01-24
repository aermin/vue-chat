<template>
  <!-- 机器人聊天 -->
  <div class="wrapper">
    <Header :currentTab="currentTab"></Header>
  
      <div v-for="msg in robotMsgGetter">
        <Private-chat v-if="msg.user" img="../../static/robot.gif" :msg="msg.message" :name="msg.user" :time="time"></Private-chat>
        <Private-chat v-if="!msg.user" me="true" img="../../static/me.jpg" :msg="msg.message" :time="time"></Private-chat>
      </div>
  
      <div class="input-msg">
        <textarea v-model="inputMsg" @keydown.enter.prevent="sendMessage" ref="message"></textarea>
        <a href="javscript:void(0)" class="btn" :class="{'enable':inputMsg!=''}" @click="sendMessage">发送</a>
      </div>
  
    <Footer :currentTab="currentTab"></Footer>
  
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import PrivateChat from '../components/PrivateChat.vue'
  import axios from "axios";
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'Robot',
    data() {
      return {
        currentTab: 2,
        time: "2017",
        inputMsg: ""
      }
    },
    components: {
      Header,
      Footer,
      PrivateChat
    },
    methods: {
      async sendMessage() {
        if (this.inputMsg.trim() == '') return;
        this.$store.commit('setRobotMsg', {
          message: this.inputMsg
        })
        // const data = {
        //     'info': this.inputMsg
        //   }
        this.$store.dispatch('robatMsgAction', {
          message: this.inputMsg
        })
      }
    },
    computed: {
      ...mapGetters([
        'robotMsgGetter'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
       overflow: hidden;
    background-color: #EDECED;
    height: 100vh;
    padding-top: 0.8rem;
    .input-msg {
      height: 0.46rem;
      position: fixed;
      bottom: 0.5rem;
      display: flex;
      width: 100%;
      textarea {
        width: 87.8%;
        margin: 0 0.06rem;
        padding-top: 0.07rem;
        padding-left: 0.06rem;
        border-radius: 0.02rem;
        outline: none;
        resize: none;
        border: none;
        overflow-y: hidden;
        font: 0.16rem/0.18rem 'Microsoft Yahei';
      }
      a.btn {
        font-size: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        text-align: center;
        margin-right: 0.06rem;
        height: 100%;
        width: 11%;
        background: #ccc;
        color: white;
        border-radius: 0.02rem;
        cursor: not-allowed;
        font-family: 'Microsoft Yahei';
        &.enable {
          background: #1E90FF;
          cursor: pointer;
        }
      }
    }
  }
</style>