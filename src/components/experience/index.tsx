'use client'

import React from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { Leva } from 'leva'

import { useTransitionRouter } from 'next-transition-router'

import { Projects } from '@/utils/types'
import { Globe } from './globe'

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
        </Canvas>
      </Suspense>
    </div>
  )
}
