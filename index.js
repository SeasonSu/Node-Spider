const utils = require('./utils')
const args = process.argv.splice(2)

async function get(){
    let url = await utils.getWechatUrl('南方都市报')
    console.log(url)
}

get()
