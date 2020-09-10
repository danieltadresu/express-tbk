const path = require('path');

const express = require('express');

const router = express.Router();

const savedProducts = [];

router.get('/', (req, res, next) => {
  res.render('add-product');
});

router.post('/add-product', (req, res, next) => {
  savedProducts.push({
    title: req.body.title
  });
  res.redirect('/');
});

exports.routes = router;
exports.products = savedProducts;
