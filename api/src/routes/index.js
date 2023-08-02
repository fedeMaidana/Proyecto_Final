const {Router} = require("express");

const {getPruebaHandler} = require('../handlers/index.js');
const productRouter= require('./productRouter.js')


const mainRouter = Router();


mainRouter.get("/", getPruebaHandler);
mainRouter.use('/products',productRouter)




module.exports = mainRouter;