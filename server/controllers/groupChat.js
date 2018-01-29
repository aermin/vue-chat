const groupChatModel = require("../models/groupChat");

module.exports ={
    groupMsg:  async (ctx, next) => {
        try {
          const groupId = ctx.query.group_id;
          const RowDataPacket = await groupChatModel.getGroupMsg(groupId);
          const groupMsg = JSON.parse(JSON.stringify(RowDataPacket));
          console.log("groupMsg    ", groupMsg);
          ctx.body = {
            success: true,
            data: {
              groupMsg: groupMsg
            }
          };
        } catch (error) {
          console.log(error);
        }
    },
    groupDetail:  async (ctx, next) => {
        try {
          const groupId = ctx.query.group_id ,
                RowDataPacket1 = await groupChatModel.getGroupMember(groupId),
                RowDataPacket2 = await groupChatModel.getGroupInfo(groupId),
                groupMember = JSON.parse(JSON.stringify(RowDataPacket1)),
                groupInfo  = JSON.parse(JSON.stringify(RowDataPacket2));
          console.log("groupMember    ", groupMember);
          console.log("groupInfo    ", groupInfo);
          ctx.body = {
            success: true,
            data: {
                groupMember: groupMember,
                groupInfo:groupInfo
            }
          };
        } catch (error) {
          console.log(error);
        }
    },
} 
