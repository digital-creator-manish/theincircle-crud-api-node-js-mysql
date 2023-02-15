var mysql = require('mysql');

// Set up MySQL connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node_mysql_api'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;