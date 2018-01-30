const groupChatModel = require("../models/groupChat");

module.exports = async (ctx, next) => {
  try {
    const groupId = ctx.query.groupId,
    RowDataPacket1 = await groupChatModel.getGroupMsg(groupId),
    RowDataPacket2 = await groupChatModel.getGroupInfo(groupId),
    RowDataPacket3 = await groupChatModel.getGroupMember(groupId),
    groupMsg = JSON.parse(JSON.stringify(RowDataPacket1)),
    groupInfo = JSON.parse(JSON.stringify(RowDataPacket2)),
    groupMember = JSON.parse(JSON.stringify(RowDataPacket3));
    const newGroupMember = [];
    groupMember.forEach(element => {
      newGroupMember.push(element.group_member_id);
    });
    // console.log('newGroupMember',newGroupMember)
    ctx.body = {
      success: true,
      data: {
        groupMsg: groupMsg,
        groupInfo:groupInfo,
        groupMember:newGroupMember
      }
    };
  } catch (error) {
    console.log(error);
  }
}
