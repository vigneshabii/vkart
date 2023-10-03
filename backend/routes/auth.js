const express =require('express');
const { 
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    changePassword,
    updateProfile
    } = require('../controller/authController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const { isAuthenticatedUser } = require('../middleware/authenticate');
const router = express.Router();

router.route('/register').post(catchAsyncError(registerUser));
router.route('/login').post(catchAsyncError(loginUser))
router.route('/logout').get(logout);
router.route('/password/forgot').post(catchAsyncError(forgotPassword));
router.route('/password/reset/:token').post(catchAsyncError(resetPassword));
router.route('/myprofile').get(isAuthenticatedUser,catchAsyncError(getUserProfile));
router.route('/password/change').put(isAuthenticatedUser,catchAsyncError(changePassword));
router.route('/update').put(isAuthenticatedUser,catchAsyncError(updateProfile));

module.exports = router;