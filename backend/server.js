const app = require('./app');
const donenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');

donenv.config({path:path.join(__dirname,"config/config.env")});

connectDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`Server Listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})