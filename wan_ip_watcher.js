const axios = require('axios');
const fs = require('fs');
const message = require('./message.js');

const wan_ip_url = 'http://httpbin.org/ip'

function compare_cache_wan_ip(ip) {
    file_name = './data/wan_ip.json'
    exist = fs.existsSync(file_name)
    if (exist) {
        var data = JSON.parse(fs.readFileSync(file_name))
        if (data.ip == ip) {
            return true
        } else {
            console.log(`ip change, from ${data.ip} to ${ip}`);
            data = {'ip': ip}
            fs.writeFileSync(file_name, JSON.stringify(data))
            return false
        }
    } else {
        var data = {'ip': ip}
        fs.writeFileSync(file_name, JSON.stringify(data))
        return false
    }
}

module.exports = {
    watch() {
        axios.get(wan_ip_url)
            .then(response => {
                wan_ip = response.data.origin;
                if (!compare_cache_wan_ip(wan_ip)) {
                    message.msg(`ip change to ${wan_ip}`)
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
}

if (require.main === module) {
    module.exports.watch()
}
