const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');//引入model
const User = model.getModel('user');//要查询的字段 用户信息
const Chat = model.getModel('chat');//要查询的字段 聊天记录
const _filter = {'pwd':0,'__v':0};
// Chat.remove({},function (e,d) {})
//获取所有数据
Router.get('/list',(req,res)=> {
    const {type} = req.query;
    console.log(type)
    // User.remove({},function (e,d) {})  // 清空所有数据
    User.find({type},_filter,function (err,doc) {
        return res.json({code:0,data:doc})
    })
})

Router.get('/info',(req,res)=> {
    //校验用户有没有cookie
    const {userId} = req.cookies;//req.cookies 获取cookie
    if(!userId) return res.json({code:1})
    User.findOne({_id:userId},_filter,function (err,doc) {
        if(err) return res.json({code:1,msg:'验证信息有误'})
        if(doc) return res.json({code:0,data:doc})
    })

})

//注册接口
Router.post('/register',(req,res)=> {
    console.log(req.body)
    const {user,pwd,type} = req.body;
    User.findOne({user:user},function (err,doc) {
        if(doc) {//如果有数据，说明已存在 就报错
            return res.json({code:1,msg:'用户名重复了，老铁'})
        }
        //此处需要拿到注册用户的id 但只有注册后才可以拿到，在此做一层处理
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function (e,d) {
            if(e) {
                return res.json({code:1,msg:'后端出错'})
            }
            const {user,type,_id} = d;
            res.cookie('userId',_id)
            return res.json({code:0,data:{user,type,_id}})
        })

        /*//没有就注册新的账号
        User.create({user,type,pwd:md5Pwd(pwd)},function (e,d) {
            if(e) {
                return res.json({code:1,msg:'用户名重复或者其他原因啊'})
            }
            return res.json({code:0,msg:'创建成功'})
        })*/
    })
})

//登录接口
Router.post('/login',(req,res)=> {
    const {user,pwd} = req.body;
    //findOne 第一个参数是查询的条件，第二个是不希望返的值 0就可以不返
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function (err,doc) {
        if(!doc) {
            return res.json({code:1,msg:'用户名或者密码有误'})
        }
        res.cookie('userId',doc._id)
        return res.json({code:0,data:doc})
    })
    //校验用户有没有cookie
    // return res.json({code:1})
})
//提交完善信息接口
Router.post('/update',(req,res)=> {
    const userId = req.cookies.userId;
    if(!userId) {
        return res.json({code:1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userId,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})
//获取聊天列表信息
Router.get('/getMsgList',(req,res)=> {
    const userId = req.cookies.userId;
    /*if(!userId) {
        return res.json({code:1})
    }*/
    User.find({},function (e,userDoc) {
        let users = {};
        userDoc.forEach(v=> {
            //拿到用户的所有名称和头像
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
        //查询到聊天的id
        Chat.find({'$or':[{from:userId},{to:userId}]},function(err,doc){
            if(!err) {
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })

    /*{'$or':[{from:user,to:user}]}*/

})

//获取读取信息
Router.post('/readmsg',(req,res)=>{
    const userId = req.cookies.userId;
    const {from} = req.body;
    /*此处更新 已读状态    {read:true} 严谨写法 {'$set':{read:true}}  multi 更新多个*/
    Chat.update(
        {from,to:userId},
        {'$set':{read:true}},
        {'multi':true},
        (err,doc)=>{
            //doc 返回值 是n代表几条数据 nModified 代表更新 几条数据
        console.log(doc)
        if(!err) {
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改已读数量失败'})
    })
})


//加密 加盐
function md5Pwd(pwd) {
    const salt = 'jiamd5^@!$^*qwerz~';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router;