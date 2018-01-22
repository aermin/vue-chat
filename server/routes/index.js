
let router = require('koa-router')();
const baseApi = require('../config').baseApi;
const register =require('../controllers/register');
const login = require('../controllers/login')
const verify = require('../middlewares/verify')

router.prefix(`/${baseApi}`)
router.post('/register', register)
        .post('/login', login)

console.log("router");

module.exports = router