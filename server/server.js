/**
 * Created by Administrator on 2018/7/3.
 * @author yangkun
 */
const express = require('express');
const app = express();

app.get('/',function (req,res) {
    res.send('<h1>hello word </h1>')
});

app.get('/data',function (req,res) {
    res.json({
        name:'imooc',
        sex: 2,
        type:3
    })
})
app.listen(9000,function () {
    console.log('Node app')
});
