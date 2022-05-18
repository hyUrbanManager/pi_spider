const express = require('express')
const schedule = require('node-schedule')
const watcher = require('./wan_ip_watcher.js')
const app = express()

app.use(express.static('./'))

app.get('/', (req, res) => {
})

app.listen(8081, () => {
    console.log('listening...')
})

//每5分钟执行一次
schedule.scheduleJob('*/5 * * * *', () => {
    console.log('start check:' + new Date().toLocaleString())
})

// 每小时观察一次ip
schedule.scheduleJob('0 * * * *', () => {
    console.log('start check ip. ' + new Date().toLocaleString())
    watcher.watch()
})
