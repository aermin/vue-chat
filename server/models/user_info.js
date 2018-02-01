const {query} = require('../utils/db');

// 注册用户
let insertData = function (value) {
    let _sql = "insert into user_info(name,password) values(?,?);"
    return query(_sql, value)
}

// 通过用户名查找用户信息 user_info
let findDataByName = function (  name ) {
    let _sql = 'SELECT * FROM user_info WHERE name= ? '
    return query( _sql,name)
}
// 通过用户id查找用户信息 user_info 包括密码
let findDataByUserid = function (  userid ) {
    let _sql = 'SELECT * FROM user_info WHERE id= ? '
    return query( _sql,[userid])
}

// 通过用户id查找用户信息 user_info 包括用户名，性别，头像，最后登录时间，状态，不包括密码
let getUserInfo = (user_id)=>{
    const _sql =  
  'SELECT name ,sex ,avator ,place ,last_login ,status  FROM user_info   WHERE  user_info.id =? ' 
    return query(_sql, [user_id]);
  }

module.exports = {
    insertData,
    findDataByName,
    getUserInfo
}