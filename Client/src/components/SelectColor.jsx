import { useDispatch } from "react-redux"
import { handleColor } from "../handlers/handlers"
import { NavMenuCanvas } from "./NavMenuCanvas"

const colors = [ '#b9b9b9', '#d34c4c', '#c3538c', '#8049bd', '#4962bd', '#49adbd', '#6ab561', '#b6bd49', '#bd7f49', '#313131' ]

export function SelectColor( { currentPage, setCurrentPage } ){
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
                <NavMenuCanvas name={ 'Color' } currentPage={ currentPage } setCurrentPage={ setCurrentPage } page={ 1 } />
                <div className="flex gap-[10px]">
                    {colors.map( color => (
                        <div
                            key={ color }
                            className="
                                h-[40px]
                                w-[40px]
                                rounded-full
                                transition-transform
                                duration-600
                                ease-in-out
                                hover:scale-[1.2]
                                cursor-pointer
                            "
                            style={ { backgroundColor: color } }
                            onClick={ () => handleColor( color, dispatch ) }
                        ></div>
                    ))}
                </div>
            </section>
        </>
    )
}