const {Router} = require("express");
const mainRouter = Router();
const cartRouter = require('./CartRutes.js')
const categoryRouter = require('./categoryRutes.js')



mainRouter.use("/shopping_cart", cartRouter);
mainRouter.use("/categories", categoryRouter);



module.exports = mainRouter;