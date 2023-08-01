import { useGLTF } from "@react-three/drei"

export function Pant( props ){
    const { nodes, materials } = useGLTF( 'src/assets/models/pant.glb' )

    return (
        <group { ...props } dispose={ null } >
            <group scale={ 0.005 } position={ [ 0, -2, .5 ] } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={ nodes.Malla.geometry }
                    material={ materials.Material }
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={ nodes.Malla_1.geometry }
                    material={ materials[ "Material #45" ] }
                />
            </group>
        </group>
    )
}

useGLTF.preload( "src/assets/models/pant.glb" )