import CardsContainer from "../components/CardsContainer"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../redux/actions"

export function Community () {
    // const dispatch = useDispatch();
    // const productos = useSelector((state)=> state.products);

    // useEffect(() => {
    //     dispatch(getProducts());
    //   }, [dispatch]);

    return(
        
        <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CardsContainer />
      </div>
    </div>
     
        
    )
}

export default Community;