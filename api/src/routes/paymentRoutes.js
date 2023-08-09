const {Router} = require('express');
const {createSession} = require('../controllers/paymentController')

const paymentRouter = Router();

paymentRouter.get('/create-checkout-session', createSession);
paymentRouter.get('/success',(req,res)=>res.send('success'));
paymentRouter.get('/cancel',(req,res)=>res.send('cancel'));


module.exports = paymentRouter