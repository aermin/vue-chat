import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
	toNomalTime
} from "../utils/transformTime";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		firstLoad: true, //是否是第一次加载首页消息页面
		robotmsg: [
			// 机器人首语
			{
				message: "hi , 欢迎与我聊天，问我问题哦！",
				user: "robot"
			}
		],
		msgList: [], // 消息首页列表
		groupInfo: [], //群资料
		groupMember: [], //群成员
		toUserInfo: [], //私聊对方的资料
		someOneInfo: {}, //某个用户的用户资料
		addAsFriend: {
			//加为好友
			user_id: "", //请求方
			other_user_id: "" //被请求方
		},
		newFriend: [], //新朋友列表
		myInfo: {}, //我的信息
		tabTips: { //底部tab的未读提示 暂时只做好友添加请求的提示
			addFriendReq: "" //是否有好友添加请求 0没有 1有
		}
	},
	getters: {
		robotMsgGetter: state => state.robotmsg,
		msgListGetter: state => state.msgList,
		updateListGetter: state => state.msgList,
		groupInfoGetter: state => state.groupInfo,
		groupMemberGetter: state => state.groupMember,
		toUserInfoGetter: state => state.toUserInfo,
		someOneInfoGetter: state => state.someOneInfo,
		addAsFriendGetter: state => state.addAsFriend,
		newFriendGetter: state => state.newFriend,
		myInfoGetter: state => state.myInfo,
		tabTipsGetter: state => state.tabTips
	},
	mutations: {
		//是否是第一次加载首页消息页面
		firstLoadMutation(state, data) {
			state.firstLoad = data;
		},
		//机器人消息
		robotMsgMutation(state, data) {
			state.robotmsg.push(data);
		},
		//我的信息
		myInfoMutation(state, data) {
			state.myInfo = data;
		},
		//首页消息列表
		msgListMutation(state, data) {
			state.msgList = data;
		},
		//未读信息归零
		resetUnredMutation(state, id) {
			state.msgList.forEach(ele => {
				if (ele.id == id) {
					ele.unread = null
				}
			})
		},
		//是否有好友添加请求
		friendReqTipsMutation(state, data) {
			if (data) {
				state.tabTips.addFriendReq = "tips";
			} else {
				state.tabTips.addFriendReq = "";
			}

		},
		//更新首页消息列表
		updateListMutation(state, data) {
			let unread = 0;
			data.time = toNomalTime(data.time);
			//添加
			if (data.action === "push") {
				data.unread = unread + 1;
				state.msgList.push(data);
				return
			}
			//删除
			if (data.action === "delete") {
				for (var i = 0; i < state.msgList.length; i++) {
					if (state.msgList[i].id == data.id) {
						state.msgList.splice(i, 1);
					};
				}
				return
			}
			//替换更新
			if (data.type === "private") {
				//在请求添加好友的情况下
				let haveThisEle = state.msgList.filter(ele => ele.other_user_id == data.from_user);
				if (haveThisEle.length === 0 && data.action === "request") {
					data.unread = unread + 1;
					data.other_user_id = data.from_user;
					data.id = data.from_user;
					delete data.from_user;
					delete data.to_user;
					state.msgList.push(data);
					return
				}
				//正常私聊情况下
				state.msgList.forEach(ele => {
					//判断是哪个人  对方发的
					if (ele.other_user_id == data.from_user) {
						ele.message = data.name + ' : ' + data.message;
						ele.time = data.time;
						ele.name = data.name;
						ele.avator = data.avator;
						//如果是当前的聊天，没必要加未读标识了
						if (data.chatOfNow) return
						//增加未读消息数
						if (!ele.unread) {
							ele.unread = unread + 1;
						} else {
							ele.unread += 1;
						}
					} else if (ele.other_user_id == data.to_user) { //自己发的
						ele.message = data.name + ' : ' + data.message;
						ele.time = data.time;
					}
				});
			} else if (data.type === "group") {
				state.msgList.forEach(ele => {
					//判断是哪个群
					if (ele.group_id == data.groupId) {
						ele.message = data.name + ' : ' + data.message;
						ele.time = data.time;
						ele.group_name = data.group_name;
						ele.group_avator = data.group_avator;
						ele.id = data.groupId;
						//增加未读消息数
						if (data.chatOfNow) {
							ele.unread = null;
						} else {
							if (!ele.unread) {
								ele.unread = unread + 1;
							} else {
								ele.unread += 1;
							}
						}
					} else {

					}
				});
			}
			// }
		},
		//群资料
		groupInfoMutation(state, data) {
			state.groupInfo = data;
		},
		//群成员
		groupMemberMutation(state, data) {
			state.groupMember = data;
		},
		//私聊对方的用户资料
		toUserInfoMutation(state, data) {
			state.toUserInfo = data;
		},
		//用户资料
		someOneInfoMutation(state, data) {
			state.someOneInfo = data;
		},
		//添加好友
		addAsFriendMutation(state, data) {
			state.addAsFriend = data;
		},
		//新朋友列表
		newFriendMutation(state, data) {
			state.newFriend = data;
		}
	},
	actions: {
		//机器人
		robatMsgAction({
			commit
		}, data) {
			// console.log(data + "  robatMsgAction");
			axios.get("/api/v1/robot", {
					params: data
				}).then(res => {
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
		async msgListAction({
			commit
		}) {
			// console.log('msgListAction')
			const res = await axios.get("/api/v1/message");
			console.log("res", res);
			if (res.data.success) {
				const groupList = res.data.data.groupList;
				const privateList = res.data.data.privateList;
				groupList.forEach(element => {
					element.type = "group";
					element.time = element.time ? toNomalTime(element.time) : toNomalTime(element.creater_time);
					element.id = element.group_id;
				});
				privateList.forEach(element => {
					element.type = "private";
					element.time = element.time ? toNomalTime(element.time) : toNomalTime(element.be_friend_time);
					element.id = element.other_user_id;
					// element.unread = 0;
				});
				const allMsgList = groupList.concat(privateList);
				allMsgList.sort((a, b) => {
					return b.time - a.time;
				});
				commit("msgListMutation", allMsgList);
			}
		},
		//某个用户的用户资料
		async someOneInfoAction({
			commit
		}, user_id) {
			// console.log("user_id666", user_id);
			const res = await axios.get("/api/v1/user_info", {
				params: {
					user_id: user_id
				}
			});
			commit("someOneInfoMutation", res.data.data.userInfo[0]);
		},
		//获取新朋友列表
		async newFriendAction({
			commit
		}, user_id) {
			// console.log("user_id666", user_id);
			const res = await axios.get("/api/v1/get_newfriends");
			// console.log('newFriendAction', res)
			commit("newFriendMutation", res.data.data.newFriends);
		}
	}
});
export default store;