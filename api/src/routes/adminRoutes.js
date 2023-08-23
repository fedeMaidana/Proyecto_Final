const { Router } = require( 'express' );
const authMiddleware = require( '../middleware/authMiddleware' )
const adminMiddleware = require( '../middleware/adminMiddleware' )
const cartHandler = require('../handlers/ShoppingCartHandlers')
const { getUsersHandler, deleteHandler } = require( '../handlers/usersHandler' )
const { changeRole } = require('../handlers/adminHandlers')



const adminRoutes = Router()


adminRoutes.get( '/users', getUsersHandler )

adminRoutes.get( '/shopping-cart', /*adminMiddleware,*/ cartHandler.getShoppingCart )
adminRoutes.put( '/users/:id/change-role', /*adminMiddleware,*/ changeRole)  
adminRoutes.put( '/users/:id/ban', /*adminMiddleware,*/ deleteHandler )
adminRoutes.post('/state-cart', cartHandler.adminCartHandlers )




module.exports = { adminRoutes }