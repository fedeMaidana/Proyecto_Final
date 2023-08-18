const { Router } = require( 'express' )
const { registerHandler, getUserIDHandler, loginHandler } = require( '../handlers/usersHandler' )
const authMiddleware = require( '../middleware/authMiddleware' )
require('../passport/Auth.js')
const passport = require('passport');


const userRoutes = Router()


userRoutes.get( '/user', authMiddleware, getUserIDHandler )
userRoutes.post( '/register', registerHandler )
userRoutes.post( '/login', loginHandler )


userRoutes.get('/login/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for handling the Google callback after authentication
userRoutes.get('/login/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), (req, res) => {
  // Redirect the user to a success page or dashboard
  res.redirect('http://localhost:5173/home'); // Change this URL to your desired success route
});

module.exports = { userRoutes }
