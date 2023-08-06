import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../redux/actions"
import { CardsContainer } from "../components/CardsContainer"

export function Community () {
    const dispatch = useDispatch()
    const products = useSelector((state)=> state.products)

    useEffect(() => {
        dispatch( getProducts() )
    }, [ dispatch ])

    return(
        <>
            <CardsContainer />
        </>
    )
}