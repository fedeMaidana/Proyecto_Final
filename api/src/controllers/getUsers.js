const { User, Product, Favorite  } = require( '../db' )
const { Op } = require('sequelize');

const getUsers = async (name) => {

    try {

        const whereCondition = name ? {
            [Op.or]: [
              {
                role: 'user',
                name: {
                  [Op.iLike]: `%${name.toLowerCase()}%`
                }
              },
              {
                role: 'admin',
                name: {
                  [Op.iLike]: `%${name.toLowerCase()}%`
                }
              }
            ]
          } : {
            role: {
              [Op.or]: ['user', 'admin']
            }
          };

          
        const dataBaseUsers = await User.findAll({
            where: whereCondition,
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