import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 存放机器人开场白
    robotmsg: [
      {
        message: "hi , 欢迎与我聊天，问我问题哦！",
        user: "robot"
      }
    ],
    chatList:[
        {
          name:"技术交流群",
            img:"../../static/peoples1.jpg",
            type:"group",
            id:"",
            message:"",
            time:"2017-12-12",
            unread:"0"
        },
        {
            name:"闲聊群",
              img:"../../static/peoples2.jpg",
              type:"group",
              id:"",
              message:"",
              time:"2017-11-11",
              unread:"0"
        },
        {
            name:"路飞",
              img:"../../static/people1.jpg",
              type:"private",
              id:"",
              message:"",
              time:"2017-11-11",
              unread:"0"
        },
        {
            name:"索隆",
              img:"../../static/people2.jpg",
              type:"private",
              id:"",
              message:"",
              time:"2017-11-11",
              unread:"0"
        },
    ]
  },
  getters: {
    robotMsgGetter: state => state.robotmsg,
    chatListGetter:state => state.chatList
  },
  mutations: {
    robotMsgMutation(state, data) {
      state.robotmsg.push(data)
    },
    chatListMutation(state, data) {
    state.chatList.push(data)
    }
  },
  actions: {
    robatMsgAction({ commit }, data) {
      console.log(data + "  robatMsgAction");
      axios.get("/api/v1/robot", {
          params: data
        })
        .then(res => {
          if (res) {
            if (res.data.data.code === 100000) {
              commit("robotMsgMutation", {
                message: res.data.data.text,
                user: "robot"
              });
            } else if (res.data.data.code === 200000) {
              let data = res.data.data.text + res.data.data.url;
              commit("robotMsgMutation", { message: data, user: "robot" });
            } else if (res.data.data.code === 302000) {
              commit("robotMsgMutation", {
                message: "暂不支持此类对话",
                user: "robot"
              });
            } else {
              commit("robotMsgMutation", {
                message: "暂不支持此类对话",
                user: "robot"
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    // ,
    // chatListAction({ commit }, data) {
    //     console.log(data + "  chatListAction");
    // }
  }
});

export default store;
