const path = require('path');

const express = require('express');

const app = express();

const shopHomeRouter = require('./routes/shop-home');
const adminRouter = require('./routes/admin');

app.use(express.static(path.join(__dirname, 'public')));

app.use(shopHomeRouter);
app.use('/admin', adminRouter);

app.listen(3000);
