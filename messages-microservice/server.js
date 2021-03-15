'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwtGuard = require('./routes/auth.guard');
const config = require('./config/config');
const authRoutes = require('./routes/auth.route');

const {initDb} = require('./scripts/init-db');
const {migrateDb} = require('./scripts/migrate-db');

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.get('/', (req, res) => {
  res.send('REST API v1 '+ config.env);
});

app.get('/secured', jwtGuard, (req, res) => {
  res.json(['secured 1', 'secured 2']);
});

app.use('/auth', authRoutes);

app.listen(config.port, config.host);
console.log(`Running Auth Microservice on http://localhost:${config.port}`);

initDb();
migrateDb().then(r => {
  console.log('DB Migration finished.');
  // process.exit(0);
});
