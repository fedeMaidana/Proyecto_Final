import { NavLink } from "react-router-dom"

export const Home = () => {
    return(
        <>
        <div className="h-[100%] w-[100%] flex items-center justify-center gap-[10px]">
            <NavLink to="/Customize" className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]">shirt</NavLink>
            <NavLink to="/Customize" className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]">jean</NavLink>
            <NavLink to="/Customize" className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]">hooded</NavLink>
            <NavLink to="/Customize" className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]">dress</NavLink>
            <NavLink to="/Customize" className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]">jacket</NavLink>
            <NavLink to="/Customize" className="flex items-center justify-center h-[200px] w-[200px] bg-[#174ebb] text-[4rem]">t-shirt</NavLink>
        </div>

        </>
    )
}
