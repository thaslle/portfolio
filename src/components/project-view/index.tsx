'use client'

import React from 'react'
import { useTransitionRouter } from 'next-transition-router'

import { Video } from '@/components/video'
import { Window } from '@/components/window'
import { Project } from '@/utils/types'

import { About } from './about'
import { Info } from './info'
import { Lines } from './lines'

import s from './project-view.module.scss'
import { More } from './more'

type ProjectProps = {
  project: Project
  prev: Project
  next: Project
}

export const ProjectView: React.FC<ProjectProps> = ({
  project,
  prev,
  next,
}) => {
  const router = useTransitionRouter()

  return (
    <Window
      title={project.title}
      link={project.info.live}
      label={project.info.label}
      onClose={() => router.push('/', { scroll: false })}
    >
      <Video aspect={project.aspect} src={project.video} />

      <div className={s.container}>
        <About description={project.description} />
        <Info info={project.info} />
        {project.lines && <Lines lines={project.lines} title={project.title} />}
        <More prev={prev} next={next} />
      </div>
    </Window>
  )
}
