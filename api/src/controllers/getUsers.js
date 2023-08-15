const { User } = require( '../db' )
const { Product } = require( '../db' )

const getUsers = async () => {
    try {
        const dataBaseUsers = await User.findAll({
            where: { estado: 1 },
            include: 
                { model: Product, as: 'CreatedProducts' }
        });

        const usersWithoutPassword = dataBaseUsers.map(user => {
            const { password, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        });
        console.log(usersWithoutPassword)
        return [...usersWithoutPassword]; 
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};
module.exports = { getUsers }