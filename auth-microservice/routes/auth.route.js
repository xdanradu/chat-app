const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const jwtGuard = require('./auth.guard');

const router = express.Router();
router.post('/login', login);
router.get('/me', jwtGuard, me);

function login(req, res) {
  let user = req.body;
  // Check user and get role from DB
  // Only if username and password are valid generate the token
  // User: { id: 123, email: 'name@test.com', role: 'ADMIN', other data }
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}

function me(req, res) {
  res.json(req.user)
}

module.exports = router;
