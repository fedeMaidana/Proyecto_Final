const { Shopping_cart, User  } = require( '../db' )

const handlePaymentSuccess = async (event) => {
    const sessionData = event.data.object.metadata;
    const products = sessionData.products;

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
            shoppingCart.estado_pedido = 'Pago Aprobado';

            await shoppingCart.save();

            console.log('Tabla Shopping_cart actualizada con éxito');

            // Lógica para el pago exitoso
            const paymentInfo = sessionData.payment_info; // Ajusta cómo obtienes la información del pago

            // Lógica para almacenar la información del pago en la base de datos
            // Ejemplo: guardar paymentInfo en una base de datos

            // Lógica para enviar un correo electrónico de confirmación
            const to = 'destinatario@example.com'; // Cambia esto
            const subject = 'Confirmación de pago exitoso';
            const text = `¡Pago exitoso! Detalles: ${JSON.stringify(paymentInfo)}`;
            await sendEmail(to, subject, text);

            // Envía una respuesta al cliente
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Pago exitoso y actualización exitosa', paymentInfo: paymentInfo }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Carrito de compras no encontrado' }),
            };
        }
    } catch (error) {
        console.error('Error al procesar el pago y actualizar la tabla Shopping_cart:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al procesar el pago y actualizar la tabla Shopping_cart' }),
        };
    }
};

module.exports = {handlePaymentSuccess}