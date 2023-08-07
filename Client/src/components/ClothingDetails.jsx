import { useSelector } from "react-redux"
import { basePriceByModel } from "../auxFunctions/basePriceByModel"

export function ClothingDetails( { currentModel } ){
    const clothingColor = useSelector( state => state.clothingColor )
    const clothingSize = useSelector( state => state.clothingSize )

    let price = basePriceByModel( currentModel )

    return(
        <>
            <div
                className="
                    absolute
                    border-[1px]
                    top-[35%]
                    left-[12.5px]
                    flex
                    flex-col
                    justify-center
                    p-10
                    gap-[30px]
                    text-[2rem]
                    font-semibold
                    bg-[#fff]
                    rounded-[10px]
                "
            >
                <p>
                    Precio:
                    <span className="pl-[10px] text-gray-400">$ { price }</span>
                </p>
                <p>
                    Talle:
                    <span className="pl-[10px] text-gray-400" >{ clothingSize }</span>
                </p>
                <p>
                    Color:
                    <span
                        className={ `absolute h-[20px] w-[20px] rounded-full bottom-[30px] right-[45px]` }
                        style={ { backgroundColor: clothingColor } }
                    >
                    </span>
                </p>
            </div>
        </>
    )
}