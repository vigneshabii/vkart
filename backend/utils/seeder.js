const products = require('../data/products.json');
const Product = require('../model/productModel');
const dotenv =require('dotenv');
const connectDatabase = require('../config/database');
const path = require('path')

dotenv.config({path:path.join(__dirname,"../","config/config.env")});
connectDatabase();

const seedProducts = async() => {
    try{
    await Product.deleteMany();
    console.log('Products Deleted')
    await Product.insertMany(products);
    console.log('All products added')
    } catch(err){
        console.log('This is error',err.message)
    }
    process.exit();
}

seedProducts();