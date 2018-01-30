const {query} = require('../utils/db');
/**
 * 获取群消息 
 * @param  群id
 * @return  message time from_user 群消息及对应的时间和发送人id和头像
 */
let getGroupMsg = function(groupId){
    let _sql = `SELECT g.message , g.time , g.from_user ,i.avator  FROM group_msg  As g inner join user_info AS i ON g.from_user = i.id  WHERE to_group = ? order by time `  
    return query( _sql,groupId)
}
/**
 * 获取群成员
 * @param   群id
 * @return  group_member_id  群成员id
 */
let getGroupMember = function(groupId){
    let _sql = ` SELECT user_id AS group_member_id  FROM group_user_relation  WHERE group_id = ? `
    return query( _sql,groupId)
}
/**
 * 获取群资料
 * @param   groupId 
 * @return  
 */
let getGroupInfo = function(groupId){
    let _sql = ` SELECT group_name , group_notice ,group_avator ,group_creater ,creater_time FROM group_info  WHERE id = ? ` 
    return query( _sql,groupId)
}

module.exports = {
    getGroupMsg,
    getGroupMember,
    getGroupInfo
}