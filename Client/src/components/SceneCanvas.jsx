import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import { setColor, setDescription, setSize, setTitle, clearImages } from "../redux/actions"
import { selectModel } from "../auxFunctions/selectModel"

export function SceneCanvas( { position = [ 0, 0, 15 ], fov = 25, currentModel } ){
    const dispatch = useDispatch()

    const clothingColor = useSelector( state => state.clothingColor )

    useEffect(() => {
        dispatch( setColor( '' ) )
        dispatch( setDescription( '' ) )
        dispatch( setSize( '' ) )
        dispatch( setTitle( 'Diseño sin titulo' ) )
        dispatch( clearImages() )
    }, [])

    let Model = selectModel( currentModel )

    return(
        <Canvas
            shadows
            gl={ { preserveDrawingBuffer: true } }
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