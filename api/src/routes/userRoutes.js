const { Router } = require( 'express' )
const { getUsersHandler, registerHandler, getUserIDHandler, loginHandler, deleteHandler } = require( '../handlers/usersHandler' )
const authMiddleware = require( '../middleware/authMiddleware' )
require('../passport/Auth.js')
const passport = require('passport');


const userRoutes = Router()

userRoutes.get( '/users', getUsersHandler )
userRoutes.get( '/user', authMiddleware, getUserIDHandler )
userRoutes.post( '/register', registerHandler )
userRoutes.post( '/login', loginHandler )
userRoutes.put( '/deleteuser/:id', deleteHandler )
userRoutes.get('/login/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route cuando google responde si es fallo en auth vuelve a login                                cambiar depende el puerto
userRoutes.get('/login/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), (req, res) => {
  // En caso de ser respuesta positiva lo lleva a home e inicia sesion
  res.redirect('http://localhost:5173/home'); // Cambiar la ruta depende de cada puerto
});

module.exports = { userRoutes }
