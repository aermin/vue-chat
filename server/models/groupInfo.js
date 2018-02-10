const {
	query
} = require('../utils/db');


// 加入群
let joinGroup = (user_id, group_id) => {
	let _sql = "INSERT INTO group_user_relation(user_id,group_id) VALUES(?,?);"
	return query(_sql, [user_id, group_id])
}

// 查看某个用户是否在某个群中
let isInGroup = (user_id, group_id) => {
	let _sql = "SELECT * FROM group_user_relation WHERE user_id = ? AND group_id = ?;"
	return query(_sql, [user_id, group_id])
}

// 建群
let createGroup = (arr) => {
	let _sql = "INSERT INTO group_info (group_name,group_notice,group_avator,group_creater,creater_time) VALUES (?,?,?,?,?)"
	return query(_sql, arr)
}
let getGroupId = () => {
	let _sql = " SELECT LAST_INSERT_ID()"
	return query(_sql)
}

module.exports = {
	joinGroup,
	isInGroup,
	createGroup,
	getGroupId
};