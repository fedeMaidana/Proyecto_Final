const { getUsers } = require('../controllers/getUsers');
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');






const getUsersHandler = async (req, res) => {

    const users = await getUsers();
    res.status(200).send(users)
};




const getUserIDHandler = async (req, res) => {

    const { id } = req.params;

    const totalUsers = await getUsers();
    
    if(id) {
        const recipesID = totalUsers.filter(el => el.id == id)
        recipesID.length ?
        res.status(200).json(recipesID):
        res.status(400).json("there is no user with that ID");
    }
};




const registerHandler = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const result = await register(name, email, password);

        res.json(result);

    } catch (error) {
        console.error(error);

        res.json({ error: 'Error trying to register' });
    }
};




const loginHandler = async (req, res) => {

    const { email, password } = req.body;


    try {
        const result = await login(email, password);

        res.json(result);

    } catch (error) {
        console.error(error);

        res.json({ error: 'Error trying to log in' });
    }

};
    
    
    
    
    
    
module.exports = {
    getUsersHandler, 
    registerHandler,
    getUserIDHandler,
    loginHandler
}