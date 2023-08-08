const { getUsers } = require('../controllers/getUsers');
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { deleteUser } = require('../controllers/deleteUser');






const getUsersHandler = async (req, res) => {

    const users = await getUsers();
    res.status(200).send(users)
};




const getUserIDHandler = async (req, res) => {

    const { id } = req.user; // lo q guardamos en el midleware

    const totalUsers = await getUsers();
    
    if(id) {
        const recipesID = totalUsers.filter(el => el.id == id)
        recipesID.length ?
        res.status(200).json(recipesID):
        res.status(400).json("No hay ningún usuario con ese ID");
    }
};




const registerHandler = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const result = await register(name, email, password);

        res.status(200).json(result);

    } catch (error) {
        console.error('Error al intentar registrarse: ', error);

        res.status(500).json({ error: 'server error' });
    }
};

 


const loginHandler = async (req, res) => {

    const { email, password } = req.body;


    try {
        const result = await login(email, password);

        res.status(200).json(result);

    } catch (error) {
        console.error('Error al intentar iniciar sesión: ', error);

        res.status(500).json({ error: 'server error' });
    }

};




const deleteHandler = async (req, res) => {

    const { id } = req.params;

    try {
        const result = await deleteUser(id);

        res.status(200).json(result)

    } catch (error) {
        console.error('Error al borrar el usuario: ', error);

        res.status(500).json({ error: 'server error' });
    }
};
    
    
    
    
module.exports = {
    getUsersHandler, 
    registerHandler,
    getUserIDHandler,
    loginHandler,
    deleteHandler
}
