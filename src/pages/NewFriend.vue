<template>
    <div class="wrapper">
        <ul>
            <li v-for="data in newFriendGetter" @click="enterChat(data.type,data.id)">
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: '',
    
        props: {},
    
        components: {},
    
        data() {
            return {}
        },
    
        computed: {
            ...mapGetters([
                'newFriendGetter'
            ])
        },
    
        watch: {},
    
        methods: {
            // 获取socket消息
            getMsgBySocket() {
                socket.removeAllListeners();
                socket.on('getresponse', (data) => {
                    data.time = toNomalTime(data.time);
                    console.log('data',data)
                    //本地添加此条信息
                    this.newFriendGetter.push(data);
                    this.$store.commit('newFriendMutation', data)
                })
            },
    
            mounted() {}
        }
</script>

<style lang="scss" scoped>
    
</style>