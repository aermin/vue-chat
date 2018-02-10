const {query} = require('../utils/db');


// 加入群
let joinGroup = function (user_id,group_id) {
    let _sql = "INSERT INTO group_user_relation(user_id,group_id) VALUES(?,?);"
    return query(_sql, [user_id,group_id])
}

// 查看某个用户是否在某个群中
let isInGroup = function (user_id,group_id) {
    let _sql = "SELECT * FROM group_user_relation WHERE user_id = ? AND group_id = ?;"
    return query(_sql, [user_id,group_id])
}


module.exports = {
    joinGroup,
    isInGroup
  };
