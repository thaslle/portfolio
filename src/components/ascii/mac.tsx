import { useEffect, useRef } from 'react'
import { Mesh, Group, MathUtils } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    back: Mesh
    body: Mesh
    screen: Mesh
  }
}

export const Macintosh = () => {
  const { nodes } = useGLTF('/models/macintosh.gltf') as unknown as GLTFResult
  const modelRef = useRef<Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!mouse.current) return
    const onMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1

      mouse.current.x = mouseX
      mouse.current.y = mouseY
    }

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  useFrame(({ camera }, delta) => {
    if (!modelRef.current || !mouse.current) return

    modelRef.current.rotation.y += delta * 0.8

    camera.position.z = MathUtils.lerp(
      camera.position.z,
      5 + mouse.current.x * 0.8,
      0.15,
    )

    modelRef.current.rotation.x = MathUtils.lerp(
      modelRef.current.rotation.x,
      mouse.current.y * 0.5,
      0.15,
    )
  })

  return (
    <group ref={modelRef} dispose={null} scale={5} position-y={-0.5}>
      <mesh geometry={nodes.back.geometry}>
        <meshLambertMaterial color="#fff" />
      </mesh>
      <mesh geometry={nodes.screen.geometry}>
        <meshLambertMaterial color="#fff" />
      </mesh>
      <mesh geometry={nodes.body.geometry}>
        <meshLambertMaterial color="#ccc" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/macintosh.gltf')

