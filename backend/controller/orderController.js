const Order = require("../model/orderModel");
const Prodcut = require("../model/productModel");
const createErrorHandler = require("../utils/errorHandler");

//Create new order - ap/v1/order/new
exports.newOrder = async(req,res,next) =>{
    try{
    const {
        orderItems,
        shippingInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })
    res.status(200).json({
        success: true,
        order
    })
    } catch(err){
        next(err)
    }
}

//Get single order - /api/v1/order/:id
exports.getSingleOrder = async(req,res,next) =>{
    try{
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(!order){
        throw new createErrorHandler(`Order not found this ${req.params.id}`,404)
    }
    res.status(200).json({
        success:true,
        order
    })
} catch(err){
    next(err)
}
}

//Get logged in user orders - /api/v1/myorders
exports.myOrders = async(req,res,next) =>{
    try{
        const order = await Order.find({user: req.user.id});
        if(!order){
            throw new createErrorHandler(`No orders found`,404)
        }
        res.status(200).json({
            success:true,
            order
        })
    } catch(err){
        next(err)
    }
}

//Admin: Get all orders - /api/v1/admin/orders
exports.orders = async(req,res,next) =>{
    try{
        const order = await Order.find({});
        if(!order){
            throw new createErrorHandler(`No orders found`,404)
        }
        let totalAmount = 0;
        order.forEach(order => {
            totalAmount += order.totalPrice;
        })

        res.status(200).json({
            success:true,
            totalAmount,
            order
        })
    } catch(err){
        next(err)
    }
}

//Admin: Update order / Order status - /api/v1/admin/order/:id
exports.updateOrder = async (req,res,next) =>{
    try{
    const order = await Order.findById(req.params.id);

    if(order.orderStatus == 'Delivered'){
        throw new createErrorHandler('Order already delivered',400)
    }
    //Updating the product stock of each order item
    order.orderItems.forEach(async orderItem =>{
        await updateStock(orderItem.product, orderItem.quantity)
    })
    async function updateStock(productId, quantity){
        const product = await Prodcut.findById(productId);
        product.stock = product.stock - quantity;
        product.save({validateBeforeSave:false})
    }
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true 
    })
} catch(err){
    next(err)
}
}

//Admin: Delete order - /api/v1/admin/order/:id
exports.deleteOrder = async (req,res,next) =>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            throw new createErrorHandler(`Order not found this ${req.params.id}`,404)
        }
        await order.deleteOne();
        res.status(200).json({
            success: true
        })
    } catch(err){
        next(err)
    }
}