<template>
  <!--  主页面底部 -->
  <div class="footer">
    <router-link class="item" to="message">
      <svg class="icon" aria-hidden="true">
            <use  v-show="currentTab === 1" xlink:href="#icon-messagefill"></use>
            <use v-show="currentTab !== 1" xlink:href="#icon-message1"></use>
        </svg>
    </router-link>
    <router-link class="item" to="robot">
      <svg class="icon" aria-hidden="true">
            <use  v-show="currentTab === 2" xlink:href="#icon-zhinengfenxi1"></use>
            <use v-show="currentTab !== 2" xlink:href="#icon-zhinenghua"></use>
        </svg>
    </router-link>
    <router-link class="item" :class="this.tabTipsGetter.addFriendReq"  to="contact_list">
    <!-- <router-link v-else class="item " to="contact_list"> -->
      <svg class="icon" aria-hidden="true">
            <use  v-show="currentTab === 3" xlink:href="#icon-group_fill"></use>
            <use v-show="currentTab !== 3" xlink:href="#icon-group"></use>
        </svg>
    </router-link>
    <router-link class="item" to="me">
      <svg class="icon" aria-hidden="true">
            <use  v-show="currentTab === 4" xlink:href="#icon-myfill"></use>
            <use v-show="currentTab !== 4" xlink:href="#icon-my"></use>
        </svg>
    </router-link>
  </div>
</template>

<script>
import axios from "axios"
import {
	mapGetters
} from 'vuex'
  export default {
    name: 'Footer',
    props: ['currentTab'],
    data() {
      return {
      }
  },
  computed: {
      ...mapGetters([
          'tabTipsGetter'
      ])
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99;
    font-size: 0.36rem;
    display: flex;
    justify-content: space-between;
    background: white;
    border-top: 0.01rem solid #eee;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    .item {
      margin: 0 auto;
    }
    .tips::after {
      content: "";
      width: 0.18rem;
      height: 0.18rem;
      display: inline-block;
      position: relative;
      border-radius: 50%;
      background-color: red;
      position: absolute;
    }
  }
</style>
