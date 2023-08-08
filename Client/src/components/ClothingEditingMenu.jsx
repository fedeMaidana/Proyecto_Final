import { useState } from "react"
import { SelectSize } from "./SelectSize"
import { SelectColor } from "./SelectColor"

export function ClothingEditingMenu(){
    const [ currentPage, setCurrentPage ] = useState( 1 )

    return (
        <>
            {currentPage === 1 && (
                <SelectSize currentPage={ currentPage } setCurrentPage={ setCurrentPage } />
            )}

            {currentPage === 2 && (
                <SelectColor currentPage={ currentPage } setCurrentPage={ setCurrentPage } />
            )}
            
        </>
    )
}