const { User } = require('../db')


const getUsers = async () => {

    
    const dataBaseUsers = await User.findAll();

    return [...dataBaseUsers]
};





module.exports = {
    getUsers,
}