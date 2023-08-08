const {Router} = require("express");

const { userRoutes } = require('./userRoutes');
const productRouter= require('./productRouter.js');
const filterRouter = require('./filterRutes')
const paymentRouter = require('./paymentRoutes')

const mainRouter = Router();
const cartRouter = require('./CartRutes.js')
const categoryRouter = require('./categoryRutes.js')

mainRouter.use(paymentRouter)

mainRouter.use("/shopping_cart", cartRouter);

mainRouter.use("/categories", categoryRouter);

mainRouter.use('/', userRoutes);

mainRouter.use('/products',productRouter);

mainRouter.use('/filter', filterRouter);



module.exports = mainRouter;