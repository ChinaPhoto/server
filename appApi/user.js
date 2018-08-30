const Router = require('koa-router');

let router = new Router();

router.get('/', async(ctx) => {
    ctx.body = "<h2>我是首页</h2>"
})

router.get('/login', async(ctx) => {
    ctx.body = "<h2>我是注册页面</h2>"
})

module.exports = router;