const mongoose = require('mongoose');
//连接mongo   此处imooc 是集合，如果没有mongo会自行创建
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat';
//建立一个连接数据库
mongoose.connect(DB_URL);

//此处可以忽略，不是必须的，只是提示已经连接成功
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
});


const models = {
    user: {
        'user': {'type': String, require: true},
        'pwd': {'type': String, require: true},
        'type': {'type': Number, require: true},
        'title': {'type': String},//想找的工作职位
        'avatar': {'type': String},//-----通过头像看是否完善信息
        'desc': {'type': String},//个人简介或者职位简介
        //如果是boss 还有下边2个字段
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: {
        // 'user':
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}



