const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/insert', function(req, res, next) {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password
  });
  console.log(user);

    user
    .save()
    .then(result => {
      console.log(result);

      res.status(201).json({
           message: 'Handling POST requests to /products',
           createdProduct: result
       });

    })
    .catch(err => {
      console.log(err);
    });
});

/* Testing */

router.get('/ajaxtest', function(req, res, next) {
  res.render('ajax')
});

router.post('/ajaxread/:userId', function(req, res, next) {
  var userId = req.params.userId;
  console.log(userId);

  User.remove({
    _id: userId
  })
  .exec()
  .then(result => {
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;
