const express =require('express');
const { registerUser, loginUser, logout } = require('../controller/authController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();

router.route('/register').post(catchAsyncError(registerUser));
router.route('/login').post(catchAsyncError(loginUser))
router.route('/logout').get(logout);

module.exports = router;