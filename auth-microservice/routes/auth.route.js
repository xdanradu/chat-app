const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const jwtGuard = require('./auth.guard');
const db = require('../controllers/database.controller');

const router = express.Router();
router.post('/login', db.getUser, login);
router.get('/me', jwtGuard, db.getUserByEmail, me);

function login(req, res) {
  if (req.user !== undefined ) {
    let token = authCtrl.generateToken(req.user);
    res.json({ user: req.user, token });
  } else {
    res.sendStatus(401);
  }
}

function me(req, res) {
  res.json(req.user)
}

module.exports = router;
