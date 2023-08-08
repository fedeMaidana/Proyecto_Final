const Stripe = require('stripe')

const stripe = new Stripe('sk_test_51Nct5HE72cTKcNQsOnxyCKw5Yin2h9AOZpffa4T3oZwOeYyS0s498NWFCTx6BjUb8c6Ajo1a2hn3YebAjqd2XfXj00OUD93IHQ')

const createSession = async (req,res)=>{
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data:{
                    price: 1, // Reemplaza con el ID del precio real en Stripe
                    quantity: 1
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url:'http://localhost:3001/success',
        cancel_url: 'http://localhost:3001/cancel'
    })
    return res.json(session)
}


module.exports = {createSession}