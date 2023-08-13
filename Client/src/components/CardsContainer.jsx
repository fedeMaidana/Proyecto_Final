import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "./Card"
import { getUsers, getProducts } from "../redux/actions"

export const CardsContainer = () => {
    const dispatch = useDispatch()

    const allUsers = useSelector( state => state.allUsers )
    const allProducts = useSelector( state => state.allProducts )
    console.log(allUsers)

    useEffect( () => {
        dispatch( getUsers() )
        dispatch( getProducts() )
    }, [ dispatch ] )

    return(
        <>
            {allUsers?.map(user => (
                user.Products?.map(product => (
                    <Card
                        key={ product.id }
                        id= { product.id }
                        name={ user.name }
                        nameProduct={ product.name }
                        description={ product.description }
                        images={ product.images }
                        price={ product.price }
                    />
                ))
            ))}
        </>
    )
}