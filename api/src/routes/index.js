const {Router} = require("express");

const {getPruebaHandler} = require('../handlers/index.js');



const mainRouter = Router();


mainRouter.get("/", getPruebaHandler);




module.exports = mainRouter;