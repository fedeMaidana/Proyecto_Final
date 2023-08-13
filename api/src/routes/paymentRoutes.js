const { Router } = require('express');
const { createSession } = require('../controllers/paymentController');

const paymentRouter = Router();

paymentRouter.post('/create-checkout-session', createSession); // Cambiar a POST en lugar de GET
paymentRouter.get('/success', (req, res) => res.send('success'));
paymentRouter.get('/cancel', (req, res) => res.send('cancel'));

module.exports = paymentRouter;
