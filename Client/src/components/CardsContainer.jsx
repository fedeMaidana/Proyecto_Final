import Card from "./Card";
import { useSelector } from "react-redux";

const CardsContainer = (props) => {
    const productos = useSelector((state)=> state.allProducts)
    if(!productos){
        return <div>Cargando productos...</div>;
    }
    return(
       <Card
       key={productos.id}
       id={productos.id}
       name={productos.name}
       image={productos.image}
       types={productos.types}
       />
    )
}

export default CardsContainer;