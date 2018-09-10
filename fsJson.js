const fs = require('fs');


fs.readFile('./data_json/goods.json', 'utf-8', (err, data) => {
    let newData = JSON.parse(data);
    let pushData = [];
    let i = 0;
    if (err) { console.log('数据读取错误') };
    newData.RECORDS.map((value, index) => {

        if (value.IMAGE1) {
            i++;
            console.log(value.NAME)
            pushData.push(value)
        }
    })
    console.log(i);
    // console.log(pushData)
    fs.writeFile('./data_json/newGood.json', JSON.stringify(pushData), (err) => {
        if (err) console.log('数据写入失败')
    })
})