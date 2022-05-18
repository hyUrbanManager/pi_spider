const schedule = require('node-schedule')
const watcher = require('./wan_ip_watcher.js')

// 每小时观察一次ip
schedule.scheduleJob('0 * * * *', () => {
    console.log('start check ip. ' + new Date().toLocaleString())
    watcher.watch()
})
