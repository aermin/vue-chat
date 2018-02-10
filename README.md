# airchat

### 介绍

这是我的毕设项目，目前大功能基本跑通，现在开源出来，接下去将继续不断完善😄

技术栈：

前端vue，vue-router,vuex ，vue-cli和axios，做了移动端适配，没有用第三方组件。
后端用koa2，用gulp构建工具实现自动刷新后端代码运行。
数据库用mysql，基于Token的jwt鉴权机制，用socket.io做双向通信；

### 完成功能

- [x] 登录
- [x] 注册
- [x] 登出
- [x] 弹窗，提示等组件
- [x] 机器人智能聊天回复
- [x] 私聊
- [x] 群聊

-----------------2018.02.01

### todo功能

- [x] 用户资料卡
- [x] 加好友及验证好友请求
- [x] 好友请求通知
- [x] 删除好友
- [x] 未读消息提示
-----------------2018.02.10
- [ ] 搜索用户，群组
- [ ] 展示群成员
- [ ] 聊天发表情
- [ ] 聊天发图片
- [ ] 支持聊天代码美化，md语法
- [ ] 用户上传头像
- [ ] 性能优化，redis做缓存
- [ ] 发布到线上

### 使用步骤

Fork 或者 下载本项目

然后进入本项目的文件夹，把airchat/server/init/sql 的 airchat.sql文件 拉到你的msyql客户端(我使用的是mac下的 `Sequel Pro` 挺好用的)

npm i

npm run dev

cd server 

npm i

接着下面两条命令执行一条就行，看着选；（如果想要修改后端代码即时保存刷新，用第一条；如果像想用chrome进行debug调试，用第二条)

npm run start  

npm run dev


> 老习惯，代码注释比较详细，需要注释而没有注释的我也尽快补上;
后面也会写几篇博客来详细介绍本项目，希望更好的帮助到入门的小伙伴(大神请略过，或者给些指导建议😄)

##### 如果对您有帮助，希望给个start，鼓励我继续更新^ ^

### 材料

[socket.io英文文档](https://socket.io/docs/server-api/)

[socket.io中文文档](https://zhuanlan.zhihu.com/p/29148869)

[socket.io  in github](https://github.com/socketio/socket.io/)

[socket.io-client in github](https://github.com/socketio/socket.io-client)

[聊天机器人api](http://www.tuling123.com/)

> 项目展示  多图预警

![image.png](http://upload-images.jianshu.io/upload_images/5287253-c0062cc1cfb36b73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/5287253-dbb59dee60ff2c85.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/5287253-663df9dfcc2b5317.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/5287253-6f778fab94a4c865.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/5287253-bddb19a92169bbb8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](http://upload-images.jianshu.io/upload_images/5287253-8d794128da179161.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/5287253-714608cb351dd624.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
