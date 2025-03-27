import { Mesh } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    back: Mesh
    body: Mesh
    screen: Mesh
  }
}

export const Macintosh = () => {
  const { nodes } = useGLTF('/models/macintosh.gltf') as unknown as GLTFResult
  return (
    <group dispose={null}>
      <mesh geometry={nodes.back.geometry}>
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh geometry={nodes.screen.geometry}>
        <meshBasicMaterial color="gray" />
      </mesh>
      <mesh geometry={nodes.body.geometry}>
        <meshBasicMaterial color="green" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/macintosh.gltf')

