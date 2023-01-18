require('dotenv').config();
const fs = require('fs')
require('rootpath')()
const cors = require("cors");

const path = require('path')
const express = require('express')

const jwt = require('./_helpers/jwt')
const errorHandler = require('./_helpers/errorHandler')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());

app.use(jwt())

app.use('/api/user', require('./users/users.controller'))
app.use('/api/schema', require('./schemes/schemes.controller'))

app.use(errorHandler)

const http = require("http");
server = http.createServer(app);

const port = process.env.PORT
server.listen(port, () => {
  console.log('Server running on port ' + port);
});
