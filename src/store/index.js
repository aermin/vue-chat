import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 存放机器人开场白
    robotmsg: [
      {
        message: "Hi~有什么想知道的可以问我",
        user: "robot"
      }
    ]
  },
  getters: {
    robotMsgGetter: state => state.robotmsg
  },
  mutations: {
    setRobotMsg(state, data) {
      state.robotmsg.push(data);
    }
  },
  actions: {
    robatMsgAction({ commit }, data) {
      console.log(data + "  data");
      axios.get("/api/v1/robot", {
          params: data
        })
        .then(res => {
          if (res) {
            // console.log(res + "   return robotres");
            // robotdata = JSON.parse(res.data.data.data);
            // 分类信息
            console.log(res);
            if (res.data.data.code === 100000) {
              commit("setRobotMsg", {
                message: res.data.data.text,
                user: "robot"
              });
            } else if (res.data.data.code === 200000) {
              let data = res.data.data.text + res.data.data.url;
              commit("setRobotMsg", { message: data, user: "robot" });
            } else if (res.data.data.code === 302000) {
              commit("setRobotMsg", {
                message: "暂不支持此类对话",
                user: "robot"
              });
            } else {
              commit("setRobotMsg", {
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
  }
});

export default store;
