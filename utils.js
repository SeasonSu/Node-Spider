const request = require('request')
const cheerio = require('cheerio')

var getUrl =  async function(name,callback) {
    let encode_name = encodeURIComponent(name)
    let url = `http://weixin.sogou.com/weixin?type=1&query=${name}&ie=utf8&_sug_=y&_sug_type_=1`
    return await request(url, function (err, response, html) {
        if (err) return callback(err, null);
        if (html.indexOf('<title>302 Found</title>') != -1) return callback(null, '302');
        if (html.indexOf('您的访问过于频繁') != -1) return callback('-访问过于频繁')
        var $ = cheerio.load(html);
        //公众号页面的临时url
        var wechat_url = $($("#sogou_vr_11002301_box_0 a")[0]).attr('href') || '';
        var tg = wechat_url.replace(/amp;/g, '')
        console.log(tg)
        return tg
    })
}

const utils = {
    async promise(callback){
        return new Promise(function (resolve, reject) {
            callback && callback(resolve)
        })
    },
    async getWechatUrl(name,callback){
        let encode_name = encodeURIComponent(name)

        let url = `http://weixin.sogou.com/weixin?type=1&query=${name}&ie=utf8&_sug_=y&_sug_type_=1`
        console.log(url)
        return await request(url, function (err, response, html) {
            if (err) return callback(err, null);
            if (html.indexOf('<title>302 Found</title>') != -1) return callback(null, '302');
            if (html.indexOf('您的访问过于频繁') != -1) return callback('-访问过于频繁')
            var $ = cheerio.load(html);
            //公众号页面的临时url
            var wechat_url = $($("#sogou_vr_11002301_box_0 a")[0]).attr('href') || '';
            var tg = wechat_url.replace(/amp;/g, '')
            setTimeout(function () {
              console.log(tg)
            }, 1000 + Math.ceil(Math.random() * 500));
            return tg
        })
    }
}

async function get(){
//    let aa = await getUrl('南方都市报')
    //console.log(aa)
    await utils.getWechatUrl('南方都市报')
}

get()


module.exports = utils
