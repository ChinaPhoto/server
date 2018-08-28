const Koa = require('koa')
const app = new Koa()


const { connect } = require('./database/init.js')

;
(async() => {
    await connect()
})()

app.use(async(ctx) => {
    ctx.body = '<h1> 你是渣渣辉啊啊</h1>'
})

app.listen(3000, () => {
    console.log('监听端口3000 已被开启')
})