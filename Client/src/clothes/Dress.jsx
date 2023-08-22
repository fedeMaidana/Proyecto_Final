import { MeshStandardMaterial, DoubleSide } from 'three';
import { useGLTF } from '@react-three/drei';


export function Dress(props) {
    const { nodes } = useGLTF(`https://customcraft.blob.core.windows.net/archivos-glb/dress.glb`
    );

    const { clothingColor } = props;

    const material = new MeshStandardMaterial({ color: clothingColor, side: DoubleSide });

    return (
        <group {...props} dispose={null} position={[0, -1, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['01_FABRIC_1_FRONT_1309_0'].geometry}
                material={material}
                scale={0.05}
            />
        </group>
    );
}

useGLTF.preload(`https://customcraft.blob.core.windows.net/archivos-glb/dress.glb`);


