const {Router} = require("express");
const { userRoutes } = require('./userRoutes')



const mainRouter = Router();


mainRouter.use('/', userRoutes);


module.exports = mainRouter;