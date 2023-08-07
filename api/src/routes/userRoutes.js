const {Router} = require("express");
const { getUsersHandler, registerHandler, getUserIDHandler, loginHandler, deleteHandler } = require('../handlers/usersHandler');


const userRoutes = Router();


userRoutes.get("/users", getUsersHandler);
userRoutes.get("/users/:id", getUserIDHandler);
userRoutes.post("/register", registerHandler);
userRoutes.post("/login", loginHandler);
userRoutes.put("/deleteuser/:id", deleteHandler);



module.exports = {
    userRoutes
}