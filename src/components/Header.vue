<template>
<div class="header">
  <div>{{title}}</div>
</div>
</template>

<script>
export default {
  name: 'Header',
  props: ['currentTab'],
  data() {
    return {
    }
  },
  computed: {
    title() {
      return this.currentTab === 1 ? '消息' : this.currentTab === 2 ? '机器人' : '我'
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
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 3;
}
</style>
