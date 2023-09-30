const express =require('express');
const { registerUser, loginUser } = require('../controller/authController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();

router.route('/register').post(catchAsyncError(registerUser));
router.route('/login').post(catchAsyncError(loginUser))

module.exports = router;