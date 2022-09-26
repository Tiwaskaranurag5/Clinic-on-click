const mysql = require('mysql2')



const db = mysql.createPool({
    user: 'root',
    password: 'manager',
    database: 'project',
    connectionLimit: 2,
    host: 'localhost'
})

module.exports = db;