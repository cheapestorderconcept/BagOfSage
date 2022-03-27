const { HttpError } = require('../../../middlewares/errors/http-error');
const { httpResponse } = require("../../../middlewares/http/http-response");
const { User } = require("../../../model/User/user");





const profile = async function profile(req,res,next) {
    try {
        const {userId} = req.userData;
        const user = await User.findUserById(userId);
        if (user) {
            httpResponse({status_code:200, response_message:'Profile found', data:{user},res});
        }else{
            const e = new HttpError(404, 'This account has probably being deleted');
            return next(e)
        }
    } catch (error) {
         const e = new HttpError(500, 'Internal server error. Please contact support');
         return next(e);
    }
}

module.exports={
    profile
}