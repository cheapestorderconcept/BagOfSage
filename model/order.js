
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderStatus = {

    pending: 'pending',
    inprogress: 'inprogress',
    cancelled: 'cancelled',
    completed: 'completed'
}

const orderSchema = new schema({
    product: {type:mongoose.Types.ObjectId, ref:'product'},
    total_price: {type: Number, required:true},
    user: {type:mongoose.Types.ObjectId, ref:'user', required:true},
    order_status: {type:String, default: orderStatus.pending},
    product_description: {type: Array},
    shipping_tracking_number: {type: String, },
    shipping_address: {type:{}, required:true},
    quantity: {type:Number, required:true},
    flash_sales: {type:Boolean, required:true}
},{
    timestamps:true
});


orderSchema.statics.addOrder = async function addOrder(productDetails) {
    const order =  new orderModel(productDetails);
    const newOrder = await order.save();
    return newOrder;
}



orderSchema.statics.adminGetOrderByStatus = async function adminGetOrder(status) {
    const product = await orderModel.find({order_status: status});
    return product;
}

orderSchema.statics.userGetOrder = async function userGetOrder(userId) {
    const product = await orderModel.find({user:userId});
    return product;
}

orderSchema.statics.userGetOrderByStatus = async function userGetOrderByStatus(userId, status) {
    const product = await orderModel.find({user:userId, order_status:status});
    return product;
}


orderSchema.statics.deleteOrder = async function deleteProduct(orderId) {
    const product = await orderModel.findOneAndDelete({_id:orderId})
    return product;
}

orderSchema.statics.updateOrder = async function updateOrder(productId, data) {
    const product = await orderModel.findOne({_id:productId}, data);
    return product;
}

const orderModel = mongoose.model('order', orderSchema);

module.exports={
    orderModel,
    orderStatus
}