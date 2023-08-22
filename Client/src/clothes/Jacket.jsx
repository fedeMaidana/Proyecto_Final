import { MeshStandardMaterial, DoubleSide } from 'three'
import { useGLTF } from '@react-three/drei'

export function Jacket( props ){
    const { nodes } = useGLTF( '../assets/models/jacket.glb' )
    const { clothingColor } = props
    const material = new MeshStandardMaterial( { color: clothingColor, side: DoubleSide } )

    return (
        <group { ...props } dispose={ null } >
            <group rotation={ [ -Math.PI / 2, 0, 0 ] } scale={ .04 } position={ [ 0, -.3, .5 ] }>
                <group rotation={ [ Math.PI / 2, 0, 0 ] } >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial006.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial007.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial008.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial005.geometry }
                        material={ new MeshStandardMaterial( { color: 'rgb(87, 87, 87)', side: DoubleSide } ) }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial011.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial012.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial010.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial009.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial013.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial004.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial003.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial001.geometry }
                        material={ material }
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={ nodes.defaultMaterial002.geometry }
                        material={ material }
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload( "../assets/models/jacket.glb" )