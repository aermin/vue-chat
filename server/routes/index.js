
let router = require('koa-router')();
const baseApi = require('../config').baseApi;
const register =require('../controllers/register');
const login = require('../controllers/login')
const verify = require('../middlewares/verify')
const robot = require('../controllers/robot')
const message = require('../controllers/message')

router.prefix(`/${baseApi}`)
router.post('/register', register)
        .post('/login', login)
        .get('/robot',robot)
        .get('/message' ,message.getAllList)


console.log("router");

module.exports = router