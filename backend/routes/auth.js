const express =require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require('../controller/authController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();

router.route('/register').post(catchAsyncError(registerUser));
router.route('/login').post(catchAsyncError(loginUser))
router.route('/logout').get(logout);
router.route('/password/forgot').post(catchAsyncError(forgotPassword));
router.route('/password/reset/:token').post(catchAsyncError(resetPassword));

module.exports = router;