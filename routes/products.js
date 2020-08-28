var express = require('express');
var router = express.Router();
const multer = require('multer');
var mongoose = require('mongoose');
const Product = require('../models/product');
const WebpayController = require('../controllers/webpayNormalController');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  }
  else {
      cb(null, false);
  };
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter : fileFilter
});

/* GET home page. */
router.get('/', function(req, res, next) {

  var savedProducts = [];
  Product.find()
  .exec()
  .then(products => {
    savedProducts = products;
    res.render('index', { items: savedProducts });
  })
  .catch(err => {
    console.log(err);
  });
});

router.post('/createproduct', upload.single('productImage'), function(req, res, next) {
  console.log(req.file);

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product
  .save()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
});

router.get('/webpay/:price', WebpayController.webpayPlusControllerInit);

/*
router.get('/webpay/:price', function(req, res,next) {
  const price = req.params.price;
  console.log(price);
});
*/

module.exports = router;
