'use client'

import React, { useRef, Suspense } from 'react'
import { Group } from 'three'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Environment } from '@react-three/drei'

import { Camera } from './camera'
import { Controller } from './controller'

import s from './avatar.module.scss'

export const Avatar = () => {
  const avatarRef = useRef<Group>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <Suspense>
        <Canvas className={s.canvas}>
          <Camera />
          <AdaptiveDpr pixelated />
          <Environment files="images/sunset.hdr" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 0]} intensity={0.5} />

          <Controller avatarRef={avatarRef} wrapperRef={wrapperRef} />
        </Canvas>
      </Suspense>
    </div>
  )
}

