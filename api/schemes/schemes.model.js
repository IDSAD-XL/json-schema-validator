const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  json: {
    type: String,
    unique: false,
    required: false
  },
  lastChanged: {
    type: Number,
    unique: false,
    required: true,
  },
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
})

module.exports = mongoose.model('Scheme', schema, 'schemes')