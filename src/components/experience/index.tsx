'use client'

import React from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { Leva } from 'leva'
// import { wrapEffect, EffectComposer } from '@react-three/postprocessing'
// import { Effect } from 'postprocessing'
import { useTransitionRouter } from 'next-transition-router'

import { Projects } from '@/utils/types'
import { Globe } from './globe'

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

import s from './experience.module.scss'

type ExperienceProps = {
  projects: Projects
}

export const Experience: React.FC<ExperienceProps> = ({ projects }) => {
  const router = useTransitionRouter()

  const handleClickProject = (href: string) =>
    router.push(href, { scroll: false })

  return (
    <div className={s.wrapper}>
      <Suspense>
        <Leva hidden />
        <Canvas camera={{ fov: 25 }} className={s.canvas}>
          {/* <Stats /> */}
          <AdaptiveDpr pixelated />
          <Globe projects={projects} onClickProject={handleClickProject} />
          {/* <EffectComposer>
            <RetroEffectComponent />
          </EffectComposer> */}
        </Canvas>
      </Suspense>
    </div>
  )
}
