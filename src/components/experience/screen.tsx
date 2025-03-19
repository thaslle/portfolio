'use client'

import { Euler, MeshBasicMaterial } from 'three'
import { useThree } from '@react-three/fiber'
import { Plane, Text, useVideoTexture } from '@react-three/drei'

import CustomShaderMaterial from 'three-custom-shader-material'

import { fragment } from './shaders/fragment.glsl'
import { vertex } from './shaders/vertex.glsl'

export const Screen = ({
  rotation,
  distance,
  text,
}: {
  rotation: Euler
  distance: number
  text: string
}) => {
  const { size } = useThree()

  const ratio = size.width / size.height
  const width = ratio > 1 ? size.width * 0.8 : size.width * 0.6
  const height = width * (9 / 16)

  const offset = -15 * width
  const offsetDistance = distance * width

  const video = useVideoTexture('/videos/smoov-hero.mp4')

  return (
    <group rotation={rotation} position={[0, 0, (Math.abs(offset) / 3) * 2]}>
      <group position={[0, 0, offset + offsetDistance]}>
        <Text
          position={[-width / 2.1, height / 2.1, 0.01]}
          fontSize={width * 0.04}
          anchorX="left"
          anchorY="top"
        >
          {text}
        </Text>

        <Plane args={[width, height]}>
          <CustomShaderMaterial
            baseMaterial={MeshBasicMaterial}
            fragmentShader={fragment}
            vertexShader={vertex}
            map={video}
            toneMapped={false}
            transparent
          />
        </Plane>
      </group>
    </group>
  )
}
