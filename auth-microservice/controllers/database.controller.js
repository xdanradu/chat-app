const mysql = require('mysql');
const config = require('../config/config');

const pool = mysql.createPool({
    host: config.host,
    user: "root",
    password: "root",
    database: "auth"
});

function getUser(req, res, next) {
    let sql = `SELECT id, name, email FROM users WHERE email='${req.body.username}' AND password='${req.body.password}'`;
    pool.getConnection(function(err, con) {
        if (err) {
            req.error = err;
            next();
        };
        con.query(sql, function (err, result) {
            if (err) res.json({ error: err });
            if (result.length === 1) req.user = result[0];
            con.release();
            next();
        });
    });
}

function getUserByEmail(req, res, next) {
    let sql = `SELECT id, name, email FROM users WHERE email='${req.user.username}'`;
    pool.getConnection(function(err, con) {
        if (err) {
            req.error = err;
            next();
        };
        con.query(sql, function (err, result) {
            if (err) res.json({ error: err });
            if (result.length === 1) req.user = result[0];
            con.release();
            next();
        });
    });
}

module.exports = {
    getUser,
    getUserByEmail
}
