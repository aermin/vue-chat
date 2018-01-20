let userModel = require('../models/users');
let md5 = require('md5');

module.exports = async(ctx, next) => {
    let name =ctx.request.body.name;
    let password = ctx.request.body.password;

    await userModel.findDataByName(name) 
    .then(result=>{
        let res = JSON.parse(JSON.stringify(result));
        if(name == res[0]['name'] && md5(password) === res[0]['password']){
            ctx.body = 'true' ; //返回true给前端 
            ctx.session.user=res[0]['name']
            ctx.session.id=res[0]['id']
            console.log('登录成功');
        }
    }).catch(err=>{
        ctx.body='false'
        console.log('用户名或密码错误!')
    })
}