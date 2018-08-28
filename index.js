const Koa = require('koa')
const app = new Koa()

const mongoose = require('mongoose')

const { connect, initSchemas } = require('./database/init.js')

;
(async() => {

    await connect();
    initSchemas();

    const User = mongoose.model('User');
    let oneUser = new User({ userName: '我是渣渣辉', password: '123456' })

    oneUser.save().then(() => {
        console.log('插入成功 啊')
    })

    let users = await User.findOne({}).exec();

    console.log('------------------')

    console.log(users)

    console.log('------------------')
})()

app.use(async(ctx) => {
    ctx.body = '<h1> 你是渣渣辉啊啊</h1>'
})

app.listen(3000, () => {
    console.log('监听端口3000 已被开启')
})