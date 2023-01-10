require('dotenv').config();
const fs = require('fs')
require('rootpath')()

const path = require('path')
const express = require('express')

const jwt = require('./_helpers/jwt')
const errorHandler = require('./_helpers/errorHandler')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(jwt())

app.use('/api/users', require('./users/users.controller'))

app.use(errorHandler)

const http = require("http");
server = http.createServer(app);

const port = process.env.PORT
server.listen(port, () => {
  console.log('Server running on port ' + port);
});
