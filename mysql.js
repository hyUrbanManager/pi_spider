const mysql = require('mysql')


module.exports = {
    connectMysql() {
        var connection = mysql.createConnection({
            // host: 'localhost',
            host: 'hy-pi.com',
            port: '3306',
            user: 'huangye',
            password: '123456',
            database: 'pi_spider_db'
        });
        connection.connect()
        return connection
    },

    business1(connection) {
        sql = `show databases;`
        connection.query(sql, (error, results, fields) => {
            if (error) {
                console.error(`error: ${error}. sql: ${sql}`)
            } else {
                console.log(`results: ${results}`);
            }
        })
    }
}

if (require.main === module) {
    // 测试连通性
    conn = module.exports.connectMysql()
    module.exports.business1(conn)
    conn.end()
    console.log('end');
}
