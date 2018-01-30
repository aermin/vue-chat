
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
        .post('/login', login)
        .get('/robot',robot)
        .get('/message' ,message)
        .get('/group_chat' ,groupChat)
console.log("router");

module.exports = router