const express = require( 'express' )
const favoritesHandlers = require( '../handlers/FavoriteHandlers' )

const favoriteRouter = express.Router()

favoriteRouter.get( '/', favoritesHandlers.handleGetFavorites )
favoriteRouter.get( '/:userId', favoritesHandlers.handleGetFavorites )

favoriteRouter.post( '/', favoritesHandlers.handleAddFavorite )

favoriteRouter.delete( '/:favoriteId', favoritesHandlers.handleDeleteFavorite)

module.exports = favoriteRouter