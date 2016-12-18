var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  firstName: {type: String, lowercase: true, trim: true, default: ''},
  lastName: {type: String, lowercase: true, trim: true, default: ''},
  username: {type: String, lowercase: true, trim: true, default: ''},
  email: {type: String, lowercase: true, trim: true, default: ''},
  password: {type: String, default: ''},
  image: {type: String, trim: true, default: ''},
  timestamp: {type: String, default: Date.now},
})

UserSchema.methods.summary = function(){
	var summary = {
		firstName: this.firstName,
		lastName: this.lastName,
		username: this.username,
		email: this.email,
		timestamp: this.timestamp,
		image: this.image,
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('UserSchema', UserSchema)
