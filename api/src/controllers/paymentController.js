const Stripe = require('stripe')
const {datos1} = require('./pruebadedatos.js')

const stripe = new Stripe('sk_test_51Nct5HE72cTKcNQsOnxyCKw5Yin2h9AOZpffa4T3oZwOeYyS0s498NWFCTx6BjUb8c6Ajo1a2hn3YebAjqd2XfXj00OUD93IHQ')

const createSession = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: 'aqui va el nombre' ,
                        description: 'aqui va la descripcion' ,
                        
                    },
                    currency: 'usd',
                    unit_amount: 1000 //100$
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3001/success',
        cancel_url: 'http://localhost:3001/cancel'
    })
    return res.redirect(303, session.url);
}


module.exports = { createSession }