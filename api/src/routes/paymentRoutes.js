const { Router } = require('express');
const { createSession } = require('../controllers/paymentController');
const {handlePaymentSuccess} = require('../handlers/PaymentSuccess');
const {handlePaymentCancel}= require('../handlers/PaymentCancel');

const paymentRouter = Router();

paymentRouter.post('/create-checkout-session', createSession); // Cambiar a POST en lugar de GET
paymentRouter.post('/success', async (req, res) => {
    const event = req.body; // Stripe envía el evento en el cuerpo de la solicitud
    if (event.type === 'payment_intent.succeeded') {
        // Llamada al manejador de pago exitoso
        await handlePaymentSuccess(event);
    }
    // Responder a Stripe
    res.json({ received: true });
});
paymentRouter.post('/cancel',async (req, res) => {
    const event = req.body; // Stripe envía el evento en el cuerpo de la solicitud
    if (event.type === 'payment_intent.succeeded') {
        // Llamada al manejador de pago exitoso
        await handlePaymentCancel(event);
    }
    // Responder a Stripe
    res.json({ received: true });
});

module.exports = paymentRouter;
