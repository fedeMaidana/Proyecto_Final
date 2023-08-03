import { SceneCanvas } from "../components/SceneCanvas"
import { ClothingEditingMenu } from "../components/ClothingEditingMenu"
import { HeaderCanvas } from "../components/HeaderCanvas"

export function Customize() {
    return(
        <>
            <div className="w-[100%] h-[100%] flex flex-col justify-between">
                <div className="h-[10%] w-[100%] p-5 border-b-[1px]">
                    <HeaderCanvas/>
                </div>
                <div className="w-[100%] h-[80%]">
                    <SceneCanvas/>
                </div>
                <div className="h-[10%] w-[100%]">
                    <ClothingEditingMenu/>
                </div>
            </div>
        </>
    )
}