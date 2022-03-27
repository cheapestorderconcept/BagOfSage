const { HttpError } = require("../../../middlewares/errors/http-error");
const { httpResponse } = require("../../../middlewares/http/http-response");
const { productModel } = require("../../../model/product");




const userGetAllProduct = async function getAllProduct(req,res,next) {   
    try {
        const product = await  productModel.getProduct();
        if (product&&product.length>0) {
            httpResponse({status_code:200, response_message:'Product available', data:{product}, res});
        }else{
            const e = new HttpError(400, 'The store has no products as at moment check back later');
            return next(e);
        }
    } catch (error) {
        console.log(error);
        const e = new HttpError(500, 'A system error has occured. Please contact support if persists');
        return next(e);
    }
}

const userGetSingleProduct = async function userGetSingleProduct(req,res,next) {   
    try {
        const {productId} = req.params;
        if (!productId) {
            const e = new HttpError(400, 'productId is missing in your request params');
            return next(e);
        }
        const product = await  productModel.getSingleProduct(productId);
        if (product) {
            httpResponse({status_code:200, response_message:'Product available', data:{product}, res});
        }else{
            const e = new HttpError(400, 'The store has no products as at moment check back later');
            return next(e);
        }
    } catch (error) {
        console.log(error);
        const e = new HttpError(500, 'A system error has occured. Please contact support if persists');
        return next(e);
    }
}

module.exports={
    userGetAllProduct,
    userGetSingleProduct
}