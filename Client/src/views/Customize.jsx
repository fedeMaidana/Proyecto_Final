import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { SceneCanvas } from "../components/SceneCanvas"
import { ClothingEditingMenu } from "../components/ClothingEditingMenu"
import { HeaderCanvas } from "../components/HeaderCanvas"
import { ModalCustomize } from "../components/ModalCustomize"
import { ClothingDetails } from "../components/ClothingDetails"
import { basePriceByModel } from "../auxFunctions/basePriceByModel"
import { setColor, setDescription, setSize, setTitle, clearImages } from "../redux/actions"

export function Customize() {
    const { model } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch( setColor( '' ) )
        dispatch( setDescription( '' ) )
        dispatch( setSize( '' ) )
        dispatch( setTitle( 'Diseño sin titulo' ) )
        dispatch( clearImages() )
    }, [])

    let price = basePriceByModel( model )

    return(
        <>
            <div className="w-[100%] h-[100%] flex flex-col justify-between">
                <div className="h-[15%] w-[100%] p-5 bg-[#f6f6f6]">
                    <HeaderCanvas/>
                </div>
                <div className="w-[100%] h-[70%] capture-container">
                    <SceneCanvas currentModel={ model } />
                </div>
                <div className="h-[15%] w-[100%]">
                    <ClothingEditingMenu/>
                </div>
            </div>

            <ClothingDetails price={ price } />

            <ModalCustomize price={ price } currentModel={ model } />
        </>
    )
}