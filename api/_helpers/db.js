const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(
  process.env.MONGODB_URL,
  err => {
    if (err) throw err
    console.log('Connected to MongoDB')
  }
)
mongoose.Promise = global.Promise

module.exports = {
  User: require("../users/users.model")
}