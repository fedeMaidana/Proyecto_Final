import Card from "./Card";
import { useSelector } from "react-redux";

const CardsContainer = () => {
    // const productos = useSelector((state)=> state.allProducts)
    // if(!productos){
    //     return <div>Cargando productos...</div>;
    // }
    // return(
    //    <Card
    //    key={productos.id}
    //    id={productos.id}
    //    name={productos.name}
    //    image={productos.image}
    //    types={productos.types}
    //    />
    // )
    return(
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-96">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    )
}

export default CardsContainer;