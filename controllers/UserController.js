var User = require('../models/User')
var bcrypt = require('bcrypt')

module.exports = {
  get: function(params, isRaw, callback){
		if (params.id != null){
			User.findById(params.id, function(err, user){
				if (err){
					callback(err, null)
					return
				}

				if (user == null){
					callback(err, null)
					return
				}

				if(callback != null){
					if(isRaw == true){
						callback(null, user)
						return
					}
					callback(null, user.summary())
				}
			})
			return
		}

		User.find(params, function(err, users){
			if(err){
				if(callback != null)
					callback(err, null)
				return
			}

			if (users == null){
				callback(err, null)
				return
			}

			if(callback != null){
				if(isRaw == true){
					callback(null, users)
					return
				}

				var summaries = []
				for (var i=0; i<users.length; i++){
					var user = users[i]
					summaries.push(user.summary())
				}
				callback(null, summaries)
			}
		})
	},
  post: function(params, callback){
  var password = params['password'] // plain text password
  var hashedPassword = bcrypt.hashSync(password, 10)
  params['password'] = hashedPassword

    User.create(params, function(err, user){
      if(err){
        if(callback != null)
          callback(err, null)
        return
      }

      if(callback != null)
        callback(null, user)
    })
  }
}
