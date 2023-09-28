const express = require('express');
const app = express();
const { errorMiddleware } = require('./middleware/error');

app.use(express.json());
const products = require('./routes/product');
const createErrorHandler = require('./utils/errorHandler');


app.use('/api/v1/',products);
app.use('*',(req,res,next)=>{
    try {throw createErrorHandler('Page Not Found',404)}
    catch(err) {next(err)}
})
app.use(errorMiddleware);
module.exports = app;