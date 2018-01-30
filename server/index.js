const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const dbConfig  = require('./config').db;
const router = require('./routes/index');
const {query} = require('./utils/db');

const app = new Koa();

// const server = require('http').Server(app.callback());
// const io = require('socket.io')(server);
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
// io.on('connection', function(){ /* … */ });
server.listen(3000);

const  socketModel = require('./models/soket');

app.use(cors());




app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());


global.query = query

io.on('connection', (socket) => {
    const socketId = socket.id
    console.log('socketId',socketId)
	socket.on('login', async (userId) => {
        console.log('login',userId);
        await socketModel.saveUserSocketId(userId, socketId) ;
	})

	socket.on('update', async (userId) => {
        console.log('update',userId);
        await socketModel.saveUserSocketId(userId, socketId)
	})

	socket.on('sendPrivateMsg', async(data) => {
        console.log('sendPrivateMsg',data);
		const {to_user} = data ;
        const res  = await socketModel.getUserSocketId(to_user);
        const socketid = res[0].socketid;
		io.to(socketid).emit('receivePrivateMsg', data)
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