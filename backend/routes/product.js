const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authenticate')

router.route('/product').get(catchAsyncError(isAuthenticatedUser),getProducts);
router.route('/product/new').post(catchAsyncError(isAuthenticatedUser),authorizeRoles('admin'),catchAsyncError(newProduct))

router.route('/product/:id')
.get(getSingleProduct)
.put(updateProduct)
.delete(deleteProduct)

module.exports = router;