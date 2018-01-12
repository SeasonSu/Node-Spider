const request = require('request')
const cheerio = require('cheerio')

const utils = {
    async promise(callback){
        return new Promise(function (resolve, reject) {
            callback && callback(resolve)
        })
    },
    async getWechatUrl(name,callback){
        let encode_name = encodeURIComponent(name)
        let url = `http://weixin.sogou.com/weixin?type=1&query=${encode_name}&ie=utf8&_sug_=y&_sug_type_=1`
        return await utils.promise(async function(resolve){
            await request(url, function (err, response, html) {
                if (err) return callback(err, null)
                if (html.indexOf('<title>302 Found</title>') != -1) return callback(null, '302')
                if (html.indexOf('您的访问过于频繁') != -1) return callback('-访问过于频繁')
                let $ = cheerio.load(html)
                let wechat_url = $($("#sogou_vr_11002301_box_0 a")[0]).attr('href') || ''
                let target = wechat_url.replace(/amp;/g, '')
                resolve(target)
            })
        })
    }
}



module.exports = utils
