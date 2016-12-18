var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');
var bcrypt = require('bcrypt')

router.get('/:action', function(req, res, next){
  var action = req.params.action

  if(action == 'logout'){
    var userId = req.session.user

    userController.get({id: userId}, null, function(err, result){
      if(err){
        res.json({
          confirmation: 'Fail',
          message: err.message
        })
        return
      }

      req.session.reset()
      res.json({
        confirmation: 'Success',
        message: 'Logged out. Goodbye!'
      })
      return
    })
  }

  if(action == 'currentuser'){
    if(req.session == null){
      res.json({
        confirmation: 'Fail',
        message: 'No Current User: No session place'
      })
      return
    }

    if(req.session.user == null){
      res.json({
        confirmation: 'Fail',
        message: 'No Current User: No user in current session'
      })
      return
    }

    var userId = req.session.user
    userController.get({id: userId}, null, function(err, result){
      if(err){
        res.json({
          confirmation: 'Fail',
          message: err.message
        })
        return
      }
      res.json({
        confirmation: 'Success',
        user: result
      })
      return
    })
  }
})

router.post('/:action', function(req, res, next){
  var action = req.params.action

  if(action == 'login'){
    var credentials = req.body
    var email = credentials.email.toLowerCase()

    userController.get({email: email}, true, function(err, results){
      console.log("USER ROUTER GET RESULTS: "+JSON.stringify(results))
      console.log("USER ROUTER Error: "+JSON.stringify(err))

      if(results.length == 0){
        res.json({
          confirmation: 'Fail',
          message: 'User email not found. Please check spelling and try again'
        })
        return
      }

      var user = results[0]
      var passwordCorrect = bcrypt.compareSync(credentials.password, user.password)

      if(err){
        res.json({
          confirmation: 'Fail',
          message: err
        })
        return
      }

      if(passwordCorrect == false){
        res.json({
          confirmation: 'Fail',
          message: 'Incorrect Password. Please check spelling and try again.'
        })
        return
      }

      //install cookie to track current user
      var userSummary = user.summary()
      req.session.user = userSummary.id
      console.log("User Session: "+JSON.stringify(req.session.user))

      res.json({
        confirmation: 'Success',
        currentuser: userSummary
      })
      return
    })
  }
})

module.exports = router
