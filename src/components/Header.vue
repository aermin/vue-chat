<template>
<div class="header">
    <svg v-show="currentTab === 3" class="icon" aria-hidden="true" @click="showMessageBox">
            <use  xlink:href="#icon-back"></use>
        </svg>
  <div>{{title}}</div>
        <svg v-show="currentTab === 3" class="icon" aria-hidden="true" @click="showMessageBox">
            <use  xlink:href="#icon-ico-exit"></use>
        </svg>
</div>
</template>

<script>
export default {
  name: 'Header',
  props: ['currentTab','chatTitle'],
  data() {
    return {
    }
  },
  computed: {
    title() {
      if(this.currentTab === 1){
          return   '消息'
      } else if(this.currentTab === 2){
          return '机器人'
      } else if(this.currentTab === 3){
          return '我'
      } else{
        return this.chatTitle
      }
    }
  },
  methods:{
    showMessageBox(){
           this.$emit("showMessageBox", true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    line-height: 0.6rem;
    background: #1E90FF;
    color: white;
    font-size: 0.32rem;
    letter-spacing: 0.04rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    .icon{
      position: absolute;
      right: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
      -moz-transform:  translateY(-50%);
      -webkit-transform:  translateY(-50%);
    }
}
</style>
