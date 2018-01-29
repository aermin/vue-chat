const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const session = require('koa-session-minimal');
// const MysqlStore = require('koa-mysql-session');
const cors = require('koa-cors');
const dbConfig  = require('./config').db;
const router = require('./routes/index');


const app = new Koa();

const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const  socketModel = require('./models/soket');

io.set('heartbeat interval', 60000);
io.set('heartbeat timeout', 5000);
// // session存储配置
// const sessionMysqlConfig= {
//     user: dbConfig.user,
//     password: dbConfig.password,
//     database: dbConfig.database,
//     host: dbConfig.host,
// }

app.use(cors());




app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());



io.on('connection', (socket) => {
	const socketId = socket.id
	socket.on('login', async (userId) => {
        await socketModel.saveUserSocketId(userId, socketId) ;
	})

	socket.on('update', async (userId) => {
        await socketModel.saveUserSocketId(userId, socketId)
	})

	socket.on('sendPrivateMessage', async(data) => {
		const {to_user} = data ;
        const res  = await socketModel.getUserSocketId(to_user);
        const socketid = res[0].socketid;
		io.to(socketid).emit('receivePrivateMessage', data)
	})

	socket.on('sendGroupMessage', async(data) => {
		io.sockets.emit('receiveGroupMessage', data)
    })
    
    // socket.on('disconnect', () => {
    //     router.handle(io, socket, { method: 'DELETE', path: '/auth', data: { } }, () => { });
    // });
})


// socket handle
io.on('connection', socket => {
    // console.log('new connection');

    socket.on('message', (data, cb) => {
        router.handle(io, socket, data, cb);
    });


});

app.listen(3000);
console.log('服务器已启动');