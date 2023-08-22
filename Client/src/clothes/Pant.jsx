import { MeshStandardMaterial, DoubleSide } from 'three';
import { useGLTF } from "@react-three/drei"

export function Pant( props ){
    const { nodes } = useGLTF( `https://customcraft.blob.core.windows.net/archivos-glb/pant.glb` )

    const { clothingColor } = props

    const material = new MeshStandardMaterial( { color: clothingColor, side: DoubleSide } )

    return (
        <group { ...props } dispose={ null } position={ [ 0, -.6, .5 ] } >
            <group scale={ 0.004 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={ nodes.Malla.geometry }
                    material={ material }
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={ nodes.Malla_1.geometry }
                    material={ material }
                />
            </group>
        </group>
    )
}

useGLTF.preload( `https://customcraft.blob.core.windows.net/archivos-glb/pant.glb` )