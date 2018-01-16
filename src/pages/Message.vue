<template>
  <!-- 消息 -->
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
      currentTab: 1
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
