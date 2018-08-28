 const mongoose = require('mongoose');

 const url = "mongodb://localhost/test";

 const db = mongoose.connection;

 const glob = require('glob');

 const { resolve } = require('path');


 exports.initSchemas = () => {
     glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
 }

 exports.connect = () => {

     // 连接数据库
     mongoose.connect(url);

     // 记录连接数据库的次数
     let maxConnectTimes = 0;

     return new Promise((resolve, reject) => {

         //  监听数据库事件 

         // 数据库断开的时候
         db.on('disconnected', () => {

             console.log('*****************  数据库断开链接  *******************');


             if (maxConnectTimes < 3) {
                 console.log(maxConnectTimes);
                 maxConnectTimes++;
                 mongoose.connect(url)

             } else {
                 reject()
                 throw new Error('数据库炸啦,快找人来修啊......')
             }
         });

         // 数据库出错的时候
         db.on('Error', (error) => {

             console.log('*****************  数据库报错啦  ********************');


             if (maxConnectTimes < 3) {
                 console.log(maxConnectTimes);
                 maxConnectTimes++;
                 mongoose.connect(url)

             } else {
                 reject(error);
                 throw new Error('数据库报错连不上啦, 快找人来修啊....')
             }

         })

         // 数据连接成功的时候
         db.on('open', () => {

             console.log('MongoDB connected successfully')
             resolve();

         })

     })
 }