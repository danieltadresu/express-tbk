const path = require('path');

const express = require('express');

const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(adminData.products);
  res.render('shop-home');
});

module.exports = router;
