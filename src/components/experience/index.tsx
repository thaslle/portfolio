'use client'

import { Suspense /*, useEffect, useState*/ } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, AdaptiveDpr } from '@react-three/drei'
import { Leva } from 'leva'

import { Globe } from './globe'
// import { randomHexColor } from '@/utils/helper'

import s from './experience.module.scss'

export const Experience = () => {
  // // State to hold the random colors
  // const [gradientColors, setGradientColors] =
  //   useState<React.CSSProperties | null>(null)

  // // Function to generate a random hex color
  // const randomHexColor = () =>
  //   '#' + Math.floor(Math.random() * 16777215).toString(16)

  // useEffect(() => {
  //   // Generate and set random colors when the component mounts
  //   setGradientColors({
  //     '--base-color': randomHexColor(),
  //     '--back-color': randomHexColor(),
  //   } as React.CSSProperties)
  // }, []) // Empty dependency array ensures it runs only once after mount

  // if (!gradientColors) {
  //   return null // Render nothing initially until colors are set
  // }

  return (
    <div className={s.wrapper} /*style={gradientColors}*/>
      <Suspense>
        <Leva />
        <Canvas camera={{ fov: 25 }} className={s.canvas}>
          <Stats />
          <AdaptiveDpr pixelated />
          <Globe />
        </Canvas>
      </Suspense>
    </div>
  )
}
