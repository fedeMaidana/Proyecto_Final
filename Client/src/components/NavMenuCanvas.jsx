import { IconPreviousArrow, IconNextArrow } from "../assets/icons/icons"

export const NavMenuCanvas = ( { name, currentPage, setCurrentPage, page } ) => {
    return(
        <>
            <div className="w-[30%] flex justify-around text-[1.5rem] font-semibold pt-[10px]">
                <button onClick={ () => setCurrentPage( page ) } >
                    <IconPreviousArrow/>
                </button>
                <p className="text-gray-400 text-[2rem]"><span className="text-black">{ name } </span>{ currentPage }/2</p>
                <button onClick={ () => setCurrentPage( page ) } className="rotate-180">
                    <IconNextArrow/>
                </button>
            </div>
        </>
    )
}