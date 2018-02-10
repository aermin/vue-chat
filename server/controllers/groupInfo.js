const groupInfo = require("../models/groupInfo");

/**
 * 加入群
 * @param   user_id  用户id
 * @param   group_id  群id
 * @return
 */

let joinGroup = async (ctx, next) => {
  await groupInfo.joinGroup(ctx.request.body.user_id, ctx.request.body.group_id)
    .then(res => {
      ctx.body = {
        success: true
      };
      console.log("加入群成功");
    });
};

/**
 * 查看某个用户是否在某个群中(根据返回的数组长度是不是为零就知道)
 * @param   user_id  用户id
 * @param   group_id  群id
 * @return
 */
let isInGroup = async (ctx, next) => {
  const RowDataPacket = await groupInfo.isInGroup(
      ctx.query.user_id,
      ctx.query.group_id
    ),
    group_user = JSON.parse(JSON.stringify(RowDataPacket));
  ctx.body = {
    success: true,
    data: {
      group_user: group_user
    }
  };
};

module.exports = {
  joinGroup,
  isInGroup
};
