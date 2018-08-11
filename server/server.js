const express = require('express');
const bodyParser = require('body-parser');//引入两个中间件
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

const model = require('./model');//引入model
// const User = model.getModel('user');//要查询的字段 用户信息
const Chat = model.getModel('chat');//要查询的字段 聊天记录

const app = express();

const server = require('http').Server(app);//配合socket
const io = require('socket.io')(server);

io.on('connection',function (socket) {//此处的socket 是当前的请求
    // console.log('user login')
    //接受客户端发送信息
    socket.on('sendMsg',function (data) {
        // console.log(data)
         /*io.emit('recvMsg',msg)*/
        const {from,to,msg} = data;
        //chatId 将2个用户的id合并为一个 每一个聊天有对应的id 方便查找
        const chatId = [from,to].sort().join('_');
        //创建
        Chat.create({chatId,from,to,content:msg},function (err,doc) {
            io.emit('recvMsg',Object.assign({},doc._doc))
        })
    })
})



app.use(bodyParser.json())//可以接受post参数
app.use(cookieParser())
app.use('/user',userRouter)

/*const mongoose = require('mongoose');
//连接mongo   此处imooc 是集合，如果没有mongo会自行创建
const DB_URL = 'mongodb://127.0.0.1:27017/imooc';
//建立一个连接数据库
mongoose.connect(DB_URL);
//此处可以忽略，不是必须的，只是提示已经连接成功
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
});*/

//类似于mysql的表 mongo里有文档、字段的概念

//接下来新建一个user表  文档名字叫user相当于Key  Schema定义文档模型
/*
 mongoose文档类型
 1、String,Number等数据结构
 2、定create,remove,update分别用来增、删、改的操作
 3、Find和findOne用来查询数据

 启动：mongod --config/usr/local/etc/mongod.conf后台启动
 */

/*const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true}
}))

//新增------
/!*User.create({
    user: '哈哈哈',
    age: 22
}, function (err, doc) {//两个参数，第一个时错误信息，第二个是数据
    if (!err) {
        console.log(doc)
    } else {
        console.log(err)
    }
})*!/
//删除---------第一个参数传值格式 是对象格式
/!*User.remove({age:18},function (err,doc) {
    console.log(doc)
})*!/

//更新---------第一个参数传值格式 是对象格式
/!*User.update({age:33},{'$set':{age: 11}},function (err,doc) {
    console.log(doc)

})*!/


app.get('/', function (req, res) {
    res.send('<h1>hello word </h1>')
});

app.get('/data', function (req, res) {
    //  {} ->指查询所有的 find返回时数组 findOne返回时对象
    User.find({}, function (err, doc) {
        res.json(doc)
    })
    /!*res.json({
     name: 'imooc',
     sex: 2,
     type: 4
     })*!/
})*/



server.listen(9093, function () {
    console.log('Node app start at port 9093')
});
