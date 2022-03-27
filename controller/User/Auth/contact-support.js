const { HttpError } = require('../../../middlewares/errors/http-error');
const { httpResponse } = require("../../../middlewares/http/http-response");
const { sendEmail } = require("../../../middlewares/sendGridEmail/email-config");
const { User } = require("../../../model/User/user");


const SupportMessage = async (message_body,last_name,first_name) => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const sending_date = date.toLocaleDateString("en-US", options);
    const emailBody = `
      <div style="background-color: #fff; margin: 0 auto;">
        <p style="font-size: 14px;">Hi,  ${last_name} ${first_name}. Just requested for a support session. Below is the message containing their request
        </p>
        <strong>
        <h2 style="font-size: 16px; color: green">New Support Request</h2>
       <p style="font-size: 16px">  Creation Date: ${sending_date}  </p>
         </strong>
         </p>
         <p style="font-size: 16px">${message_body} </p>
        </p>
        <strong><p></p></strong>
  `
  
    sendEmail('bagofsage@gmail.com',process.env.SUPPORT_EMAIL,emailBody,`New Support Request ${sending_date}`)
  }



const contactSupport = async function contactSupport(req,res,next) {
        try {
            const {message_body} = req.body;
            const {email} = req.body;
            const   user = await User.findUserByEmail(email);
            if (!message_body) {
                const e = new HttpError(400, 'Please provides message body');
                return next(e);
            }
         const msgResponse =   await SupportMessage(message_body, user.first_name, user.last_name);
         if (msgResponse) {
            httpResponse({status_code:200, response_message:'Your request has been successfully sent. A replied will be provided shortly'})
         }else{
            const e = new HttpError(500, 'Unable to send your message at the moment. Please contact support if persists');
            return next(e);  
         }
        } catch (error) {
            console.log(error);
            const e = new HttpError(500, 'A system error occured when sending message. Please contact support if persists');
            return next(e);
        }
}


module.exports={
    contactSupport
}