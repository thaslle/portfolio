'use client'

import { Euler, MeshBasicMaterial } from 'three'
import { useThree } from '@react-three/fiber'
import { Plane, useVideoTexture } from '@react-three/drei'

import CustomShaderMaterial from 'three-custom-shader-material'

import { fragment } from './shaders/fragment.glsl'
import { vertex } from './shaders/vertex.glsl'
import { Project } from '@/utils/types'

type ScreenProps = {
  rotation: Euler
  distance: number
  project: Project
  onClickProject: (href: string) => void
}

export const Screen: React.FC<ScreenProps> = ({
  rotation,
  distance,
  project,
  onClickProject,
}) => {
  const { size } = useThree()

  const ratio = size.width / size.height
  const width = ratio > 1 ? size.width * 0.8 : size.width * 0.6
  const height = width * (9 / 16)

  const offset = -15 * width
  const offsetDistance = distance * width

  const video = useVideoTexture(project.video)

  const href = `/project/${project.slug}`

  return (
    <group rotation={rotation} position={[0, 0, (Math.abs(offset) / 3) * 2]}>
      <Plane
        args={[width, height]}
        position={[0, 0, offset + offsetDistance]}
        onClick={() => onClickProject(href)}
      >
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
  )
}
