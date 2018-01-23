<template>
  <!-- 机器人聊天 -->
  <div class="wrapper">
    <Message-box :visible="visible" :title="title" @cancel="cancel" @confirm="confirm">
      <p slot="content">{{message}}</p>
    </Message-box>
    <Header :currentTab="currentTab" @showMessageBox="showMessageBox"></Header>
    <Footer :currentTab="currentTab"></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  export default {
    name: 'message',
    data() {
      return {
        currentTab: 3,
        visible: false,
        title: "提示",
        message: ""
      }
    },
    components: {
      Header,
      Footer
    },
    methods: {
      showMessageBox(value) {
        if (value) {
          this.visible = value;
          this.message = "确定要退出登录？"
        }
      },
      cancel(value) {
        this.visible = value;
      },
      confirm(value) {
        if (value) {
          localStorage.removeItem("userToken");
          let self = this;
          setTimeout(function() {
            self.$router.push({
              path: "/login"
            });
          }, 1000);
        }
      }
    }
  }
</script>