import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite, getFavorites } from '../redux/actions';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { checkIsFavorite } from '../auxFunctions/isFavorite';

const FavoriteButton = ({ productId, userId }) => {
  const favorites = useSelector(state => state.favorites);
  const allUsers = useSelector(state => state.allUsers); //Me traigo para el counter de fav
  const dispatch = useDispatch();
  useEffect(() => {
   const userId = localStorage.getItem('userId');
     dispatch(getFavorites(userId));
  }, []);
  
  const isFavorite = checkIsFavorite(productId, favorites);


  //contador de favoritos
  const productFavoriteCount = allUsers.reduce((count, user) => {
    return (
      count +
      user.favoriteProducts.filter(
        favorite => favorite.Favorite.ProductId === productId
      ).length
    );
  }, 0);


  const handleFavoriteToggle = async () => {
    
    if (isFavorite) {
      const favoriteToDelete = favorites.find(favorite => favorite.Favorite.ProductId === productId);
      console.log(favoriteToDelete)
      if (favoriteToDelete) {
        await dispatch(deleteFavorite(favoriteToDelete.Favorite.id));
        dispatch(getFavorites(userId));
      }
    } else {
      await dispatch(addFavorite(userId, productId));
      dispatch(getFavorites(userId)); // Assuming you have a way to get the user ID, here I'm using 1 as an example.
    }
  };

  return (
    <div>
      <button
        onClick={handleFavoriteToggle}
        className={`p-2 border ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-800'
        } rounded-lg transition-all hover:bg-opacity-80`}
      >
        {isFavorite ? (
          <MdFavorite className="text-xl" type="button" />
        ) : (
          <MdFavoriteBorder className="text-xl" type="button" />
        )}
      </button>
        <span className="ml-1">{productFavoriteCount}</span>
    </div>
  );
};

export default FavoriteButton;
