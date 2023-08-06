import { Link } from "react-router-dom"

export const Card = () => {
    return(
        // <div>
        //     <div><img srx={props.image} alt={props.name} /></div>
        //     <div><p>{props.name}</p></div>
        //     <button>
        //     <Link to={`detail/${props.id}`}>Detalle</Link>
        //     </button>
        // </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div>
          <p className="text-3xl font-bold">Imagen</p>
        </div>
        <div>
          <p className="text-2xl">Name</p>
        </div>
        <button className="mt-8">
          <Link to="/detail">Detalle</Link>
        </button>
      </div>
    )
}

