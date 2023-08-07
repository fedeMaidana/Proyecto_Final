const { User } = require('../db')


const getUsers = async () => {
    const dataBaseUsers = await User.findAll({
        where: { estado: 1 }
    });

    return [...dataBaseUsers]
};

module.exports = {
    getUsers,
}