<template>
  <!-- 我 -->
  <div class="wrapper">
    <Message-box :visible="visible" :title="title" @cancel="cancel" @confirm="confirm">
      <p slot="content">{{message}}</p>
    </Message-box>
    <Header :currentTab="currentTab" @showMessageBox="showMessageBox"></Header>
    <ul class="content">
      <li class="info" @click="goInfo">
        <img :src="userInfo.avator" alt="">
        <span>{{userInfo.name}}</span>
        <svg class="icon" aria-hidden="true">
                <use  xlink:href="#icon-right"></use>
            </svg>
      </li>
      <!-- <img :src="userInfo.avator" alt="">
          <p>用户名：{{userInfo.name}}</p>
          <p>性别：{{userInfo.sex}}</p>
          <p>来自：{{userInfo.place}}</p> -->
    </ul>
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
        currentTab: 4,
        visible: false,
        title: "提示",
        message: "",
        userInfo: {}
      }
    },
    components: {
      Header,
      Footer
    },
    methods: {
      goInfo() {
        const path = `/user_info/${this.userInfo.user_id}`;
        this.$router.push(path)
      },
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
          socket.emit('logout', this.userInfo.user_id)
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
  .wrapper {
    position: relative;
       margin-top: 1rem;
    ul {
      position: relative;
      li {
        background-color: #fff;
           color: #333;
        list-style-type: none;
        display: flex;
        display: -webkit-flex;
        padding: 0.16rem;
      }
      .info {
        img {
          width: 0.8rem;
          height: 0.8rem;
          margin-left: 0.2rem;
        }
        span {
          font-size: 0.28rem;
          position: absolute;
          left: 1.3rem;
          top: 50%;
          transform: translateY(-50%);
          -moz-transform: translateY(-50%); //Mozilla内核浏览器：firefox3.5+
          -webkit-transform: translateY(-50%); //Webkit内核浏览器：Safari and Chrome
          -o-transform: translateY(-50%); //Opera
          -ms-transform: translateY(-50%); //IE9
        }
        .icon {
          font-size: 0.4rem;
          position: absolute;
          right: 0.2rem;
          top: 50%;
          transform: translateY(-50%);
          -moz-transform: translateY(-50%); //Mozilla内核浏览器：firefox3.5+
          -webkit-transform: translateY(-50%); //Webkit内核浏览器：Safari and Chrome
          -o-transform: translateY(-50%); //Opera
          -ms-transform: translateY(-50%); //IE9
        }
      }
    }
    // .content {
    //   left: 50%;
    //   transform: translateX(-50%);
    //   position: absolute;
    //   img {
    //     width: 2rem;
    //     height: 2rem;
    //     border-radius: 50%;
    //     margin: 2rem auto;
    //   }
    //   p {
    //     font-size: 0.32rem;
    //     line-height: 0.8rem;
    //     color: #4290F7;
    //   }
    // }
  }
</style>