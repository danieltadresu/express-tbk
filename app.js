const path = require('path');

const bodyParser = require('body-parser')

const express = require('express');

const app = express();

const shopHomeRouter = require('./routes/shop-home');
const adminRouter = require('./routes/admin');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(shopHomeRouter);
app.use('/admin', adminRouter);

// Get Error
app.use((req, res, next) => {
  return console.log('Url not exists');
})

app.listen(3000);
