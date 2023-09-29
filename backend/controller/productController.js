const Product =require('../model/productModel');
const APIFeatures = require('../utils/apiFeatures');
const createErrorHandler = require('../utils/errorHandler');


//Get Products - 
exports.getProducts = async (req,res,next)=>{
    const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter();
    const product=await apiFeatures.query;
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Cannot get products"
        });
    }
    res.status(200).json({
        success: true,
        count: product.length,
        product,
    })
}

//Create Product - api/v1/product/new
exports.newProduct = async (req,res,next) => {
    try{
    const product = await Product.create(req.body)
    res.status(201).json({
    success:true,
    product,
   }) 
   throw err;
} catch (err){
    next(err)
}
}

//Get Single Product
exports.getSingleProduct = async (req,res,next) => {
    try{
    const product = await Product.findById(req.params.id);
    if(!product || product.length === 0){
        throw new createErrorHandler('Product not found',400); 
    }
    res.status(201).json({
        success : true,
        product,
    });
} catch (err) {
    next(err);
}

}

//Update product
exports.updateProduct = async (req,res,next) =>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: "No product found"
        });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({
        success: true,
        product
    })
}

//Delete product
exports.deleteProduct =async (req,res,next) =>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: "No product found"
        });
    }
    await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted"
    })
}