const express = require('express');
const { 
    newOrder, 
    getSingleOrder, 
    myOrders, 
    orders, 
    updateOrder,
    deleteOrder
    } = require('../controller/orderController');
const { catchAsyncError } = require('../middleware/catchAsyncError');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser,catchAsyncError(newOrder));
router.route('/order/:id').post(isAuthenticatedUser,catchAsyncError(getSingleOrder));
router.route('/myorders').post(isAuthenticatedUser,catchAsyncError(myOrders));

//Admin routes
router.route('/admin/orders').post(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(orders));
router.route('/admin/order/:id')
.put(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(updateOrder))
.delete(isAuthenticatedUser,authorizeRoles('admin'),catchAsyncError(deleteOrder));


module.exports= router;