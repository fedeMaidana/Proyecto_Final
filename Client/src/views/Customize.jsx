import { useParams } from "react-router-dom"
import { SceneCanvas } from "../components/SceneCanvas"
import { ClothingEditingMenu } from "../components/ClothingEditingMenu"
import { HeaderCanvas } from "../components/HeaderCanvas"
import { ModalCustomize } from "../components/ModalCustomize"
import { ClothingDetails } from "../components/ClothingDetails"

export function Customize() {
    const { model } = useParams()

    return(
        <>
            <div className="w-[100%] h-[100%] flex flex-col justify-between">
                <div className="h-[15%] w-[100%] p-5 bg-[#f6f6f6]">
                    <HeaderCanvas/>
                </div>
                <div className="w-[100%] h-[70%]">
                    <SceneCanvas currentModel={ model } />
                </div>
                <div className="h-[15%] w-[100%]">
                    <ClothingEditingMenu/>
                </div>
            </div>

            <ClothingDetails currentModel={ model } />

            <ModalCustomize/>
        </>
    )
}