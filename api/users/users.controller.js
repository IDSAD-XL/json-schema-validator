const express = require('express')

const router = express.Router()
const userService = require("./users.service");

router.post('/register', register)
router.post('/login', authenticate)
router.post('/schemes', postSchemes)
router.get('/schemes', getSchemes)

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

function postSchemes(req, res, next) {
  userService
    .saveSchemes(req.auth.sub, req.body)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

function getSchemes(req, res, next) {
  userService
    .getSchemes(req.auth.sub)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

module.exports = router