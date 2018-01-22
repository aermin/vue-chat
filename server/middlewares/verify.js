/**
 * @file 处理验证的中间件
 */

// import jwt from 'jsonwebtoken'
// import {secret} from '../config'

const jwt = require("jsonwebtoken");
const secret = require("../config");

module.exports = async function (ctx, next) {
    // 同步验证
    const auth = ctx.get('Authorization')
    const token = auth.split(' ')[1]
    try {
        jwt.verify(token, secret)
        await next()
    }
    catch (err) {
        ctx.throw(401, err)
    }
}
