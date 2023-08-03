const {Router} = require("express");
const mainRouter = Router();
const cartRouter = require('./CartRutes.js')



mainRouter.use("/shopping_cart", cartRouter);



module.exports = mainRouter;