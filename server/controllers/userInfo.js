const userModel = require("../models/user_info");

/**
 *  获取用户信息 （不包括密码）
 * @param
 * @return 用户名，性别，头像，最后登录时间，状态等
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

/**
 * 通过要查看的用户id 查询是否是本机用户的好友
 * @param  user_id  other_user_id
 * @return  如果是 返回 user_id  other_user_id 和 remark 备注
 *         否则返回空
 */

let isFriend = async (ctx, next) => {
  const RowDataPacket = await userModel.isFriend(
      ctx.query.user_id,
      ctx.query.other_user_id
    ),
    isFriend = JSON.parse(JSON.stringify(RowDataPacket));
  ctx.body = {
    success: true,
    data: {
      isFriend: isFriend
    }
  };
};

/**
 * 加为好友
 * @param  user_id  本机用户id
 *         other_user_id  对方id
 * @return
 *
 */
let addAsFriend = async (ctx, next) => {
  await userModel.addAsFriend(ctx.request.body.user_id, ctx.request.body.other_user_id)
    .then(result => {
      console.log("addAsFriend", result);
      if (result) {
        ctx.body = {
          success: true
        };
        console.log("添加好友成功");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getUserInfo,
  isFriend,
  addAsFriend
};
