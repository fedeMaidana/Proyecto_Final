const express = require('express');
const cartHandler = require('../handlers/ShoppingCartHandlers');

const cartRouter = express.Router();

// Ruta GET para obtener el contenido del carrito de compras
cartRouter.get('/', cartHandler.getShoppingCart);

// Ruta POST para agregar un producto al carrito de compras
cartRouter.post('/', cartHandler.addToCart);

// Ruta DELETE para eliminar un producto del carrito de compras
cartRouter.delete('/:productId', cartHandler.removeFromCart);

module.exports = cartRouter;
