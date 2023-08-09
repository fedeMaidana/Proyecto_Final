const {Router} = require("express");
const { getUsersHandler, registerHandler, getUserIDHandler, loginHandler, deleteHandler } = require('../handlers/usersHandler');

const authMiddleware = require('../middleware/authMiddleware')

const userRoutes = Router();


userRoutes.get("/users", getUsersHandler);
userRoutes.get("/user", authMiddleware, getUserIDHandler);
userRoutes.post("/register", registerHandler);
userRoutes.post("/login", loginHandler);
userRoutes.put("/deleteuser/:id", deleteHandler);



module.exports = {
    userRoutes
}