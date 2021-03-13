const config = require('./config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
// await sequelize.authenticate();

module.exports = {
    sequelize
}


