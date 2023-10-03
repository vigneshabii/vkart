const { catchAsyncError } = require("../middleware/catchAsyncError");
const createErrorHandler = require("../utils/errorHandler");
const User = require('../model/userModel');
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/email");
const crypto = require('crypto')

//Register user - /api/v1/register
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

//Login User - /api/v1/login
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

//Logout - /api/v1/logout
exports.logout = (req,res,next) =>{
    try{
        const options = {
            expires: new Date(Date.now()),
            httpOly: true,
        } 
        res.cookie('token',null,options)
        .status(200)
        .json({
            success: true,
            message: 'Logged Out Successfully'
        })
    } catch(err) {
        next(err)
    }
}

//Forgot password - /api/v1/password/forgot
exports.forgotPassword = async (req,res,next) =>{
    try{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        throw new createErrorHandler('User not found with this email',401)
    }
    const resetToken = user.getResetToken()
    await user.save({validateBeforeSave: false});

    //Create Reset url
    //http://127.0.0.1/api/v1/password/reset/token
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset as followd \n \n   
    ${resetUrl} \n\n if you have not requested this email please ignore it`
      try{
        sendEmail({
            email: user.email,
            subject: "Vkart password recovery",
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
      }  catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        user.save({validateBeforeSave:false});
        return next(new createErrorHandler(err.message,500))
        } 
    } catch(err){
        next(err)
    }
}

//Reset password - /api/v1/password/reset/:token
exports.resetPassword = async(req,res,next) =>{
    try{
        const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordTokenExpire: {
                $gt: Date.now()
            }
        })
        if(!user){
            throw new createErrorHandler('Password reset token is invalid or expired')
        }
        if(req.body.password !== req.body.confirmPassword){
            throw new createErrorHandler('Password does not match')
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false})
        sendToken(user, 201, res)
    } catch (err){
        next(err)
    }
}

//Get user profile - /api/v1/myprofile
exports.getUserProfile = async (req,res,next) =>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user,
    })
}

//change password - /api/v1/login
exports.changePassword = async (req,res,next) =>{
    try{
    const user = await User.findById(req.user.id).select('+password');

    //check old password
    if(! await user.isValidPassword(req.body.oldPassword)){
        throw createErrorHandler('Old password is incorrect',401)
    }
    //Assign new password
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success:true 
    })
} catch(err){
    next(err)
}
}

//Update profile - 
exports.updateProfile = async (req,res,next) => {
    try{
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user =await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({
        success: true,
        user
    })
} catch (err){
    next(err)
}
}