

const jwt = require("jsonwebtoken");
const joiError = require("../../middlewares/Errors/joi-error");
const { HttpError } = require("../errors/http-error");







const signToken=({payload})=>{
   try {
       const token = jwt.sign(payload,process.env.JWT_SECRET)
       return token
   } catch (error) {
    throw new Error(error);  
   }
}



const verifyToken=(req,res,next)=>{
   try {
       if (!req.header('Authorization')) {
        const e = new HttpError(401,"Please provide authorization header" );
        return next(e); 
       }
    const token = req.header("Authorization").split(' ')[1];
    if(!token){
      const e = new HttpError(401,"No token supplied to the header" );
      return next(e);
    }
  const decoded =   jwt.verify(token, process.env.JWT_SECRET);
  req.userData = decoded;
    next();
   } catch (error) {
     joiError(error, next);
   }
}


module.exports={
    signToken,
    verifyToken
}