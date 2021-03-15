const { sequelize } = require('../config/db-sequelize');
const { User }  = require('../models/user');

// the defined model is the class itself
// console.log(User === sequelize.models.User); // true

async function createTestData() {
    const admin = User.build({ firstName: "Dan", lastName: "Radu", email: 'admin@admin.com', password: 'admin' });
    await admin.save();
    console.log('Admin user was saved to the database.');
}

async function synchronize() {
    // Synchronizing all models at once
    await sequelize.sync({ force: true });
    console.log("All DB models were synchronized successfully.")
}

async function migrateDb() {
    await synchronize();
    await createTestData();
}

/*
run().then(r => {
    console.log('DB Migration finished.');
    // process.exit(0);
});
*/

module.exports = {
    migrateDb
}

