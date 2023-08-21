const { User, Product, Favorite  } = require( '../db' )

const getUsers = async () => {
    try {
        const dataBaseUsers = await User.findAll({
            where: { estado: 1 },
            include:
                { model: Product, as: 'CreatedProducts' },
                
            
        });

        const usersWithFavorites = await Promise.all(dataBaseUsers.map(async user => {
            const { password, ...userWithoutPassword } = user.toJSON();

            const favorites = await user.getFavoriteProducts({
                attributes: ['id', 'name', 'description', 'price', 'images', 'color', 'size', 'stock'],
            });

            return {
                ...userWithoutPassword,
                FavoriteProducts: favorites
            };
        }));

        console.log(usersWithFavorites);
        return usersWithFavorites;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};
module.exports = { getUsers }