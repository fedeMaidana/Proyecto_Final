import { useDispatch } from "react-redux"
import { handleColor } from "../handlers/handlers"

const colors = [ '#b9b9b9', '#d34c4c', '#c3538c', '#8049bd', '#4962bd', '#49adbd', '#6ab561', '#b6bd49', '#bd7f49', '#313131' ]

export function SelectColor( { setCurrentPage } ){
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
                    border-t-[1px]
                "
            >
                <button onClick={ () => setCurrentPage( 1 ) } >Anterior</button>
                <div className="flex gap-[10px]">
                    {colors.map( color => (
                        <div
                            key={ color }
                            className="
                                h-[40px]
                                w-[40px]
                                rounded-full
                                border-2
                                border-white
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