import { useGLTF } from "@react-three/drei"

export function Shirt( props ){
    const { nodes, materials } = useGLTF( 'src/assets/models/shirt.glb' )

    return(
        <group { ...props } dispose={ null } scale={ [ 1, 1, 1 ] } position={ [ 0, 0, 0 ] } >
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.Plano.geometry }
                material={ materials.Material }
                rotation={ [ Math.PI / 2, 0, 0 ] }
            />
        </group>
    )
}

useGLTF.preload( "src/assets/models/shirt.glb" )