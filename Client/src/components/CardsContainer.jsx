import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "./Card"
import { getUsers } from "../redux/actions"

export const CardsContainer = ( { currentPosts } ) => {
  const dispatch = useDispatch()

  useEffect( () => {
      dispatch( getUsers() )
  }, [])

  const allUsers = useSelector( state => state.allUsers )
  const allUsersHaveNoProducts = allUsers.every( user => user?.CreatedProducts?.length === 0 )
  return(
    <>
      {currentPosts.map(post => {
        const user = allUsers.find( user => user?.id === post?.userId )

        return(
          <Card
            key={ post?.id }
            id={ post?.id }
            name={ user?.userName }
            nameProduct={ post?.name }
            description={ post?.description }
            images={ post?.images }
            price={ post?.price }
            stock={ post?.stock }
            color={ post?.color }
            size={ post?.size }
            category={ post?.category }
            profileImage={ user?.profileImage }
          />
        )
      })}

      { allUsersHaveNoProducts && <div><h2>Aun no hay publicaciones que mostrar, se el primero en realizar una publicación</h2></div> }
    </>
  )
}