import { useSelector } from "react-redux"
import { Card } from "./Card"

export const CardsContainer = () => {
    const products = useSelector( state => state.allProducts )

    if( !products ) return <div>Cargando productos...</div>

    return(
        <Card
            key={ products.id }
            id={ products.id }
            name={ products.name }
            image={ products.image }
            types={ products.types }
        />
    )
}