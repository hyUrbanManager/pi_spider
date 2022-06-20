const axios = require('axios');
const fs = require('fs');
const message = require('./message.js');
const shell = require('shelljs');

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

function commit_git_wan_ip_if_need(ip) {
    file_name = './pi_wan_ip/wan_ip.json'
    exist = fs.existsSync(file_name)
    if (exist) {
        var data = JSON.parse(fs.readFileSync(file_name))
        if (data.ip == ip) {
        } else {
            console.log(`ip change, from ${data.ip} to ${ip}`);
            data = {'ip': ip}
            fs.writeFileSync(file_name, JSON.stringify(data))
            shell.cd('./pi_wan_ip')
            shell.exec('git pull && git commit -am "[config]update wan ip" && git push origin main')
            shell.cd('..')
        }
    } else {
        var data = {'ip': ip}
        fs.writeFileSync(file_name, JSON.stringify(data))
        shell.cd('./pi_wan_ip')
        shell.exec('git pull && git commit -am "[config]update wan ip" && git push origin main')
        shell.cd('..')
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
                commit_git_wan_ip_if_need(wan_ip)
            })
            .catch(error => {
                console.log(error);
            });
    },
}

if (require.main === module) {
    module.exports.watch()
}
