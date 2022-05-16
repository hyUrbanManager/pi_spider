const express = require('express')
const app = express()
const schedule = require('node-schedule')

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
