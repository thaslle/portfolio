'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, AdaptiveDpr } from '@react-three/drei'
import { Leva } from 'leva'

import { Globe } from './globe'

import s from './experience.module.scss'

export const Experience = () => (
  <>
    <Suspense>
      <Leva />
      <Canvas camera={{ fov: 25 }} className={s.canvas}>
        <Stats />
        <AdaptiveDpr pixelated />
        <Globe />
      </Canvas>
    </Suspense>
  </>
)
