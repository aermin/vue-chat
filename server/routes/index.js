
let router = require('koa-router')();
const baseApi = require('../config').baseApi;
const register =require('../controllers/register');
const login = require('../controllers/login')
const verify = require('../middlewares/verify')
const robot = require('../controllers/robot')

router.prefix(`/${baseApi}`)
router.post('/register', register)
        .post('/login', login)
        .get('/robot',robot)
console.log("router");

module.exports = router