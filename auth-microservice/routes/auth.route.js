const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const jwtGuard = require('./auth.guard');

const router = express.Router();
router.post('/login', login);
router.get('/me', jwtGuard, me);

function login(req, res) {
  let user = req.body;
  // get user and role from db without password { json obj }
  // if valid generate token
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}

function me(req, res) {
  res.json(req.user)
}

module.exports = router;
