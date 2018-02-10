<template>
    <div class="wrapper">
        <Header goback='true' :chatTitle="chatTitle"></Header>
        <!-- <ul>
                                <li  v-for="data in datalist">
                                    <img :src="data.avator" alt="">
                                    <div>
                                        <span>{{data.name}}</span>
                                    </div>
                                </li>
                            </ul> -->
        <ul>
            <li v-for="data in datalist">
                <div @click="enterIt(data.id)">
                    <img :src="data.avator" alt="">
                    <div class="content">
                        <p>{{data.name}}
                            <svg v-if="data.sex = '男'" class="icon" aria-hidden="true"> <use  xlink:href="#icon-icon1"></use></svg>
                            <svg v-else class="icon" aria-hidden="true"> <use  xlink:href="#icon-icon"></use></svg>
                        </p>
                        <p>
                            <svg v-if="data.place" class="icon" aria-hidden="true"> <use  xlink:href="#icon-placeholder"></use></svg> {{data.place}}
                            <svg v-if="data.github" class="icon" aria-hidden="true"> <use  xlink:href="#icon-github"></use></svg> {{data.github}}
                        </p>
                        <!-- <p>{{data.content}}</p> -->
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import axios from "axios"
    export default {
        components: {
            Header
        },
    
        data() {
            return {
                chatTitle: "查找中...",
                datalist: []
            }
        },
    
        computed: {},
    
        watch: {},
    
        methods: {
            getChatTitle() {
                const username = this.$route.params.username;
                const groupname = this.$route.params.groupname;
                if (username) {
                    this.chatTitle = "查找结果（人）";
                    this.findPeople(username)
                } else if (groupname) {
    
                }
            },
            findPeople(username) {
                axios.get('/api/v1/find_people', {
                    params: {
                        name: username
                    }
                }).then(res => {
                    console.log('findPeople', res)
                    this.datalist = res.data.data.userInfo;
                })
            },
            enterIt(val) {
                this.$router.push(`/user_info/${val}`)
            },
            // findPeople(username) {
            //     axios.get('/api/v1/find_people', {
            //         params: {
            //             name: username
            //         }
            //     }).then(res => {
            //         console.log('findPeople', res)
            //     })
            // }
        },
    
        mounted() {
            this.getChatTitle();
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        padding-top: 0.7rem;
        ul {
            margin-top: 0.2rem;
            li {
                padding: 0 0.2rem;
                cursor: pointer;
                background-color: #fff;
                list-style-type: none;
                margin-bottom: 0.16rem;
                position: relative;
                img {
                    width: 0.8rem;
                    height: 0.8rem;
                }
                .content {
                    display: inline-block;
                    font-size: 0.24rem;
                    p:nth-child(1) {
                        font-size: 0.28rem;
                        .icon {
                            width: 0.26rem;
                            height: 0.26rem;
                            margin-left: 0.1rem;
                        }
                    }
                    p:nth-child(2) {
                        font-size: 0.2rem;
                        line-height: 0.8rem;
                        color: #555;
                        .icon {
                            width: 0.36rem;
                            height: 0.36rem;
                            margin: 0 0.1rem;
                        }
                        // margin-bottom: 0.02rem;
                    }
                }
            }
        }
    }
</style>