'use client'

import React, { useRef, useEffect } from 'react'
import { Euler, Group, MathUtils } from 'three'
import { useFrame } from '@react-three/fiber'

import { Character } from './character'

type ControllerProps = {
  avatarRef: React.RefObject<Group>
  wrapperRef: React.RefObject<HTMLDivElement>
}

export const Controller: React.FC<ControllerProps> = ({
  avatarRef,
  wrapperRef,
}) => {
  const rotation = useRef(new Euler(0, 0, 0))

  // Moving head
  useEffect(() => {
    if (!rotation.current) return

    const handlePointerMove = (event: PointerEvent) => {
      if (!wrapperRef.current) return

      // Get the position of the wrapper element
      const rect = wrapperRef.current.getBoundingClientRect()

      // Calculate the center of the element
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate the mouse position relative to the center of the element
      const currentX = event.clientX
      const currentY = event.clientY

      const deltaX = currentX - centerX
      const deltaY = currentY - centerY

      const width = window.innerWidth
      const height = window.innerHeight

      // Normalize the delta values to be between -1 and 1 based on the element's size
      const normalizedX = Math.max(-1, Math.min(1, deltaX / (width / 2))) // Normalize to [-1, 1]
      const normalizedY = Math.max(-1, Math.min(1, deltaY / (height / 2))) // Normalize to [-1, 1]

      const maxPitch = Math.PI / 6 // 30 degrees (maximum pitch)
      const maxYaw = Math.PI / 5 // (maximum rotation on X-axis)

      const pitch = Math.max(
        -maxPitch,
        Math.min(maxPitch, normalizedY * maxPitch),
      )

      const yaw = Math.max(-maxYaw, Math.min(maxYaw, normalizedX * maxYaw))

      // Apply the normalized rotation values to the rotation state
      rotation.current = new Euler(pitch, yaw, 0)
    }

    // Attach the pointermove event to the window
    window.addEventListener('pointermove', handlePointerMove)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  useFrame(() => {
    if (!avatarRef.current || !rotation.current) return

    avatarRef.current.rotation.y = MathUtils.lerp(
      avatarRef.current.rotation.y,
      rotation.current.y,
      0.08,
    )

    avatarRef.current.rotation.x = MathUtils.lerp(
      avatarRef.current.rotation.x,
      rotation.current.x,
      0.08,
    )
  })

  return <Character ref={avatarRef} />
}
