const { Favorite, User, Product } = require('../db');

const FavoriteControllers = {
    addFavorite: async (userId, productId) => {
      try {
        console.log(userId, productId);
        if (!userId || !productId) {
          throw new Error("Faltan datos");
        }
  
        const user = await User.findByPk(userId);
        if (!user) {
          throw new Error("Usuario no encontrado");
        }
  
        const product = await Product.findByPk(productId);
        if (!product) {
          throw new Error("Producto no encontrado");
        }
  
        const favorite = await Favorite.create({
          UserId: userId, // Accede a la propiedad 'id' del objeto 'user'
          ProductId: productId,
        });
  
        return { message: "Agregado a favoritos", favorite };
      } catch (error) {
        console.error(error)
        throw new Error("No se pudo agregar a favoritos");
      }
    },
  
    deleteFavorite: async (favoriteId) => {
      try {

        console.log(favoriteId)
        // Buscar el favorito por su ID en la base de datos
        const favorite = await Favorite.findByPk(favoriteId);
  
        // Si no se encuentra el favorito, lanzar un error
        if (!favorite) {
          throw new Error('Favorito no encontrado');
        }
  
        // Eliminar el favorito de la base de datos
        await favorite.destroy();
  
        return { message: 'Favorito eliminado con éxito' };
      } catch (error) {
        console.error(error)
        throw new Error('No se pudo eliminar el favorito');
      }
    },
  
    getFavorites: async (userId) => {
      try {
        const user = await User.findByPk(userId);
    
        if (!user) {
          throw new Error("Usuario no encontrado");
        }
    
        const favorites = await user.getFavoriteProducts({
          attributes: ['id', 'name', 'description', 'price', 'images', 'color', 'size', 'stock'],
        });
    
        console.log(favorites)
        return favorites;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    
    
  };
  
  module.exports = FavoriteControllers;