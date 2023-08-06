import { Link } from "react-router-dom";

const Card = (props) => {
    return(
        <div>
            <div><img srx={props.image} alt={props.name} /></div>
            <div><p>{props.name}</p></div>
            <button className={style.buttonLink}>
            <Link to={`detail/${props.id}`}>Detalle</Link>
            </button>
        </div>
    )
}

export default Card;