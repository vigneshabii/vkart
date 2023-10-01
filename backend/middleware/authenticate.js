const jwt = require("jsonwebtoken");
const createErrorHandler = require("../utils/errorHandler");
const User = require('../model/userModel');

exports.isAuthenticatedUser = async (req,res,next) =>{
    try{
    const {token}=req.cookies;

    if(!token){
        throw new createErrorHandler('Login first to handle this resource',401)
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded.id)
        next();
    } catch(err){
       return next(err)
    }
}

exports.authorizeRoles = (...roles) => {
    try{
    return (req,res,next) =>{
    
        if(!roles.includes(req.user.role)){
        throw new createErrorHandler(`Role ${req.user.role} is not allowed`,401)    
        }
        next();
    }
    } catch (err){
        next(err);   
    }
}