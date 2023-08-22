import { MeshStandardMaterial, DoubleSide } from 'three'
import { useGLTF } from "@react-three/drei"

export function Shirt( props ){
    const { nodes } = useGLTF( `https://customcraft.blob.core.windows.net/archivos-glb/shirt.glb
    ` )

    const { clothingColor } = props

    const material = new MeshStandardMaterial( { color: clothingColor, side: DoubleSide } )

    return (
        <group { ...props } dispose={ null } scale={ 2 } position={ [ 0, -.8, 1.5 ] } >
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt00_1Pattern2D_4228_Shirt01_Shirt00_1Material4782_EY221p.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_12616_Shirt00_1Material4782_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_14923_Shirt00_1Material4782_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_21425_Shirt00_1Material4782_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_22589_Shirt00_1Material4782_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_22590_Shirt00_1Material4782_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_22591_Shirt00_1Material4782_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_22592_Shirt00_1Button_FRONT_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={100}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_22593_Shirt00_1Button_FRONT_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_22594_Shirt00_1Button_FRONT_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_22595_Shirt00_1Button_FRONT_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_22596_Shirt00_1Button_FRONT_Button.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_5118_Shirt00_1Button_FRONT_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
            <mesh
                castShadow
                receiveShadow
                geometry={
                    nodes.Shirt01_Shirt00_1Pattern2D_7658_Shirt00_1Material4782_0.geometry
                }
                material={ material }
                scale={ 0.006 }
            />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_7659_Shirt00_1Material4782_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
            <group scale={ 100 } >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes.Shirt01_Shirt00_1Pattern2D_7660_Shirt00_1Material4782_0.geometry
                    }
                    material={ material }
                    scale={ 0.006 }
                />
            </group>
        </group>
    )
}

useGLTF.preload( `https://customcraft.blob.core.windows.net/archivos-glb/shirt.glb
` )