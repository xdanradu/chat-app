const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateToken(user) {
  const payload = JSON.stringify(user);
  console.log(payload);
  return jwt.sign(payload, config.jwtSecret);
}

module.exports = {
  generateToken
}
