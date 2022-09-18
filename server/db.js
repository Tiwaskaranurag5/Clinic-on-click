const mysql = require('mysql2')



const db = mysql.createPool({
    user: 'root',
    password: 'root',
    database: 'demo',
    connectionLimit: 2,
    host: 'localhost'
})

module.exports = db;