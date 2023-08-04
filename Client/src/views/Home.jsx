import { NavLink } from "react-router-dom";
const Home = () => {
    return(
        <>
            <h1>Home</h1>
            <NavLink to= "/CustomCraft">
                <button>CustomCraft</button>
            </NavLink>
            <NavLink to="/Buy">
                <button>Buy</button>
            </NavLink>
            <NavLink to="/Login">
                <button>Login</button>
            </NavLink>
            <NavLink to="/Search">
                <button>Search</button>
            </NavLink>
        </>
    )
}
export default Home
