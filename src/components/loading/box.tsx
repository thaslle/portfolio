import React, { useState, useEffect, useRef } from 'react'

import s from './loading.module.scss'

type BoxProps = {
  children: React.ReactNode
}

export const Box: React.FC<BoxProps> = ({ children }) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number | null>(null)

  const [showLoader, setShowLoader] = useState(false)
  const [direction, setDirection] = useState({ x: -1, y: 1 })
  const speed = 4

  // Ref to store the current positions
  const position = useRef({ x: 200, y: 0 })

  useEffect(() => {
    // Animation loop
    const animate = () => {
      if (!boxRef.current) return
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const width = boxRef.current.getBoundingClientRect().width
      const height = boxRef.current.getBoundingClientRect().height

      // Update positions based on direction
      position.current.x += direction.x * speed
      position.current.y += direction.y * speed

      // Check for boundaries and reverse direction if necessary
      if (
        position.current.x + width >= screenWidth ||
        position.current.x <= 0
      ) {
        setDirection((prev) => ({ ...prev, x: -prev.x })) // Reverse X direction
      }

      if (
        position.current.y + height >= screenHeight ||
        position.current.y <= 0
      ) {
        setDirection((prev) => ({ ...prev, y: -prev.y })) // Reverse Y direction
      }

      // Apply the new position to the box
      if (boxRef.current) {
        boxRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`
      }

      // Request the next animation frame
      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Start the animation loop
    animationFrameId.current = requestAnimationFrame(animate)

    // Cleanup function to cancel the animation on unmount
    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current)
    }
  }, [direction])

  useEffect(() => {
    setShowLoader(true)
  }, [])

  return (
    showLoader && (
      <div className={s.loader} ref={boxRef}>
        {children}
      </div>
    )
  )
}
