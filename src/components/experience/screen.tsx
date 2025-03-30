'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Euler, MeshBasicMaterial } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture, useVideoTexture } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import CustomShaderMaterial from 'three-custom-shader-material'

import { Project } from '@/utils/types'
import { useStore } from '@/hooks/use-store'

import { fragment } from './shaders/fragment.glsl'
import { vertex } from './shaders/vertex.glsl'

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
  const { filter, setLabel } = useStore()
  const { size } = useThree()
  const materialRef = useRef<any>(null)

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [mounted, setMounted] = useState(false)

  const ratio = size.width / size.height
  const width = ratio > 1 ? size.width * 0.8 : size.width * 0.6
  const height = width * (9 / 16)

  const offset = -15 * width
  const offsetDistance = distance * width
  const media = project.media.url

  const map =
    project.media.type === 'video' ? useVideoTexture(media) : useTexture(media)

  const href = `/project/${project.slug}`

  // Set uniforms
  const uniforms = useMemo(
    () => ({
      uOpacity: { value: 1.0 },
    }),
    [],
  )

  const { scale } = useSpring({
    scale: hovered ? (clicked ? 1.05 : 1.1) : 1,
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

  useEffect(() => {
    if (!clicked) return
    const timer = setTimeout(() => setClicked(false), 300)
    return () => clearTimeout(timer)
  }, [clicked])

  const filtered = !filter || filter === project.category

  // Initial animation + filter
  const { position, opacity } = useSpring({
    position: mounted
      ? filtered
        ? offset + offsetDistance
        : (offset + offsetDistance) * 1.2
      : 0,
    opacity: filtered ? 1.0 : 0.2,
    config: {
      tension: 300,
      friction: 60,
      mass: 1,
    },
    delay: id * 15,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useFrame(() => {
    if (!materialRef) return
    materialRef.current.uniforms.uOpacity.value = opacity.get()
  })

  return (
    <group rotation={rotation} position={[0, 0, (Math.abs(offset) / 3) * 2]}>
      <animated.mesh
        scale={scale}
        position-z={position}
        onClick={() => {
          if (!filtered) return
          onClickProject(href)
          setClicked(true)
        }}
        onPointerOver={() => {
          if (!filtered) return
          setHovered(true)
          setLabel({ title: project.title, subtitle: project.category })
        }}
        onPointerOut={() => {
          if (!filtered) return
          setHovered(false)
          setClicked(false)
          setLabel({ title: null, subtitle: null })
        }}
        frustumCulled={false}
      >
        <planeGeometry args={[width, height]} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={MeshBasicMaterial}
          fragmentShader={fragment}
          vertexShader={vertex}
          uniforms={uniforms}
          map={map}
          toneMapped={false}
          transparent
        />
      </animated.mesh>
    </group>
  )
}
