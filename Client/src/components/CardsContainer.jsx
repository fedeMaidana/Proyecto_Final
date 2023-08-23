import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "./Card"
import { getUsers } from "../redux/actions"

export const CardsContainer = () => {
  const dispatch = useDispatch()

  useEffect( () => {
      dispatch( getUsers() )
  }, [])

  const allUsers = useSelector( state => state.allUsers )
  const allUsersHaveNoProducts = allUsers.every( user => user.CreatedProducts.length === 0 )

  return (
    <>
      {allUsers?.map( user => (
        user.CreatedProducts.map( product => (
          <Card
            key={ product.id }
            id={ product.id }
            name={ user.name }
            nameProduct={ product.name }
            description={ product.description }
            images={ product.images }
            price={ product.price }
            stock= { product.stock }
            color= { product.color }
            size= { product.size }
            category= { product.category }
          />
        ))
      ))}

      { allUsersHaveNoProducts && <div><h2>Ups! No tenemos productos con esa especificación</h2></div> }
    </>
  )
}