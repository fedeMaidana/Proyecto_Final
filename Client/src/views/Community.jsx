import CardsContainer from "../components/CardsContainer"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../redux/actions"

export function Community () {
    const dispatch = useDispatch();
    const productos = useSelector((state)=> state.products);

    useEffect(() => {
        dispatch(getPokemons());
      }, [dispatch]);

    return(
        <>
        <CardsContainer />
        </>
    )
}

export default Community;