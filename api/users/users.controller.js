const express = require('express')

const router = express.Router()
const userService = require("./users.service");

router.post('/register', register)
router.post('/auth', authenticate)

function register(req, res, next) {
  userService
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

module.exports = router