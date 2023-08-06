import { NavLink } from "react-router-dom"

export const Home = () => {
    return(
        <>
        <div className="h-[100%] w-[100%] flex items-center justify-center gap-[10px]">
            <NavLink
                to="/Customize/TShirt"
                className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]"
            >
                Remera
            </NavLink>

            <NavLink
                to="/Customize/Pant"
                className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]"
            >
                Pantalon
            </NavLink>

            <NavLink
                to="/Customize/Hooded"
                className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]"
            >
                Buzo
            </NavLink>

            <NavLink
                to="/Customize/Dress"
                className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]"
            >
                Vestido
            </NavLink>

            <NavLink
                to="/Customize/Jacket"
                className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]"
            >
                Campera
            </NavLink>

            <NavLink
                to="/Customize/Shirt"
                className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]"
            >
                Camisa
            </NavLink>
        </div>

        </>
    )
}
