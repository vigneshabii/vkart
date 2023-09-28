const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();


router.route('/product').get(getProducts);
router.route('/product/new').post(catchAsyncError(newProduct))

router.route('/product/:id')
.get(getSingleProduct)
.put(updateProduct)
.delete(deleteProduct)

module.exports = router;