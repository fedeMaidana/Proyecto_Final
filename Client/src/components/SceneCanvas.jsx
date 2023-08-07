import { useSelector } from "react-redux"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import { selectModel } from "../auxFunctions/selectModel"

export function SceneCanvas( { position = [ 0, 0, 15 ], fov = 25, currentModel } ){
    const clothingColor = useSelector( state => state.clothingColor )

    let Model = selectModel( currentModel )

    return(
        <Canvas
            shadows
            eventSource={ document.getElementById( 'root' ) }
            eventPrefix="client"
            camera={ { position, fov } }
            className="h-full w-full bg-[#f6f6f6]"
        >
            <ambientLight intensity={ 0.5 } />
            <Environment preset="city" />
            <Center>
                <Model clothingColor={ clothingColor } />
            </Center>
            <OrbitControls minDistance={ 12 } maxDistance={ 12 } />
        </Canvas>
    )
}