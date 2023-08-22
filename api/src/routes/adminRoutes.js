const { Router } = require( 'express' );
// const authMiddleware = require( '../middleware/authMiddleware' )
const adminMiddleware = require( '../middleware/adminMiddleware' )

const {  deleteHandler } = require( '../handlers/usersHandler' )
const { changeRole } = require('../handlers/adminHandlers')


const adminRoutes = Router()



adminRoutes.put( '/users/:id/change-role', adminMiddleware, changeRole)  
adminRoutes.put( '/users/:id/ban', adminMiddleware, deleteHandler )



module.exports = { adminRoutes }