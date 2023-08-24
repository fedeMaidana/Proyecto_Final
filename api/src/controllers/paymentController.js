require( 'dotenv' ).config()
const {STRIPE} = process.env
const Stripe = require('stripe');
const stripe = new Stripe(`${STRIPE}`);

const createSession = async (req, res) => {
    try {
        const { products, cartId } = req.body;


        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'La lista de productos es inválida o está vacía' });
        }

        let lineItems;
        if (products.length === 1) {
            const product = products[0];
            lineItems = [
                {
                    price_data: {
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        currency: 'usd',
                        unit_amount: product.price * 100,
                    },
                    quantity: product.quantity,
                },
            ];
        } else {
            lineItems = products.map(product => ({
                price_data: {
                    product_data: {
                        name: product.name,
                        description: product.description,
                    },
                    currency: 'usd',
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            }));
        }

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://proyectofinal-production-4957.up.railway.app/success',
            cancel_url: 'https://proyectofinal-production-4957.up.railway.app/cancel',
        });

        //Para guardar la compra
        req.sessionData = {
            products: products,
            cartId: cartId,
        };

        return res.json({ sessionUrl: session.url });

    } catch (error) {
        console.error('Error al crear sesión de pago:', error);
        return res.status(500).json({ error: 'Error al crear sesión de pago' });
    }
};



module.exports = { createSession };
