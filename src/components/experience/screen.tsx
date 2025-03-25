'use client'

import { useEffect, useRef, useState } from 'react'
import { Euler, MeshBasicMaterial, Vector2 } from 'three'
import { useThree } from '@react-three/fiber'
import { useVideoTexture } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'

import CustomShaderMaterial from 'three-custom-shader-material'

import { fragment } from './shaders/fragment.glsl'
import { vertex } from './shaders/vertex.glsl'
import { Project } from '@/utils/types'

type ScreenProps = {
  id: number
  rotation: Euler
  distance: number
  project: Project
  onClickProject: (href: string) => void
}

export const Screen: React.FC<ScreenProps> = ({
  id,
  rotation,
  distance,
  project,
  onClickProject,
}) => {
  const { size } = useThree()
  const materialRef = useRef<any>(null)

  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const ratio = size.width / size.height
  const width = ratio > 1 ? size.width * 0.8 : size.width * 0.6
  const height = width * (9 / 16)

  const offset = -15 * width
  const offsetDistance = distance * width

  const video = useVideoTexture(project.video)

  const href = `/project/${project.slug}`

  const { scale } = useSpring({
    scale: hovered ? 1.05 : 1,
    config: {
      tension: 250,
      friction: 12,
      mass: 0.8,
    },
  })

  // Change cursor
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Initial animation
  const { position } = useSpring({
    position: mounted ? offset + offsetDistance : 0,
    config: {
      tension: 300,
      friction: 60,
      mass: 1,
    },
    delay: id * 20,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <group rotation={rotation} position={[0, 0, (Math.abs(offset) / 3) * 2]}>
      <animated.mesh
        scale={scale}
        position-z={position}
        onClick={() => onClickProject(href)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[width, height]} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={MeshBasicMaterial}
          fragmentShader={fragment}
          vertexShader={vertex}
          uniforms={{
            uOpacity: { value: 1.0 },
          }}
          map={video}
          toneMapped={false}
          transparent
        />
      </animated.mesh>
    </group>
  )
}
