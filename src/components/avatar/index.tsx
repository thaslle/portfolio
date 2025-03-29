'use client'

import React from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Environment } from '@react-three/drei'

import { Camera } from './camera'
import { Character } from './character'

import s from './avatar.module.scss'

export const Avatar = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.c}>
        <Suspense>
          <Canvas className={s.canvas}>
            <Camera />
            <AdaptiveDpr pixelated />
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 0]} intensity={0.5} />

            <Character />
          </Canvas>
        </Suspense>
      </div>
    </div>
  )
}
