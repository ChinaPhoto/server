const Koa = require('koa')
let app = new Koa()
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')


router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./data_json/newGood.json', 'utf8', (err, data) => {

        if (err) {
            console.log(err)
        } else {
            data = JSON.parse(data);
            let i = 0;
            const Goods = mongoose.model('Goods')

            data.map((val, index) => {

                let newGoods = new Goods(val);

                newGoods.save().then(() => {
                    i++;
                    console.log('成功' + i);
                }).catch((err) => {
                    console.log(err)
                })

            })
        }

    })
    ctx.body = '开始导入数据'
})

router.get('/insertAllCategoryInfo', async(ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(data);
            let i = 0;
            const Category = mongoose.model('Category');
            data.RECORDS.map((val, index) => {
                let newCategory = new Category(val);

                newCategory.save().then(() => {
                    i++;
                    console.log('成功' + i);
                }).catch((err) => {
                    console.log(err)
                })
            })

        }
    })
    ctx.body = '数据开始导入'
})


router.get('/insertAllCategorySubInfo', async(ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            data = JSON.parse(data);
            let i = 0;
            const CategorySub = mongoose.model('CategorySub');
            data.RECORDS.map((val, index) => {
                let newCategorySub = new CategorySub(val);
                newCategorySub.save().then(() => {
                    i++
                    console.log('成功' + i)
                }).catch((err) => {
                    console.log(err)
                })
            })
        }
    })
    ctx.body = '数据开始导入'
})

// 商品详情接口
router.post('/getDetailGoodsInfo', async(ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId // 接受到的参数id
        const Goods = mongoose.model('Goods');
        let result = await Goods.findOne({ ID: goodsId }).exec()
        if (result) {
            ctx.body = { code: 200, status: true, data: result }
        } else {
            ctx.body = { code: 200, status: false, data: {}, message: '没有此产品' }
        }
    } catch (err) {
        console.log(err);
        ctx.body = { code: 500, message: err }
    }
})


// 商品大类接口
router.get('/getCategoryList', async(ctx) => {
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec()
        ctx.body = { code: 200, status: true, data: result }
    } catch (err) {
        console.log(err)
        ctx.body = { code: 500, message: err }
    }
})


// 商品小类接口
router.post('/getCategorySubList', async(ctx) => {
    try {
        let categoryId = ctx.request.body.categoryId
            // let categoryId = 1; // 后期替换为别的类型
        const Category = mongoose.model('CategorySub')
        let result = await Category.find({ MALL_CATEGORY_ID: categoryId }).exec()
        if (result) {
            ctx.body = { code: 200, status: true, data: result }
        } else {
            ctx.body = { code: 200, status: false, data: [], message: '没有数据信息' }
        }
    } catch (err) {
        console.log(err);
        ctx.body = { code: 500, message: err }
    }


})


// 商品列表接口

router.get('/getGoodsListByCategorySubID', async(ctx) => {
    try {
        let categorySubId = '2c9f6c946016ea9b016016f79c8e0000';
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({ SUB_ID: categorySubId }).exec()
        if (result) {
            ctx.body = { code: 200, status: true, data: result }
        } else {
            ctx.body = { code: 200, status: false, data: [], message: '没有数据信息' }
        }
    } catch (err) {
        console.log(err)
        ctx.body = { code: 500, message: err }
    }
})


module.exports = router;