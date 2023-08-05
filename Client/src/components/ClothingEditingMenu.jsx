import { useState } from "react"
import { SelectSize } from "./SelectSize"
import { SelectColor } from "./SelectColor"

export function ClothingEditingMenu(){
    const [ currentPage, setCurrentPage ] = useState( 1 )

    return (
        <>
            {currentPage === 1 && (
                <SelectSize setCurrentPage={ setCurrentPage } />
            )}

            {currentPage === 2 && (
                <SelectColor setCurrentPage={ setCurrentPage } />
            )}
        </>
    )
}