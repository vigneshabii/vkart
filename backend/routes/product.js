const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdmineProducts } = require('../controller/productController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authenticate');
const multer = require('multer');
const path = require('path');

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'..','uploads/product'))
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})})

router.route('/products').get(getProducts);

router.route('/product/:id')
.get(getSingleProduct)
router.route('/review').put(catchAsyncError(isAuthenticatedUser),createReview);

//Admin routes
router.route('/admin/product/new').post(catchAsyncError(isAuthenticatedUser),authorizeRoles('admin'),upload.array('images'),catchAsyncError(newProduct))
router.route('/admin/products').get(catchAsyncError(isAuthenticatedUser),authorizeRoles('admin'),catchAsyncError(getAdmineProducts))
router.route('/admin/product/:id').delete(catchAsyncError(isAuthenticatedUser),authorizeRoles('admin'),catchAsyncError(deleteProduct))
router.route('/admin/product/:id').put(catchAsyncError(isAuthenticatedUser),authorizeRoles('admin'),upload.array('images'),catchAsyncError(updateProduct))
router.route('/admin/reviews').get(catchAsyncError(isAuthenticatedUser),authorizeRoles('admin'),getReviews);
router.route('/admin/review').delete(catchAsyncError(isAuthenticatedUser),authorizeRoles('admin'),deleteReview);


module.exports = router;