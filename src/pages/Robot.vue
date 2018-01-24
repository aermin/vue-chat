<template>
  <!-- 机器人聊天 -->
  <div>
    <Header :currentTab="currentTab"></Header>
    <div class="wrapper">
      <Private-chat img="../../static/robot.gif" :msg="msg" :name="name" :time="time"></Private-chat>
    <Private-chat  me="true" img="../../static/me.jpg"  :msg="msg" :name="name" :time="time"></Private-chat>
    </div>
    <Footer :currentTab="currentTab"></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import PrivateChat from '../components/PrivateChat.vue'
  export default {
    name: 'Robot',
    data() {
      return {
        currentTab: 2,
        msg: "你发好斤计是反计较斤斤计较是是是",
        name:"大白",
        time:"2017"
  
      }
    },
    components: {
      Header,
      Footer,
      PrivateChat
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: #EDECED;
    height: 100vh;
    padding-top: 0.8rem;
  }
</style>