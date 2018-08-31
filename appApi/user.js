const Router = require('koa-router');

let router = new Router();

const mongoose = require('mongoose');



router.get('/', async(ctx) => {
    ctx.body = "<h2>我是首页</h2>"
})

router.post('/login', async(ctx) => {

    const User = mongoose.model('User');

    let newUser = new User(ctx.request.body)

    console.log(newUser);

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch((error) => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

module.exports = router;