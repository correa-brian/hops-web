var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController')
var controllers = {
  user: userController
}

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]

  if (controller == null){
    res.json({
      confirmation: 'Fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.get(req.query, null, function(err, results){
    if(err){
      res.json({
        confirmation: 'Fail',
        message: err
      })
      return
    }

    res.json({
      confirmation: 'Sucess',
      results: results
    })
    return
  })
});

router.post('/:resource', function(req, res,next){
  var resource = req.params.resource
  var controller = controllers[resource]

  if(controller == null){
    res.json({
      confirmation: 'Fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.post(req.body, function(err, result){
    if(err){
      res.json({
        confirmation: 'Fail',
        message: err.message
      })
      return
    }

    if(resource == 'user'){
      res.json({
        confirmation: 'Success',
        result: result
      })
      return
    }
  })
})

module.exports = router;
