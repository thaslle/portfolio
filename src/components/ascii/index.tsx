'use client'

import React from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, OrbitControls } from '@react-three/drei'
import { Leva } from 'leva'
// import { wrapEffect, EffectComposer } from '@react-three/postprocessing'
// import { Effect } from 'postprocessing'

// import { dither } from './shaders/dither.glsl'

// class RetroEffectImpl extends Effect {
//   constructor() {
//     super('RetroEffect', dither, {
//       uniforms: new Map([]),
//     })
//   }
// }

// const RetroEffect = wrapEffect(RetroEffectImpl)
// const RetroEffectComponent = RetroEffect as unknown as React.FC

import { Macintosh } from './mac'
import s from './ascii.module.scss'

export const Ascii = () => {
  return (
    <div className={s.wrapper}>
      <Suspense>
        <Leva hidden />
        <Canvas camera={{ fov: 25 }} className={s.canvas}>
          <AdaptiveDpr pixelated />
          <Macintosh />
          <OrbitControls />

          {/* <EffectComposer>
            <RetroEffectComponent />
          </EffectComposer> */}
        </Canvas>
      </Suspense>
    </div>
  )
}
