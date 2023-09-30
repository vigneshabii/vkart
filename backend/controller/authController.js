const { catchAsyncError } = require("../middleware/catchAsyncError");
const createErrorHandler = require("../utils/errorHandler");
const User = require('../model/userModel');
const sendToken = require("../utils/sendToken");

exports.registerUser = async (req,res,next) =>{
    try{
    const {name, email, password, avatar}=req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar
    })
    if(!user || user.length == 0){
        throw new createErrorHandler('Registration falied',400)
    }
    sendToken(user, 201, res);
    } catch(err){
        next(err)
    }
}

exports.loginUser = async(req,res,next) =>{
    try{
    const {email,password} = req.body;
    if(!email || !password) {
        throw new createErrorHandler('Please enter email and password',400)
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new createErrorHandler('Invalid email or password',401)
    }
    if(! await user.isValidPassword(password)){
        throw new createErrorHandler('Invalid email or password',401)
    }
    sendToken(user, 201, res);
    } catch(err){
        next(err)
    }
}