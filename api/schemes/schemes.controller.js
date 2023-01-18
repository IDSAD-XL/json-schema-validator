const express = require('express')

const router = express.Router()
const schemeService = require("./schemes.service");

router.post('/', create)

function create(req, res, next) {

}

module.exports = router
