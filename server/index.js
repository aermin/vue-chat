const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const cors = require('koa-cors');
const dbConfig  = require('./config').db;
const router = require('./routes/index');

const app = new Koa();

// session存储配置
const sessionMysqlConfig= {
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
}

app.use(cors());

// 配置session中间件
// app.use(session({
//     key: 'USER_SID',
//     store: new MysqlStore(sessionMysqlConfig)
// }))


app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log('服务器已启动');