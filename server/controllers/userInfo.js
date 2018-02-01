const userModel = require("../models/user_info");

/**
 *  获取用户信息 （不包括密码）
 * @param
 * @return 用户名，性别，头像，最后登录时间，状态
 */

let getUserInfo = async (ctx, next) => {
  const RowDataPacket = await userModel.getUserInfo(ctx.query.user_id),
  userInfo = JSON.parse(JSON.stringify(RowDataPacket));
  ctx.body = {
    success: true,
    data: {
        userInfo: userInfo
    }
  };
};

module.exports = {
  getUserInfo
};
