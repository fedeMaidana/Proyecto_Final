export const Pagination = ( { postsPerPage, totalPosts, paginate, currentPage } ) => {
    const pageNumbers = []

    for( let i = 1; i <= Math.ceil( totalPosts / postsPerPage ); i++ ){
        pageNumbers.push( i )
    }

    return(
        <ul className="flex gap-2 justify-center">
            {pageNumbers.map( number => (
                <li key={ number } className={ number === currentPage ? "font-bold text-[#33a1fd]" : "" }>
                    <button className="px-[10px] py-[5px] bg-white border rounded-[5px] text-[1.2rem]" onClick={ () => paginate( number ) }>{ number }</button>
                </li>
            ))}
        </ul>
    )
}