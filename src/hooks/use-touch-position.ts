import { useEffect, useRef } from 'react'

export const useTouchPosition = () => {
  //const [delta, setDelta] = useState({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const lastPosition = useRef({ x: 0, y: 0 })

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

      const normalizedDeltaX = (deltaX / width) * 2 // maps to [-1, 1]
      const normalizedDeltaY = -(deltaY / height) * 2 // maps to [-1, 1]

      // Update the state with the normalized delta values
      currentPosition.current = { x: normalizedDeltaX, y: normalizedDeltaY }

      // Update the last position for the next move
      //lastPosition.current = { x: currentX, y: currentY }
    }

    const handleTouchStart = (event: TouchEvent) => {
      // Get the first touch (in case of multi-touch)
      const touch = event.touches[0]

      // Get the touch position (clientX, clientY are in pixels)
      const touchX = touch.clientX
      const touchY = touch.clientY

      // Update the state with normalized values
      lastPosition.current = { x: touchX, y: touchY }
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

  return currentPosition.current
}

