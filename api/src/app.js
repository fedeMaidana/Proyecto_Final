const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require( 'morgan' )
const mainRouter = require( './routes/index' )

const server = express()

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

server.use("/",mainRouter)
server.use('/upload', express.static(path.join(__dirname, 'upload')));


server.use( ( err, _req, res, _next ) => {
    const status = err.status || 500
    const message = err.message || err

    console.error( err )

    res.status( status ).send( message )
  })

module.exports = server