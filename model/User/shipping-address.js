
const mongoose = require('mongoose');


const shippingAddressSchema = new mongoose.Schema({
    shipping_details: {
        reciever_phone_number: {type: String, required:true},
        reciever_name: {type:String},
        country: {type:String, required:true},
        address: {type:String},
        postal_code: {type:String, required:true}
    },
    user: {type:mongoose.Types.ObjectId, ref:'user'},
 
},{
    timestamps:true
})


shippingAddressSchema.statics.addShippingAddress = async function addingShippingAddress(shippingDetails) {
    const newAddress = new Shipping(
        shippingDetails);
    const address = await newAddress.save();
    return address;
}

shippingAddressSchema.statics.updateAddress = async function updateAddress(addressId, data) {
    const updatedAddress = await Shipping.findOneAndUpdate({_id:addressId}, {
        shipping_details: data
    },{upsert:true, new:true});
    return updatedAddress;
}

shippingAddressSchema.statics.getAddress = async function getAddress(userId) {
    const userAddress = await Shipping.findOne({user:userId});
    return userAddress;
}

shippingAddressSchema.statics.deleteAddress = async function deleteAddress(addressId) {
    const userAddress = await Shipping.findOneAndDelete({_id:addressId});
    return userAddress;
}


const Shipping = mongoose.model('shipping-address', shippingAddressSchema);


module.exports={
    Shipping
}