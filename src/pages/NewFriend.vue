<template>
    <div class="wrapper">
        <ul>
            <li v-for="data in msgListGetter" @click="enterChat(data.type,data.id)">
            </li>                                        
        </ul>
    </div>
</template>

<script>
    export default {
        name: '',
    
        props: {},
    
        components: {},
    
        data() {
            return {}
        },
    
        computed: {},
    
        watch: {},
    
        methods: {},
    
        mounted() {}
    }
</script>

<style lang="scss" scoped>
    
</style>