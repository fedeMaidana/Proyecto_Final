const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require( 'morgan' )
const mainRouter = require( './routes/index' )
const session = require('express-session'); // Agregamos express-session
const passport = require('passport');

const server = express()

server.use(cors());
server.use( morgan( 'dev' ) )
server.use( cookieParser() )
server.use( express.json( { limit: '300mb' } ) )
server.use( ( _req, res, next ) => {
    res.header( 'Access-Control-Allow-Origin', '*' )
    res.header( 'Access-Control-Allow-Credentials', 'true' )
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' )
    res.header( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE' )

    next()
  })

  // Configuración de express-session
server.use(
  session({
    secret: process.env.SECRET_KEY_SESSION, // Cambia esto a una cadena de caracteres segura
    resave: true,
    saveUninitialized: true,
  })
);

// Inicialización de Passport
server.use(passport.initialize());
server.use(passport.session());

server.use("/",mainRouter)
server.use('/upload', express.static(path.join(__dirname, 'upload')))


server.use( ( err, _req, res, _next ) => {
    const status = err.status || 500
    const message = err.message || err

    console.error( err )

    res.status( status ).send( message )
  })

module.exports = server