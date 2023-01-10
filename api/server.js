const fs = require('fs')
require('rootpath')()

const path = require('path')
const express = require('express')

const jwt = require('api/_helpers/jwt')
const errorHandler = require('api/_helpers/errorHandler')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


