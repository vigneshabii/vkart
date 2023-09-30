const express = require('express');
const app = express();
const { errorMiddleware } = require('./middleware/error');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
const products = require('./routes/product');


app.use('/api/v1/',products);
app.use('/api/v1/',auth);

app.use(errorMiddleware);
module.exports = app;