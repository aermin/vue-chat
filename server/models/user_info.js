const {query} = require('../utils/db');

// 注册用户
let insertData = function (value) {
    let _sql = "insert into user_info(name,password) values(?,?);"
    return query(_sql, value)
}

// 通过名字查找用户
let findDataByName = function (  name ) {
    let _sql = `
      SELECT * from user_info
        where name="${name}"
        `
    return query( _sql)
}

module.exports = {
    insertData,
    findDataByName
}