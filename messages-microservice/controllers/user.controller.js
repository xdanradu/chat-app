const { User }  = require('../models/user');

async function getUser(req, res, next) {
    try {
        await User.findAll({
            attributes: [
                'id', 'firstName', 'lastName', 'email'],
            where: {
                email: req.body.username,
                password: req.body.password
            }
        }).then(result => {
            if (result.length === 1) req.user = result[0];
            next();
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        req.error = 'DENY';
        next();
    }
}

async function getUserByEmail(req, res, next) {
    try {
        await User.findAll({
            attributes: [
                'id', 'firstName', 'lastName', 'email'],
            where: {
                email: req.user.username
            }
        }).then(result => {
            if (result.length === 1) req.user = result[0];
            next();
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        req.user = {};
        req.error = '500';
        next();
    }
}

module.exports = {
    getUser,
    getUserByEmail
}
