const axios = require('axios');

// 发送微信喵酱通知消息
const apikey = 'SCT148567TRPdvRERqkYligdCzvgIOJ5at'
const url = `https://sctapi.ftqq.com/${apikey}.send`

module.exports = {
    msg(title, body) {
        axios.get(`${url}/?title=${title}&desp=${body}`)
            .then(response => {
                console.log(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
}

if (require.main === module) {
    module.exports.msg('test title', 'test body')
}
