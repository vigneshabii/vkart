const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.processPayment = async (req,res,next) =>{
    const paymentIntent =
}