const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview } = require('../controller/productController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authenticate')

router.route('/products').get(catchAsyncError(isAuthenticatedUser),getProducts);

router.route('/product/:id')
.get(getSingleProduct)
.put(updateProduct)
.delete(deleteProduct)
router.route('/review').put(catchAsyncError(isAuthenticatedUser),createReview)
                    .delete(catchAsyncError(isAuthenticatedUser),deleteReview)
router.route('/reviews').get(catchAsyncError(isAuthenticatedUser),getReviews);


//Admin routes
router.route('/admin/product/new').post(catchAsyncError(isAuthenticatedUser),authorizeRoles('admin'),catchAsyncError(newProduct))

module.exports = router;