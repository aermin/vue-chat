
const router = require('koa-router')(),
 baseApi = require('../config').baseApi,
 register =require('../controllers/register'),
 login = require('../controllers/login'),
 verify = require('../middlewares/verify'),
 robot = require('../controllers/robot'),
 message = require('../controllers/message'),
 groupChat = require ('../controllers/groupChat.js'),
 privateChat = require ('../controllers/privateChat.js');


router.prefix(`/${baseApi}`)
router.post('/register', register) //注册
        .post('/login' ,login) //登录
        .get('/robot',verify , robot) //机器人交流
        .get('/message' ,verify, message) // 获取首页列表信息
        .get('/group_chat' , verify ,groupChat.getGroupDetail) //获取群相关内容
        .post('/group_chat_msg' , verify ,groupChat.saveGroupMsg) // 保存群信息
        .post('/group_chat_relation' , verify ,groupChat.addGroupUserRelation) // 添加群成员
        .get('/private_detail' , privateChat.getprivateDetail) // 获取私聊相关内容
        .post('/private_save_msg',privateChat.savePrivateMsg) //保存私聊信息
console.log("router");

module.exports = router