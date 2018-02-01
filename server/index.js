const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const dbConfig  = require('./config').db;
const router = require('./routes/index');
const {query} = require('./utils/db');
const  socketModel = require('./models/soketHander');
const app = new Koa();

// const server = require('http').Server(app.callback());
// const io = require('socket.io')(server);
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
// io.on('connection', function(){ /* … */ });
server.listen(3000);

app.use(cors());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

global.query = query

io.on('connection', (socket) => {
    const socketId = socket.id

	socket.on('login', async (userId) => {
        console.log('userId',userId)
        await socketModel.saveUserSocketId(userId, socketId) ;
        console.log('login',userId);
	})

	socket.on('update', async (userId) => {
        console.log('update',userId);
        await socketModel.saveUserSocketId(userId, socketId)
	})

	socket.on('sendPrivateMsg', async(data) => {
        console.log('sendPrivateMsg',data);
        const arr  = await socketModel.getUserSocketId(data.to_user);
        const RowDataPacket = arr[0];
        const socketid =JSON.parse(JSON.stringify(RowDataPacket)).socketid;
        io.to(socketid).emit('getPrivateMsg', data);
	})

	socket.on('sendGroupMsg', async(data) => {
        console.log('sendGroupMsg',data);
		io.sockets.emit('receiveGroupMsg', data)
    })
    
    socket.on('disconnect', (data) => {
        // router.handle(io, socket, { method: 'DELETE', path: '/auth', data: { } }, () => { });
        console.log('disconnect',data);
    });
})

// app.listen(3000);
console.log('服务器已启动,端口3000');