const { Router } = require('express');
const { createSession } = require('../controllers/paymentController');
const {handlePaymentSuccess} = require('../handlers/PaymentSuccess');
const {handlePaymentCancel}= require('../handlers/PaymentCancel');

const paymentRouter = Router();

paymentRouter.post('/create-checkout-session', createSession); // Cambiar a POST en lugar de GET
paymentRouter.get('/success', handlePaymentSuccess);
paymentRouter.get('/cancel', handlePaymentCancel);

module.exports = paymentRouter;
