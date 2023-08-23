const { Router } = require( 'express' );
// const authMiddleware = require( '../middleware/authMiddleware' )
const adminMiddleware = require( '../middleware/adminMiddleware' )

const { getUsersHandler, deleteHandler } = require( '../handlers/usersHandler' )
const { changeRole } = require('../handlers/adminHandlers')


const adminRoutes = Router()


adminRoutes.get( '/users', getUsersHandler )
adminRoutes.put( '/users/:id/change-role', changeRole)  
adminRoutes.put( '/users/:id/ban', deleteHandler )



module.exports = { adminRoutes }