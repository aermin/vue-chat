import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { toNomalTime } from "../utils/transformTime";

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
    // 消息首页列表
    msgList: [],
    //群聊详细 （群名字，群头像，群成员，群公告等）
    groupDetail:{
      groupInfo:[],
      groupMember:[]
    }
  },
  getters: {
    robotMsgGetter: state => state.robotmsg,
    msgListGetter: state => state.msgList,
    groupDetailGetter:state => state.groupDetail
  },
  mutations: {
    robotMsgMutation(state, data) {
      state.robotmsg.push(data);
    },
    msgListMutation(state, data) {
      state.msgList = data;
    },
    groupDetailMutation(state, data) {
      state.groupDetail = data;
    },
  },
  actions: {
    //机器人
    robatMsgAction({ commit }, data) {
      console.log(data + "  robatMsgAction");
      axios
        .get("/api/v1/robot", {
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
              commit("robotMsgMutation", {
                message: data,
                user: "robot"
              });
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
    },
      // 消息首页列表
    async msgListAction({ commit }) {
      const res = await axios.get("/api/v1/message");
      console.log("res", res);
      if (res.data.success) {
        const groupList = res.data.data.groupList;
        const privateList = res.data.data.privateList;
        groupList.forEach(element => {
          element.type = "group";
          element.time = toNomalTime(element.time);
          element.id = element.group_id;
        });
        privateList.forEach(element => {
          element.type = "private";
          element.time = toNomalTime(element.time);
          element.id = element.other_user_id;
        });
        const allMsgList = groupList.concat(privateList);
        allMsgList.sort((a, b) => {
          return b.time - a.time;
        });
        console.log("allMsgList", allMsgList);
        commit("msgListMutation", allMsgList);
      }
    }
  }
});
export default store;
