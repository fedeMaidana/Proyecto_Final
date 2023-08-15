const express = require( 'express' )
const favoritesHandlers = require( '../handlers/FavoriteHandlers' )

const favoriteRouter = express.Router()

favoriteRouter.get( '/', favoritesHandlers.handleGetFavorites )
favoriteRouter.get( '/:id', favoritesHandlers.handleGetFavorites )

favoriteRouter.post( '/', favoritesHandlers.handleAddFavorite )

favoriteRouter.delete( '/:id', favoritesHandlers.handleDeleteFavorite)

module.exports = favoriteRouter