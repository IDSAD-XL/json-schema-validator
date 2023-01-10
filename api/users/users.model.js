const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  savedSchemes: {
    type: Array,
    required: false,
    default: [],
  }
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  }
})

module.exports = mongoose.model('User', schema, 'users')