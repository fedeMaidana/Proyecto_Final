const {Router} = require("express");

const { getUsersHandler, registerHandler, getUserIDHandler, loginHandler, deleteHandler } = require('../handlers/usersHandler');



const mainRouter = Router();


mainRouter.get("/users", getUsersHandler);
mainRouter.get("/users/:id", getUserIDHandler);
mainRouter.post("/register", registerHandler);
mainRouter.post("/login", loginHandler);
mainRouter.put("/deleteuser/:id", deleteHandler);


module.exports = mainRouter;