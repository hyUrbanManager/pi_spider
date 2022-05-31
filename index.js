const schedule = require('node-schedule')
const watcher = require('./wan_ip_watcher.js')

// 每小时观察一次ip
schedule.scheduleJob('0 * * * *', () => {
    watcher.watch()
})

// 开机的时候马上检查一次ip
watcher.watch()