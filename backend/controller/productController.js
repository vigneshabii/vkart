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
    req.body.user = req.user.id;
    const product = await Product.create(req.body)
    if(!product || product.length === 0){
        throw new createErrorHandler('Cannot create product',400); 
    }
    res.status(201).json({
    success:true,
    product,
   }) 
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

//Create Review /api/v1/review
//Miss to check order is available or not of the user
exports.createReview = async(req,res,next)=>{
    try{
    const {productId, rating, comment} = req.body;
    const review = {
        user: req.user.id,
        rating,
        comment,
    }
    //Finding user review exisits
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(review =>{
        return review.user.toString() === req.user.id.toString()
    })
    
    //Updating the review
    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user.toString() === req.user.id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
            
        })
    } else {
        //Else create the review
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }
    //find the average of the product reviews
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    },0) / product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings;    
    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true
    })
} catch (err){
        next(err)
    }
}

//Get Reviews - api/v1/reviews
exports.getReviews = async(req,res,next) =>{
    try{
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
} catch(err){
    next(err)
}
}

//Delete Review - api/v1/review
exports.deleteReview = async(req,res,next) =>{
    try{
    const product = await Product.findById(req.query.productId);
    //Filtering the reviews which does not match the deleting review id
    const reviews = product.reviews.filter(review => {
        return review._id.toString() !==  req.query.id.toString()
    })
    
    //Num of reviews
    const numOfReviews = reviews.length;

    //Find the average of the product reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    },0) / product.reviews.length;
    ratings = isNaN(ratings)?0:ratings;
    
    //save the product data 
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings,
    })
    res.status(200).json({
        success:true
    })
    } catch(err){
        next(err)
    }
}