'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Euler, MathUtils, Vector2 } from 'three'
import { useFrame } from '@react-three/fiber'
import { CameraControls, ScreenSizer } from '@react-three/drei'

import { Screen } from './screen'

import { Projects } from '@/utils/types'
import { useDeviceDetect } from '@/hooks/use-device-detect'
// import { useTouchPosition } from '@/hooks/use-touch-position'

type GlobeProps = {
  projects: Projects
  onClickProject: (href: string) => void
}
export const Globe: React.FC<GlobeProps> = ({ projects, onClickProject }) => {
  const cameraRef = useRef<CameraControls>(null)
  //const touch = useTouchPosition()
  const device = useDeviceDetect()

  // Total number of elements
  const totalElements = 25
  //const loadedElements = projects.length
  const gridSpacing = 0.09

  // New indices to remap positions
  const targetIndices = [
    12, 17, 7, 13, 18, 8, 11, 16, 6, 2, 23, 3, 22, 21, 1, 14, 10, 9, 19, 14, 15,
    24, 4, 20, 0,
  ]

  // Assuming 5x5 grid (odd number of columns and rows)
  const gridSize = 5
  const maxAngle = gridSize * gridSpacing

  const currentPosition = useRef({ x: 0, y: 0 })
  const lastPosition = useRef({ x: 0, y: 0 })
  const currentAzimuth = useRef(0)
  const currentPolar = useRef(0)

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const currentX = event.clientX
      const currentY = event.clientY

      // Calculate the delta by subtracting the last position from the current position
      const deltaX = currentX - lastPosition.current.x
      const deltaY = currentY - lastPosition.current.y

      // Normalize the delta values to be between -1 and 1
      const width = window.innerWidth
      const height = window.innerHeight

      const normalizedDeltaX = Math.max(-1, Math.min(1, (deltaX / width) * 2)) // maps to [-1, 1]
      const normalizedDeltaY = Math.max(-1, Math.min(1, -(deltaY / height) * 2)) // maps to [-1, 1]

      // Update the state with the normalized delta values
      currentPosition.current = { x: normalizedDeltaX, y: normalizedDeltaY }
    }

    const handleTouchStart = (event: TouchEvent) => {
      // Get the first touch (in case of multi-touch)
      const touch = event.touches[0]

      // Get the touch position (clientX, clientY are in pixels)
      const touchX = touch.clientX
      const touchY = touch.clientY

      // Update the state with normalized values
      lastPosition.current = { x: touchX, y: touchY }

      if (!cameraRef.current) return
      currentAzimuth.current = cameraRef.current.azimuthAngle
      currentPolar.current = cameraRef.current.polarAngle
    }

    // Attach the pointermove event to the window
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('pointermove', handlePointerMove)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  useFrame(({ pointer }) => {
    if (!cameraRef.current) return

    const mouse = new Vector2(
      device.isMobile ? -currentPosition.current.x : pointer.x,
      device.isMobile ? -currentPosition.current.y : pointer.y,
    )

    const azimuthAngle = maxAngle * mouse.x * -1
    const polarAngle = Math.PI / 2 + maxAngle * mouse.y

    //console.log(currentAzimuth.current, currentPolar.current)

    if (device.isMobile) {
      cameraRef.current.azimuthAngle = azimuthAngle
      cameraRef.current.polarAngle = polarAngle
      return
    }

    // Make camera follow mouse cursor x
    cameraRef.current.azimuthAngle = MathUtils.lerp(
      cameraRef.current.azimuthAngle,
      azimuthAngle,
      0.015,
    )

    // Make camera follow mouse cursor y
    cameraRef.current.polarAngle = MathUtils.lerp(
      cameraRef.current.polarAngle,
      polarAngle,
      0.015,
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
        maxDistance={1}
        minDistance={1}
        azimuthRotateSpeed={0.1}
        polarRotateSpeed={0.1}
        onEnd={(e) => {
          if (
            !currentAzimuth.current ||
            !currentPolar.current ||
            !cameraRef.current
          )
            return
          currentAzimuth.current = cameraRef.current.azimuthAngle
          currentPolar.current = cameraRef.current.polarAngle
        }}
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
            const distance = useMemo(() => Math.random() * 4 - 2, [])

            // Map the input number to a distance between 4 and 2
            const offset = 1 - (0.5 / totalElements) * i

            return (
              <Screen
                key={i}
                id={i}
                rotation={new Euler(rotationX, rotationY, 0)}
                distance={distance * offset}
                project={project}
                onClickProject={onClickProject}
              />
            )
          })}
        </group>
      </ScreenSizer>
    </>
  )
}

