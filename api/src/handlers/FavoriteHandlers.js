const FavoriteControllers = require ('../controllers/FavoritesControllers');

const FavoriteHandlers ={
    handleAddFavorite: async (req, res) => {
        try {
          const { userId, productId } = req.body
          const result = await FavoriteControllers.addFavorite(userId, productId);
          res.status(201).json(result);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      
      handleDeleteFavorite: async (req, res) => {
        try {
          const {favoriteId} = req.params
          const result = await FavoriteControllers.deleteFavorite(favoriteId);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      
      handleGetFavorites: async (req, res) => {
        try {
          const {userId} = req.params;
          const favorites = await FavoriteControllers.getFavorites(userId);
          res.status(200).json(favorites);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
}

module.exports = FavoriteHandlers