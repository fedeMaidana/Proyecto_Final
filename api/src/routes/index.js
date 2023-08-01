const {Router} = require("express");

const {getPrueba} = require('../controllers/getPrueba');



const mainRouter = Router();


mainRouter.get("/", getPrueba);




module.exports = mainRouter;