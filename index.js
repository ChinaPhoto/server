const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')


let router = new Router()


app.use(bodyParser());
app.use(cors())


let user = require('./appApi/user.js');

router.use('/user', user.routes())

const { connect, initSchemas } = require('./database/init.js')

app.use(router.routes());
app.use(router.allowedMethods());


;
(async() => {

    await connect();
    initSchemas();

    //     const User = mongoose.model('User');
    //     let oneUser = new User({ userName: '你是猪八戒', password: '123456' })

    //     oneUser.save().then(() => {
    //         console.log('插入成功')
    //     })

    //     let users = await User.findOne({}).exec();

    //     console.log('------------------')

    //     console.log(users)

    //     console.log('------------------')
})()

app.use(async(ctx) => {
    ctx.body = '<h1> 你是渣渣辉啊啊</h1>'
})

app.listen(3000, () => {
    console.log('监听端口3000 已被开启')
})