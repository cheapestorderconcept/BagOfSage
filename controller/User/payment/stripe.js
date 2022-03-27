


const stripe = require('stripe')(process.env.STRIPE_KEY);
const { HttpError } = require('../../../middlewares/errors/http-error');



const initiatePayment = async function initiatePayment(amount, next){
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100,
            currency: 'usd',
            payment_method_types: ['card'],
          });
          return paymentIntent;
    } catch (error) {
        const e = new HttpError(500, 'We are unable to initiate the payment');
        return next(e);
    }
}

module.exports={
initiatePayment
}



