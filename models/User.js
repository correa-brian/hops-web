var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  firstName: {type: String, lowercase: true, trim: true, default: ''},
  lastName: {type: String, lowercase: true, trim: true, default: ''},
  username: {type: String, lowercase: true, trim: true, default: ''},
  email: {type: String, lowercase: true, trim: true, default: ''},
  password: {type: String, default: ''},
  timestamp: {type: String, default: Date.now},
})

module.exports = mongoose.model('UserSchema', UserSchema)
