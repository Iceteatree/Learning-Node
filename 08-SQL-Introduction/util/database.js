const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'node_complete',
    password: 'alan123',
});

module.exports = pool.promise();