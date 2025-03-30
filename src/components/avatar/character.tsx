import React, { useState, useEffect } from 'react'
import { Group, Mesh, MeshStandardMaterial } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { animated, useSpring } from '@react-spring/three'

import CustomShaderMaterial from 'three-custom-shader-material'

import { fragment } from './shaders/fragment.glsl'
import { vertex } from './shaders/vertex.glsl'

type GLTFResult = GLTF & {
  nodes: {
    head: Mesh
    eye: Mesh
    beanie: Mesh
    hair: Mesh
  }
  materials: {
    face: MeshStandardMaterial
  }
}

type CharacterProps = {
  ref: React.RefObject<Group>
}

export const Character = React.forwardRef<Group, CharacterProps>(
  (props, ref) => {
    //export const Character: React.FC<CharacterProps> = ({ ref }) => {
    const { nodes, materials } = useGLTF('/models/avatar.glb') as GLTFResult

    const [blink, setBlink] = useState(false)
    const [mounted, setMounted] = useState(false)

    const { scale } = useSpring({
      scale: blink ? 0.2 : 1,
      config: {
        tension: 1500,
        friction: 25,
        mass: 0.1,
      },
    })

    useEffect(() => {
      let open: NodeJS.Timeout
      const timer = setInterval(() => {
        setBlink((prev) => !prev)
        open = setTimeout(() => setBlink((prev) => !prev), 150)
      }, 3000)
      return () => {
        clearInterval(timer)
        clearTimeout(open)
      }
    }, [])

    // Initial animation + filter
    const { size } = useSpring({
      size: mounted ? 2 : 0,
      config: {
        tension: 600,
        friction: 30,
        mass: 1,
      },
    })

    useEffect(() => {
      setMounted(true)
    }, [])

    return (
      <animated.group
        ref={ref}
        scale={size}
        position={[0, -0.2, 0]}
        dispose={null}
      >
        <mesh geometry={nodes.head.geometry}>
          <CustomShaderMaterial
            baseMaterial={MeshStandardMaterial}
            map={materials.face.map}
            fragmentShader={fragment}
            vertexShader={vertex}
          />
        </mesh>
        <animated.mesh scale-y={scale} geometry={nodes.eye.geometry}>
          <CustomShaderMaterial
            baseMaterial={MeshStandardMaterial}
            metalness={0}
            roughness={0.3}
            color={'#694444'}
            fragmentShader={fragment}
            vertexShader={vertex}
          />
        </animated.mesh>
        <mesh geometry={nodes.beanie.geometry}>
          <CustomShaderMaterial
            baseMaterial={MeshStandardMaterial}
            color={'#4e9d00'}
            fragmentShader={fragment}
            vertexShader={vertex}
          />
        </mesh>
        <mesh geometry={nodes.hair.geometry}>
          <CustomShaderMaterial
            baseMaterial={MeshStandardMaterial}
            color={'#65554b'}
            fragmentShader={fragment}
            vertexShader={vertex}
          />
        </mesh>
      </animated.group>
    )
  },
)

useGLTF.preload('/models/avatar.glb')

