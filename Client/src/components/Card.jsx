import { Link } from "react-router-dom"

export const Card = ({ image, name, id }) => {
    return (
        <div>
            <div>
                <img src={image} alt={name} />
            </div>
            <div>
                <p>{name}</p>
            </div>
            <button>
                <Link to={`detail/${id}`}>Detalle</Link>
            </button>
        </div>
    )
}