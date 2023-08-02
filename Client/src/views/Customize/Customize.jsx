import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Center, Environment, AccumulativeShadows, RandomizedLight } from "@react-three/drei"
import { easing } from "maath"
import { Shirt } from "../../clothes/Shirt"
import { Pant } from "../../clothes/Pant"
import { Dress } from "../../clothes/Dress"
import { Jacket } from "../../clothes/Jacket"

export function Customize( { position = [ 0, 0, 15 ], fov = 25 } ) {
    return(
        <>
            <Canvas
                shadows
                eventSource={ document.getElementById( 'root' ) }
                eventPrefix="client"
                camera={ { position, fov } }
                style={ { height: '100vh', width: '100vw' } }
            >
                <ambientLight intensity={ 0.5 } />
                <Environment preset="city" />
                <CameraRig>
                    <Center>
                        <Dress />
                        <Backdrop />
                    </Center>
                </CameraRig>
            </Canvas>
        </>
    )
}

function Backdrop(){
    return(
        <AccumulativeShadows
            temporal
            frames={ 60 }
            alphaTest={ .85 }
            scale={ 10 }
            rotation={ [ Math.PI / 2, 0, 0 ] }
            position={ [ 0, 0, -.6 ] }
        >
            <RandomizedLight
                amount={ 4 }
                radius={ 9 }
                intensity={ 2 }
                ambient={ .25 }
                position={ [ 5, 5, -10 ] }
            />
            <RandomizedLight
                amount={ 4 }
                radius={ 5 }
                intensity={ 2 }
                ambient={ .55 }
                position={ [ -5, 5, -9 ] }
            />
        </AccumulativeShadows>
    )
}

function CameraRig( { children } ){
    const group = useRef()

    useFrame( ( state, delta ) => {
            easing.dampE( group.current.rotation, [ state.pointer.y / 2, -state.pointer.x / 2, 0 ], .25, delta )
    })

    return <group ref={ group } >{ children }</group>
}

export default Customize