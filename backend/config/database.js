const mongoose = require('mongoose');

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }).then((con)=>{
        console.log(`Mongodb connected to the host ${con.connection.host}`)
    }).catch((err)=>{
        console.error(err);
    })
}

module.exports = connectDatabase;