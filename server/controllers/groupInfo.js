const groupInfo = require("../models/groupInfo");

/**
 * 加入群
 * @param   user_id  用户id
 * @param   group_id  群id
 * @return
 */

let joinGroup = async (ctx, next) => {
	await groupInfo.joinGroup(ctx.request.body.user_id, ctx.request.body.group_id)
		.then((res) => {
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

/**
 * [isInGroup 建群]
 * @param  {[type]}   ctx  [群名，群公告，群头像，创建人，创建时间]
 * @param  {Function} next [description]
 * @return {Promise}       [description]
 */
let createGroup = async (ctx, next) => {
	const arr = [ctx.request.body.group_name, ctx.request.body.group_notice, ctx.request.body.group_avator, ctx.request.body.group_creater, ctx.request.body.creater_time];
	await groupInfo.createGroup(arr);
	const RowDataPacket = await groupInfo.getGroupId(),
		group_id = JSON.parse(JSON.stringify(RowDataPacket));
	console.log('group_id', group_id)
	ctx.body = {
		success: true,
		data: {
			group_id: group_id
		}
	};
};

module.exports = {
	joinGroup,
	isInGroup,
	createGroup
};