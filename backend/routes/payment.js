const express  = require('express');
const { isAuthenticatedUser } = require('../middleware/authenticate');
const { processPayment, sendStripeApi } = require('../controller/paymentController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser,catchAsyncError(processPayment))
router.route('/stripeapi').get(isAuthenticatedUser,catchAsyncError(sendStripeApi))

module.exports = router;