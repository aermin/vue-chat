let userModel = require('../models/users');
let md5 = require('md5');

module.exports = async(ctx, next) => {
    console.log("register");
    var user = {
        name: ctx.request.body.username,
        pass: ctx.request.body.password
    }
    await userModel
        .findDataByName(user.name)
        .then(result => {
            if (result.length) {
                try {
                    throw Error('用户存在')
                } catch (error) {
                    //处理err
                    console.log(error)
                }
                ctx.body = {
                    resCode: 'URSER_EXIST'
                };;
            } else if ( user.pass == '') {
                ctx.body = {
                    resCode: 'PASSWOED_ERROR'
                };
            } else {
                ctx.body = {
                    resCode: 'SUCCESS'
                };
                console.log('注册成功')
                // ctx.session.user=ctx.request.body.name
                userModel.insertData([
                    ctx.request.body.username,
                    md5(ctx.request.body.password)
                ])
            }
        })
}
