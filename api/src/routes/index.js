const {Router} = require("express");

const {getPruebaHandler} = require('../handlers/productsHandler');
const productRouter= require('./productRouter.js')


const mainRouter = Router();



mainRouter.use('/products',productRouter)




module.exports = mainRouter;