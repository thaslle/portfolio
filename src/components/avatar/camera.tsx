import { useEffect, useRef, useState } from 'react'
import { OrthographicCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export const Camera = () => {
  const camera = useRef<any>(null)
  const { size } = useThree()

  useEffect(() => {
    // Adjust the camera when the window is resized
    const handleResize = () => {
      if (!camera.current) return

      const ratio = size.width / size.height

      // Update the camera's properties
      const frustumSize = 4 // I'm using it as a zoom
      const newLeft = (frustumSize * ratio) / -2
      const newRight = (frustumSize * ratio) / 2
      const newTop = frustumSize / 2
      const newBottom = frustumSize / -2

      camera.current.left = newLeft
      camera.current.right = newRight
      camera.current.top = newTop
      camera.current.bottom = newBottom
      camera.current.updateProjectionMatrix() // Update the camera's projection matrix
    }

    window.addEventListener('resize', handleResize)

    // Initial resize call to set up the camera
    handleResize()

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize)
  }, [size])

  return <OrthographicCamera ref={camera} makeDefault position={[0, 0, 5]} />
}
