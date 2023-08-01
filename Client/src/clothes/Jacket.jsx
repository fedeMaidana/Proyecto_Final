import { MeshStandardMaterial } from 'three';
import { useGLTF } from '@react-three/drei'

export function Jacket( props ){
    const { nodes, materials } = useGLTF( 'src/assets/models/jacket.glb' )

    const whiteMaterial = new MeshStandardMaterial({ color: '#FFFFFF' });

    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.05} position={ [ 0, -1.5, .5 ] }>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial006.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial007.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial008.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial005.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial011.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial012.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial010.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial009.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial013.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial004.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial003.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial001.geometry}
                        material={whiteMaterial}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial002.geometry}
                        material={whiteMaterial}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload( "src/assets/models/jacket.glb" )