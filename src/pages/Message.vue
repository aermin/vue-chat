<template>
  <!-- 消息 -->
  <div class="wrapper">
    <Header :currentTab="currentTab"></Header>
    <ul>
      <li v-for="data in msgListGetter" @click="enterChat(data.type,data.id)">
        <img v-if="data.type === 'group'" :src="data.group_avator" alt="群头像" class="img">
        <img v-if="data.type === 'private'" :src="data.avator" alt="用户头像" class="img">
        <div class="content">
          <div v-if="data.type === 'group'" class="title">{{data.group_name}}<span>{{data.time}}</span></div>
          <div v-if="data.type === 'private'" class="title">{{data.name}}<span>{{data.time}}</span></div>
          <div class="message">{{data.message}}</div>
        </div>
  
      </li>
    </ul>
    <Footer :currentTab="currentTab"></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import axios from "axios"
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'message',
    data() {
      return {
        currentTab: 1
      }
    },
    components: {
      Header,
      Footer
    },
    computed: {
      ...mapGetters([
        'msgListGetter'
      ])
    },
    methods: {
      enterChat(chatType, chatId) {
        const path = chatType == 'private' ? `/private_chat/${chatId}` : `/group_chat/${chatId}`
        this.$router.push(path)
      }
    },
    created() {
      this.$store.dispatch('msgListAction')
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100vh;
    padding-top: 0.6rem;
    background-color: #fff;
    z-index: 1;
    ul {
      background-color: #fff;
      padding-bottom: 0.5rem;
      li {
        display: flex;
        align-items: center;
        margin: 0.4rem 0.2rem;
        .img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          margin-right: 0.3rem;
        }
        .content {
          display: inline-block;
          .title {
            font-size: 0.32rem;
            span {
              font-size: 0.28rem;
              color: #676767;
              position: absolute;
              right: 0.5rem;
            }
          }
          .message {
            color: #676767;
            font-size: 0.28rem;
          }
        }
      }
    }
  }
</style>