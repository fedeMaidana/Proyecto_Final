const { Router } = require('express');
const passport = require('../passport/Auth.js'); // Importa la instancia de Passport que configuraste en Auth.js


const { registerHandler, getUserIDHandler, loginHandler,updateHandler } = require('../handlers/usersHandler');

const authMiddleware = require('../middleware/authMiddleware');
const getUserDetails = require('../handlers/loginGoogle.js')
const { upload } = require( '../controllers/register.js' )

const userRoutes = Router();


userRoutes.get('/user', authMiddleware, getUserIDHandler);
userRoutes.post('/register',upload.single('profileImage'), registerHandler);
userRoutes.post('/login', loginHandler);
userRoutes.put('/updateuser/:id', updateHandler)




userRoutes.get('/user/google', authMiddleware, getUserDetails);

// Ruta de autenticación con Google
userRoutes.get('/login/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback después de la autenticación de Google
userRoutes.get('/login/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), (req, res) => {
  const googleToken = req.user.token;
  res.cookie('googleToken', googleToken, {
    // httpOnly: true,
    // // secure: false, // Asegúrate de que esto esté configurado correctamente en producción
    // sameSite: 'lax', // Asegúrate de que esto esté configurado correctamente en producción
  });

  console.log('Google Token Set:', googleToken); // Añade esta línea para verificar en la consola del servidor
  console.log('Cookies:', req.cookies); // Añade esta línea para verificar en la consola del servidor

  // Redirige al usuario a la página de inicio
  res.redirect('http://localhost:5173/home');
});


module.exports = { userRoutes };