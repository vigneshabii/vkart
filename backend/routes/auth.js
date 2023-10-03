const express =require('express');
const { 
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    changePassword,
    updateProfile,
    getAllusers,
    getUser,
    updateUser,
    deleteUser
    } = require('../controller/authController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate');
const router = express.Router();

router.route('/register').post(catchAsyncError(registerUser));
router.route('/login').post(catchAsyncError(loginUser))
router.route('/logout').get(logout);
router.route('/password/forgot').post(catchAsyncError(forgotPassword));
router.route('/password/reset/:token').post(catchAsyncError(resetPassword));
router.route('/myprofile').get(isAuthenticatedUser,catchAsyncError(getUserProfile));
router.route('/password/change').put(isAuthenticatedUser,catchAsyncError(changePassword));
router.route('/update').put(isAuthenticatedUser,catchAsyncError(updateProfile));

//Admin routes
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(getAllusers));
router.route('/admin/user/:id')
.get(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(getUser))
.put(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(updateUser))
.delete(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(deleteUser))

module.exports = router;