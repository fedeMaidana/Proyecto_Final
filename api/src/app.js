const express = require('express');

const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const mainRouter = require('./routes/index')

const server = express();

server.use(morgan("dev"));

server.use(cookieParser());
server.use(express.json({ limit: '50mb' }));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

server.use("/",mainRouter)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

<<<<<<< HEAD
=======
server.use(express.json());

server.use('/', mainRouter);

>>>>>>> b988bff30f863a47a6f3cdd2de374cbedb72ed74



module.exports = server;