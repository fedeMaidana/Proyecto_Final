const {Router} = require("express");

const { userRoutes } = require('./userRoutes');
const productRouter= require('./productRouter.js');


const mainRouter = Router();


mainRouter.use('/', userRoutes);
mainRouter.use('/products',productRouter)



module.exports = mainRouter;