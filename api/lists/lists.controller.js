const express = require('express')

const router = express.Router()
const listService = require("./lists.service");

router.post('/', create)

function create(req, res, next) {

}

module.exports = router
