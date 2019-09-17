const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = require("./routes/index");
const { query } = require("./utils/db");
const socketModel = require("./models/soketHander");
const app = new Koa();

app.use(cors());

const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

global.query = query;

io.on("connection", socket => {
  const socketId = socket.id;
  //登录
  socket.on("login", async userId => {
    await socketModel.saveUserSocketId(userId, socketId);
  });
  // 更新soketId
  socket.on("update", async userId => {
    await socketModel.saveUserSocketId(userId, socketId);
  });
  //私聊
  socket.on("sendPrivateMsg", async data => {
    const arr = await socketModel.getUserSocketId(data.to_user);
    const RowDataPacket = arr[0];
    const socketid = JSON.parse(JSON.stringify(RowDataPacket)).socketid;
    io.to(socketid).emit("getPrivateMsg", data);
  });
  // 群聊
  socket.on("sendGroupMsg", async data => {
    io.sockets.emit("getGroupMsg", data);
  });

  //加好友请求
  socket.on("sendRequest", async data => {
    console.log("sendRequest", data);
    const arr = await socketModel.getUserSocketId(data.to_user);
    const RowDataPacket = arr[0];
    const socketid = JSON.parse(JSON.stringify(RowDataPacket)).socketid;
    console.log("给谁的socketid", socketid);
    io.to(socketid).emit("getresponse", data);
  });

  socket.on("disconnect", data => {
    console.log("disconnect", data);
  });
});

server.listen(3000);
console.log("服务器已启动,端口3000");
