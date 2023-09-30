const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();
const {isAuthenticatedUser} = require('../middleware/authenticate')

router.route('/product').get(catchAsyncError(isAuthenticatedUser),getProducts);
router.route('/product').post(catchAsyncError(newProduct))

router.route('/product/:id')
.get(getSingleProduct)
.put(updateProduct)
.delete(deleteProduct)

module.exports = router;