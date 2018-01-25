<template>
  <!--  主页面底部 -->
  <div class="footer">
    <router-link class="item" to="message">
      <svg class="icon" aria-hidden="true">
            <use  v-show="currentTab === 1" xlink:href="#icon-message-copy"></use>
            <use v-show="currentTab !== 1" xlink:href="#icon-message"></use>
        </svg>
    </router-link>
    <router-link class="item" to="robot">
      <svg class="icon" aria-hidden="true">
            <use  v-show="currentTab === 2" xlink:href="#icon-robot-copy"></use>
            <use v-show="currentTab !== 2" xlink:href="#icon-robot"></use>
        </svg>
    </router-link>
    <router-link class="item" to="me">
      <svg class="icon" aria-hidden="true">
            <use  v-show="currentTab === 3" xlink:href="#icon-me-copy"></use>
            <use v-show="currentTab !== 3" xlink:href="#icon-me"></use>
        </svg>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    props: ['currentTab'],
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    font-size: 0.36rem;
    display: flex;
    justify-content: space-between;
    height: 0.5rem;
    background: white;
    border-top: 0.01rem solid #eee;
    .item {
      margin: 0 auto;
    }
  }
</style>
