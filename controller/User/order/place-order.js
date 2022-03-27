
const joi = require('joi');
const { HttpError } = require('../../../middlewares/errors/http-error');
const joiError = require('../../../middlewares/errors/joi-error');
const { httpResponse } = require('../../../middlewares/http/http-response');
const { orderModel } = require('../../../model/order');
const { Shipping } = require('../../../model/User/shipping-address');

const validation = joi.object({
    product: joi.string().required(),
    total_price: joi.number().required(),
    quantity: joi.number().required(),
    flash_sales: joi.boolean().required(),
    product_pictures: joi.array()
});

const placeOrder = async function placeOrder(req,res,next) {    
    try {
        const {userId} = req.userData;
        const shippingAddress = await Shipping.getAddress(userId);
        const bodyValidation = await validation.validateAsync(req.body);
        if (shippingAddress) {
            const {quantity, total_price, flash_sales, product} = bodyValidation;
            const newOrderDetails =  {quantity, total_price, flash_sales, product, shipping_address:shippingAddress, user: userId};
            const addOrders = await orderModel.addOrder(newOrderDetails);
            if (addOrders) {
                httpResponse({status_code:201, response_message:'Order successfully Placed. Your shipping information will be updated shortly', data:{addOrders}, res});
                return;
            }
            const e = new HttpError(500, 'Unable to placed your order. Please contact support if persists');
            return next(e);
        }else{
            const e = new HttpError(400, 'Please add your shipping address, before placing order');
            return next(e);
        }
    } catch (error) {
        joiError(error, next);
    }
}

module.exports={
    placeOrder
}