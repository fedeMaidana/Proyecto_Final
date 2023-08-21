const { Shopping_cart, User  } = require( '../db' )
const { sendEmail } = require('../Nodemailer/OrderBuy');

const handlePaymentCancel = async (event) => {
    // const sessionData = event.data.object.metadata;
    // const reason = sessionData.reason; // Ajusta cómo obtienes la razón de la cancelación

    try {
        const shoppingCart = await Shopping_cart.findOne({
            where: { id: sessionData.cartId },
        });

        if (shoppingCart) {
            const productQuantities = products.map(product => product.quantity);
            const productPrices = products.map(product => product.price);
            const productTotalPrices = products.map(product => product.total_price);

            shoppingCart.quantity = productQuantities;
            shoppingCart.unit_prices = productPrices;
            shoppingCart.total = productTotalPrices;
            shoppingCart.estado_pedido = 'Pago Cancelado';

            await shoppingCart.save();

            console.log('Tabla Shopping_cart actualizada con estado de Pago Cancelado');

            // Lógica para enviar un correo electrónico de cancelación
            const to = 'destinatario@example.com'; // Cambia esto
            const subject = 'Pago cancelado';
            const text = `¡Pago cancelado! Motivo: ${reason}`;
            await sendEmail(to, subject, text);

            // Envía una respuesta al cliente
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Pago cancelado y actualización exitosa' }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Carrito de compras no encontrado' }),
            };
        }
    } catch (error) {
        console.error('Error al procesar la cancelación y actualizar la tabla Shopping_cart:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al procesar la cancelación y actualizar la tabla Shopping_cart' }),
        };
    }
};

module.exports = {handlePaymentCancel}