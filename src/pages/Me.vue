<template>
  <!-- 我 -->
  <div class="wrapper">
    <Message-box :visible="visible" :title="title" @cancel="cancel" @confirm="confirm">
      <p slot="content">{{message}}</p>
    </Message-box>
    <Header :currentTab="currentTab" @showMessageBox="showMessageBox"></Header>
    <div class="content">
      <img :src="userInfo.avator" alt="">
        <p>用户名：{{userInfo.name}}</p>
        <p>性别：{{userInfo.sex}}</p>
         <p>来自：{{userInfo.place}}</p>
    </div>
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
        message: "",
        userInfo:{}
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
          //登出
          socket.emit('logout',this.userInfo.user_id)
          localStorage.removeItem("userToken");
          localStorage.removeItem("userInfo");
          let self = this;
          setTimeout(function() {
            self.$router.push({
              path: "/login"
            });
          }, 1000);
        }
      }
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
  }
</script>
<style lang="scss" scoped>
  .content{
    text-align: center;
    img{
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin: 2rem auto;
    }
    p{

    font-size: 0.32rem;
    line-height: 0.8rem;
    max-width: 80%;
    margin: 0 auto;
    color: #4290F7;
    }

  }
</style>