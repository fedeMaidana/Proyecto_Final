import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setModal } from "../redux/actions"

export function HeaderCanvas(){
    const dispatch = useDispatch()

    return(
        <>
            <header className="flex h-full justify-between items-center" >
                <div className="flex items-center gap-[20px]">
                    <NavLink to="/home" className=" p-4 bg-[#ffffff] rounded-full border-[1px] border-[#e6e6e6]">
                        <svg width="20" height="20" viewBox="0 0 32 49" fill="none" className="rotate-[270deg]">
                            <path d="M1 20L16 1M16 1L31 20M16 1V49" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </NavLink>
                    <h2 className="text-[2rem] font-semibold" >$ 10</h2>
                </div>
                <div className="flex flex-row gap-[10px]">
                    <button
                        className="
                            w-[100px]
                            h-[40px]
                            bg-[#ffffff]
                            p-5 flex
                            items-center
                            justify-center
                            rounded-full
                            text-[1.5rem]
                            font-semibold
                            border-[1px]
                        "
                        onClick={ () => dispatch( setModal( true ) ) }
                    >
                        Finalizar
                    </button>
                </div>
            </header>
        </>
    )
}