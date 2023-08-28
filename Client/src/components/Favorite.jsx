import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, deleteFavorite, getFavorites, getUsers } from '../redux/actions'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { checkIsFavorite } from '../auxFunctions/isFavorite'

const FavoriteButton = ( { productId, userId, token, googleToken } ) => {
  const dispatch = useDispatch()

  const favorites = useSelector( state => state.favorites )
  const allUsers = useSelector( state => state.allUsers )

  useEffect(() => {
  const userId = localStorage.getItem( 'userId' )

  dispatch( getFavorites( userId ) )
  }, [])

  const isFavorite = checkIsFavorite( productId, favorites )

  const productFavoriteCount = allUsers.reduce(( count, user ) => {
    return(
      count + user?.FavoriteProducts?.filter( favorite => favorite.Favorite.ProductId === productId ).length
    )
  }, 0)


  const handleFavoriteToggle = async () => {
    if( !token || !googleToken ) return

    if( isFavorite ){
      const favoriteToDelete = favorites.find( favorite => favorite.Favorite.ProductId === productId )

      if( favoriteToDelete ){
        await dispatch( deleteFavorite( favoriteToDelete.Favorite.id ) )
        dispatch( getFavorites( userId ) )
        dispatch( getUsers() )
      }

    }else{
      await dispatch( addFavorite( userId, productId ) )
      dispatch( getFavorites(userId ) )
      dispatch( getUsers() )
    }
  }

  return(
    <>
      <div className='w-[50px] bg-white border flex items-center justify-center gap-[10px] py-[3px] rounded-full'>
        <button
          onClick={ handleFavoriteToggle }
          className={ `${ isFavorite ? 'text-[#ff0000]' : 'text-gray-800' } transition-all hover:bg-opacity-80`}
        >
          {isFavorite
            ? (
              <MdFavorite className="text-[2rem]" type="button" />
            )
            : (
              <MdFavoriteBorder className="text-[2rem]" type="button" />
            )
          }
        </button>

        <span className='text-[1.2rem] font-semibold transform translate-y-[-1px]'>{ productFavoriteCount }</span>
      </div>
    </>
  )
}

export default FavoriteButton
