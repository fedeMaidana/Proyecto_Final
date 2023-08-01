import { MeshStandardMaterial, DoubleSide } from 'three'
import { useGLTF } from '@react-three/drei'

export function Dress( props ){
    const { nodes } = useGLTF( 'src/assets/models/dress.glb' )

    return (
        <group { ...props } dispose={ null } scale={ [ 4, 4, 4 ] } position={ [ 0, -2, 0 ] } >
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.Cube.geometry }
                material={
                    new MeshStandardMaterial({
                        ...nodes.Cube.material,
                        side: DoubleSide
                    })
                }
                position={ [ 0, 0.868, 0.275 ] }
                rotation={ [ -Math.PI, 0, -Math.PI ] }
                scale={ [ -0.145, -0.214, -0.052 ] }
            />
        </group>
    )
}

useGLTF.preload( "src/assets/models/dress.glb" )