const express = require( 'express' )
const cartHandler = require( '../handlers/ShoppingCartHandlers' )

const cartRouter = express.Router()

cartRouter.get( '/', cartHandler.getShoppingCart ) // Ruta GET para obtener el contenido del carrito de compras

cartRouter.post( '/add-cart', cartHandler.addToCart )
cartRouter.post( '/create-cart', cartHandler.createCart) // Ruta POST para agregar un producto al carrito de compras
cartRouter.post( '/buy-cart', cartHandler.buyToCart)
cartRouter.post( '/cancel-cart', cartHandler.cancelToCart)
cartRouter.post( '/buy-success', cartHandler.buySuccessCart)
cartRouter.delete( '/', cartHandler.removeFromCart ) // Ruta DELETE para eliminar un producto del carrito de compras

module.exports = cartRouter
