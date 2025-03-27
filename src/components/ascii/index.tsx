'use client'

import React from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AsciiRenderer } from '@react-three/drei'

import { Macintosh } from './mac'

import s from './ascii.module.scss'

export const Ascii = () => {
  return (
    <div className={s.wrapper}>
      <Suspense>
        <Canvas camera={{ fov: 45 }} className={s.canvas}>
          <AdaptiveDpr pixelated />
          <ambientLight />
          <directionalLight position={[1, 1, 0]} intensity={5} />
          <Macintosh />
          <AsciiRenderer
            resolution={0.25}
            characters=" .-+*%#@&"
            invert={false}
            bgColor="transparent"
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

