const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const msgModel = require("../models/message");

module.exports = {
    getGroupList: async(ctx, next) => {
        const auth = ctx.get("Authorization");
        const token = auth.split(" ")[1];
        const payload = jwt.verify(token, secret);
        const user_id = payload.id;
        const groupMessage = await msgModel.getGroupList(user_id);
        return groupMessage
    },
    getPrivateList : async(ctx,next) =>{
        const auth = ctx.get("Authorization");
        const token = auth.split(" ")[1];
        const payload = jwt.verify(token, secret);
        const user_id = payload.id;
        const groupMessage = await msgModel.getPrivateList(user_id);
        return groupMessage
    },

    getAllList: async(ctx,next)=>{
        try {
            const privateList = await getGroupList();
            const groupList = await getGroupList();
            console.log("privateList    " , privateList)
            console.log("groupList    " , groupList)
            ctx.body = {
                success: true,
                data: {
                    privateList,
                    groupList
                }
              };
        } catch (error) {
            console.log(error)
        }        
    }

}