const mysql = require('mysql2/promise');
const config = require('../config/config');

function initDb() {
    mysql.createConnection({
        host: config.db.host,
        port: "3306",
        user:     "root",
        password : "root",
    }).then( connection => {
        connection.query(`CREATE DATABASE IF NOT EXISTS ${config.db.name};`).then((res) => {
            console.info("Database created or successfully checked");
            // process.exit(0);
        }, (err) => {
            console.log(err);
        })
    });
}

module.exports = {
    initDb
}

