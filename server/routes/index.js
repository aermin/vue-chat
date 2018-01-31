
let router = require('koa-router')();
const baseApi = require('../config').baseApi;
const register =require('../controllers/register');
const login = require('../controllers/login')
const verify = require('../middlewares/verify')
const robot = require('../controllers/robot')
const message = require('../controllers/message')
const groupChat = require ('../controllers/groupChat.js') 

router.prefix(`/${baseApi}`)
router.post('/register', register)
        .post('/login' ,login)
        .get('/robot',verify , robot)
        .get('/message' ,verify, message)
        .get('/group_chat' , verify ,groupChat.getGroupDetail)
        .post('/group_chat_msg' ,groupChat.saveGroupMsg)
        .post('/group_chat_relation' ,groupChat.addGroupUserRelation)
console.log("router");

module.exports = router