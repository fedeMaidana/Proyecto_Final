import { useSelector } from "react-redux"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import { TShirt } from "../clothes/TShirt"
import { Shirt } from "../clothes/Shirt"
import { Pant } from "../clothes/Pant"
import { Dress } from "../clothes/Dress"
import { Jacket } from "../clothes/Jacket"
import { Hooded } from "../clothes/Hooded"

export function SceneCanvas( { position = [ 0, 0, 15 ], fov = 25 } ){
    const clothingColor = useSelector( state => state.clothingColor )

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
                <Hooded clothingColor={ clothingColor } />
            </Center>
            <OrbitControls minDistance={ 12 } maxDistance={ 12 } />
        </Canvas>
    )
}