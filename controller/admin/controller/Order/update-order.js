
const { HttpError } = require('../../../../middlewares/errors/http-error');
const { httpResponse } = require('../../../../middlewares/http/http-response');
const { orderModel, orderStatus } = require('../../../../model/order');





const updateClientOrder = async function updateClientOrder(req,res,next) {
    try {
        const {productId} = req.query;
        const {order_status, shipping_tracking_number, total_price} = req.body;
        const data ={
            order_status,
            shipping_tracking_number,
            total_price
        }
        const acceptedStatus = Object.values(orderStatus);
        if (acceptedStatus.includes(order_status)==false) {
          const e  = new HttpError(400, "The orderstatus supplied in your query is not accepted. Please check doc for accepted status");
          return next(e);
        }
        const updatedOrder  = orderModel.updateOrder(productId, data);
        if (updatedOrder) {
            httpResponse({status_code:200, response_message:'Order has been successfully modified', data:{updatedOrder}, res});
            return;
        }
        const e = new HttpError(500, 'Unable to update this order. Please contact support if persists');
        return next(e);
    } catch (error) {
        joiError(error,next);
    }
}

module.exports={
    updateClientOrder
}