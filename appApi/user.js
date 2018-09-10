const Router = require('koa-router');

let router = new Router();

const mongoose = require('mongoose');



router.get('/', async(ctx) => {
    ctx.body = "<h2>我是首页</h2>"
})

router.post('/reg', async(ctx) => {

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

router.post('/login', async(ctx) => {

    let loginUser = ctx.request.body;
    console.log(loginUser);
    let userName = loginUser.userName;
    let password = loginUser.password;

    // 引入User的model
    const User = mongoose.model('User');

    await User.findOne({ userName: userName }).exec().then(async(res) => {
        console.log(res);
        if (res) {
            let newUser = new User()
            await newUser.comparePassword(password, res.password)
                .then((isMatch) => {
                    if (isMatch) {
                        ctx.body = { code: 200, status: isMatch, message: '登陆成功' }
                    } else {
                        ctx.body = { code: 200, status: isMatch, message: '密码错误,请重新输入' }
                    }
                }).catch((err) => {
                    console.log(err);
                    ctx.body = { code: 500, status: false, message: err }
                })
        } else {
            ctx.body = {
                code: 200,
                status: false,
                message: "用户名不存在"
            }
        }
    }).catch((err) => {
        console.log(err);
        ctx.body = { code: 500, message: err }
    })

})

module.exports = router;