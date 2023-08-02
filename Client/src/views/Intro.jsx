import { NavLink } from "react-router-dom"

const Intro = () => {
    return(
        <>
            <h1>Custom Craft</h1>
            
            <NavLink to="/home">
                  <button>
                    Explore
                  </button>
            </NavLink>
        
        </>
    )
}
export default Intro;