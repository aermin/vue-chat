<template>
  <!-- 机器人聊天 -->
  <div class="wrapper">
     <Header :currentTab="currentTab"></Header>
     <Footer :currentTab="currentTab"></Footer>
  </div>
</template>
<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'message',
  data () {
    return {
      currentTab: 3
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>