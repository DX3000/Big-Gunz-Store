const mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'biggunzstore',
});

module.exports = connection;