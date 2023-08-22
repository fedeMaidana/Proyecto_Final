require( 'dotenv' ).config()
const {STRIPE} = process.env
const Stripe = require('stripe');
const stripe = new Stripe(`${STRIPE}`);

const createSession = async (req, res) => {
  try {
      const { cardName, cardDescription, cardPrice } = req.body;
  
      const session = await stripe.checkout.sessions.create({
          line_items: [
              {
                  price_data: {
                      product_data: {
                          name: cardName,
                          description: cardDescription,
                      },
                      currency: 'usd',
                      unit_amount: cardPrice,
                  },
                  quantity: 1,
              },
          ],
          mode: 'payment',
          success_url: 'http://localhost:3001/success',
          cancel_url: 'http://localhost:3001/cancel',
      });
  
      return res.json({ sessionUrl: session.url }); // Devuelve la URL de sesión
  
  } catch (error) {
      console.error('Error al crear sesión de pago:', error);
      return res.status(500).json({ error: 'Error al crear sesión de pago' });
  }
};

module.exports = { createSession };
