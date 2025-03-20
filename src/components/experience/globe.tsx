'use client'

import { useEffect, useRef, useState } from 'react'
import { Euler, MathUtils } from 'three'
import { useFrame } from '@react-three/fiber'
import { CameraControls, ScreenSizer } from '@react-three/drei'

import { loadProjects } from '@/utils/load-data'
import { Projects } from '@/utils/types'

import { Screen } from './screen'

export const Globe = () => {
  const [projects, setProjects] = useState<Projects>([])
  const [loading, setLoading] = useState<boolean>(true)

  const cameraRef = useRef<CameraControls>(null)

  // Load Data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await loadProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Total number of elements
  const totalElements = 25
  const loadedElements = projects.length
  const gridSpacing = 0.09

  // New indices to remap positions
  const targetIndices = [
    12, 17, 7, 13, 18, 8, 11, 16, 6, 2, 23, 3, 22, 21, 1, 14, 10, 9, 19, 14, 15,
    24, 4, 20, 0,
  ]

  // Assuming 5x5 grid (odd number of columns and rows)
  const gridSize = 5
  const maxAngle = gridSize * gridSpacing

  useFrame(({ pointer }) => {
    if (!cameraRef.current) return

    // Make camera follow mouse cursor x
    cameraRef.current.azimuthAngle = MathUtils.lerp(
      cameraRef.current.azimuthAngle,
      maxAngle * pointer.x * -1,
      0.025,
    )

    // Make camera follow mouse cursor y
    cameraRef.current.polarAngle = MathUtils.lerp(
      cameraRef.current.polarAngle,
      Math.PI / 2 + maxAngle * pointer.y,
      0.025,
    )
  })

  return (
    <>
      <CameraControls
        ref={cameraRef}
        minPolarAngle={Math.PI / 2 - maxAngle}
        maxPolarAngle={Math.PI / 2 + maxAngle}
        minAzimuthAngle={-maxAngle}
        maxAzimuthAngle={maxAngle}
        maxZoom={1}
        minZoom={1}
        azimuthRotateSpeed={0.1}
        polarRotateSpeed={0.1}
      />
      <ScreenSizer scale={1}>
        <group>
          {projects.slice(0, totalElements).map((project, i) => {
            const ri = targetIndices[i]

            // Calculate row and column index based on the element index
            const rowIndex = Math.floor(ri / gridSize) // Row index (0-4 for a 5x5 grid)
            const colIndex = ri % gridSize // Column index (0-4 for a 5x5 grid)

            // Normalize X and Y positions to spread from center
            const xPos = colIndex - Math.floor(gridSize / 2) // Normalize X
            const yPos = rowIndex - Math.floor(gridSize / 2) // Normalize Y

            // Apply spacing for rotation (X and Y)
            const rotationX = xPos * gridSpacing
            const rotationY = yPos * gridSpacing

            // Random distance for effect
            const distance = Math.random() * 4 - 2

            return (
              <Screen
                key={i}
                rotation={new Euler(rotationX, rotationY, 0)}
                distance={distance}
                project={project}
              />
            )
          })}
        </group>
      </ScreenSizer>
    </>
  )
}

