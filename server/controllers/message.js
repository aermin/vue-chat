const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const msgModel = require("../models/message");

module.exports = async (ctx, next) => {
  try {
    const auth = ctx.get("Authorization");
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, secret);
    const user_id = payload.id;
    const res1 = await msgModel.getPrivateList(user_id);
    const privateList = JSON.parse(JSON.stringify(res1));
    const res2 = await msgModel.getGroupList(user_id);
    const groupList = JSON.parse(JSON.stringify(res2));
    console.log("privateList    ", privateList);
    console.log("groupList    ", groupList);
    ctx.body = {
      success: true,
      data: {
        privateList: privateList,
        groupList: groupList
      }
    };
  } catch (error) {
    console.log(error);
  }
};
