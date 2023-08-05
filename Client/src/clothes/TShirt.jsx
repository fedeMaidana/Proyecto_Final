import { MeshStandardMaterial, DoubleSide } from 'three'
import { useGLTF } from "@react-three/drei"

export function TShirt( props ){
    const { nodes } = useGLTF( 'src/assets/models/t-shirt.glb' )

    const { clothingColor } = props

    const material = new MeshStandardMaterial( { color: clothingColor, side: DoubleSide } )

    return (
        <group { ...props } dispose={ null } scale={ 5 } position={ [ 0, -3.2, 1 ] } >
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.Ribbing_Node.geometry }
                material={ material }
            />
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.Ribbing_Node001.geometry }
                material={ material }
            />
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.Body_Front_Node.geometry }
                material={ material }
            />
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.Body_Back_Node.geometry }
                material={ material }
            />
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.Sleeves_Node.geometry }
                material={ material }
            />
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.Sleeves_Node001.geometry }
                material={ material }
            />
        </group>
    )
}

useGLTF.preload( "src/assets/models/t-shirt.glb" )