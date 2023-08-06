import { useDispatch } from "react-redux"
import { handleSize } from "../handlers/handlers"
import { NavMenuCanvas } from "./NavMenuCanvas"

const sizes = [ 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL' ]

export function SelectSize( { currentPage, setCurrentPage } ){
    const dispatch = useDispatch()

    return(
        <>
            <section
                key="custom"
                className="
                    flex
                    justify-around
                    flex-col
                    items-center
                    w-full
                    h-full
                    border-t-[1px]
                    bg-[#ffffff]
                "
            >
                <NavMenuCanvas name={ 'Talle' } currentPage={ currentPage } setCurrentPage={ setCurrentPage } page={ 2 } />
                <div className="flex flex-row gap-[10px]" >
                    {sizes.map( size => (
                        <div
                            key={ size }
                            className="
                                w-[40px]
                                h-[40px]
                                text-[1.4rem]
                                font-semibold
                                rounded-full
                                border-[1px]
                                border-[#e5e5e5]
                                flex items-center
                                justify-center
                                border-white
                                transition-transform
                                duration-600
                                ease-in-out
                                hover:scale-[1.2]
                                cursor-pointer
                            "
                            onClick={ () => handleSize( size, dispatch ) }
                        >{ size }</div>
                    ))}
                </div>
            </section>
        </>
    )
}