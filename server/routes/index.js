
let router = require('koa-router')();
const baseApi = require('../config').baseApi;
// let indexController = require('../Controllers/indexController.js');
// let articleController = require('../Controllers/articleController.js');
// let checkController = require('../Controllers/checkController');
// let signupController = require('../Controllers/signupController');
// let signinController = require('../Controllers/signinController');
// let signoutController = require('../Controllers/signoutController');
// let postController = require('../Controllers/postController');
// let createController =require('../Controllers/createController');
const register =require('../controllers/register');
const login = require('../controllers/login')


router.prefix(`/${baseApi}`)
router.post('/register', register)
        .post('/login', login.createToken)
//     .get('/', indexController.index) //首页
//     .get('/article/:id', articleController.index) //文章页面
//     .get('/signup', signupController.NotLogin) //注册
//     .post('/signup', signupController.Login) //上传注册信息
//     .get('/signin', signinController.NotSignin) //登录
//     .post('/signin', signinController.Signin) //上传登录信息
//     .get('/signout', signoutController.SignOut) //退出登录
//     .get('/post', postController.Post)
//     .get('/post/:postId', postController.PostId) //文章具体内容
//     .get('/create', createController.getCreate)//创建文章
//     .post('/create', createController.postCreate)
//     .post('/:postId', postController.comment) //  评论  (这个必须放在/create的路由后)
//     .get('/post/:postId/edit', postController.getEditor) //编辑文章内容
//     .post('/post/:postId/edit', postController.postEditor) //编辑文章内容上传
//     .get('/post/:postId/remove', postController.idRemove) //删除文章
//     .get('/post/:postId/comment/:commentId/remove', postController.commentRemove) //删除文章





// module.exports = function() {
//     return router;
// }
console.log("router");

module.exports = router