const Product =require('../model/productModel');
const APIFeatures = require('../utils/apiFeatures');
const createErrorHandler = require('../utils/errorHandler');


//Get Products - 
exports.getProducts = async (req,res,next)=>{
    try{
    const resPerPage = 2;
    const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().paginate(resPerPage);
    const product=await apiFeatures.query;
    if(!product || product.length === 0){
        throw new createErrorHandler('Cannot get products',400); 
    }
    res.status(200).json({
        success: true,
        count: product.length,
        product,
    })
    } catch(err){
        next(err)
    }
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
    res.status(200).json({
        success : true,
        product,
    });
} catch (err) {
    next(err);
}

}

//Update product
exports.updateProduct = async (req,res,next) =>{
    try{
    let product=await Product.findById(req.params.id);
    if(!product || product.length === 0){
        throw new createErrorHandler('Updation Failed',400); 
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(201).json({
        success: true,
        product
    })
    } catch (err){
        next(err)
    }
}

//Delete product
exports.deleteProduct =async (req,res,next) =>{
    try{
    let product=await Product.findById(req.params.id);
    if(!product || product.length === 0){
        throw new createErrorHandler('Deletion Failed',400); 
    }
    await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted"
    })
} catch(err){
    next(err)
}
}