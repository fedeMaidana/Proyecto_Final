export const checkIsFavorite = (productId, favorites) => {
    return favorites.some(favorite => favorite.Favorite && favorite.Favorite.ProductId === productId);
  };
  