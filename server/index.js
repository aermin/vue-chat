const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const dbConfig  = require('./config').db;
const router = require('./routes/index');


const app = new Koa();

const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const  socketModel = require('./models/soket');

app.use(cors());




app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());



// io.on('connection', (socket) => {
// 	const socketId = socket.id
// 	socket.on('login', async (userId) => {
//         await socketModel.saveUserSocketId(userId, socketId) ;
// 	})

// 	socket.on('update', async (userId) => {
//         await socketModel.saveUserSocketId(userId, socketId)
// 	})

// 	socket.on('sendPrivateMsg', async(data) => {
// 		const {to_user} = data ;
//         const res  = await socketModel.getUserSocketId(to_user);
//         const socketid = res[0].socketid;
// 		io.to(socketid).emit('receivePrivateMessage', data)
// 	})

// 	socket.on('sendGroupMsg', async(data) => {
//         console.log(data);
// 		io.sockets.emit('receiveGroupMessage', data)
//     })
    
//     // socket.on('disconnect', () => {
//     //     router.handle(io, socket, { method: 'DELETE', path: '/auth', data: { } }, () => { });
//     // });
// })


// // socket handle
// io.on('connection', socket => {
//     // console.log('new connection');

//     socket.on('message', (data, cb) => {
//         router.handle(io, socket, data, cb);
//     });


// });

app.listen(3000);
console.log('服务器已启动,端口3000');