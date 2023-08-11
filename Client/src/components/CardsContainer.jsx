import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "./Card"
import { getUsers } from "../redux/actions"

export const CardsContainer = () => {
    const dispatch = useDispatch()

    const allUsers = useSelector( state => state.allUsers )

    useEffect( () => {
        dispatch( getUsers() )
    }, [ dispatch ] )

    return(
        <>
            {allUsers.map(user => (
                user.Products.map(product => (
                    <Card
                        key={ product.id }
                        name={ user.name }
                        nameProduct={ product.name }
                        description={ product.description }
                        images={ product.images }
                    />
                ))
            ))}
        </>
    )
}