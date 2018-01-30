const {query} = require('../utils/db');

// 注册用户
let insertData = function (value) {
    let _sql = "insert into user_info(name,password) values(?,?);"
    return query(_sql, value)
}

// 通过用户名查找用户信息 user_info
let findDataByName = function (  name ) {
    let _sql = `SELECT * FROM user_info WHERE name= ? `
    return query( _sql,name)
}
// 通过用户id查找用户信息 user_info
let findDataByUserid = function (  userid ) {
    let _sql = `SELECT * FROM user_info WHERE id= ? `
    return query( _sql,userid)
}


module.exports = {
    insertData,
    findDataByName
}