export const NavMenuCanvas = ( { name, currentPage, setCurrentPage, page } ) => {
    return(
        <>
            <div className="w-[30%] flex justify-around text-[1.5rem] font-semibold pt-[10px]">
                <button onClick={ () => setCurrentPage( page ) } >
                    <svg width="15" height="15" viewBox="0 0 12 22" fill="none">
                        <path d="M11 21L1 11L11 1" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </svg>
                </button>
                <p className="text-gray-400 text-[2rem]"><span className="text-black">{ name } </span>{ currentPage }/2</p>
                <button onClick={ () => setCurrentPage( page ) } className="rotate-180">
                    <svg width="15" height="15" viewBox="0 0 12 22" fill="none">
                        <path d="M11 21L1 11L11 1" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </svg>
                </button>
            </div>
        </>
    )
}