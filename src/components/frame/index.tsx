'use client'

import React from 'react'
import { motion } from 'motion/react'
import { useStore } from '@/hooks/use-store'

import { settings } from '@/utils/settings'
import s from './frame.module.scss'

type FrameProps = {
  children: React.ReactNode
}

export const Frame: React.FC<FrameProps> = ({ children }) => {
  const { ready } = useStore()

  const variants = {
    entering: {
      opacity: 0.8,
      scale: 0.8,
      y: '15%',
    },
    static: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  }

  return (
    <div className={s.wrapper}>
      <motion.div
        key="frame"
        className={s.frame}
        animate={ready ? variants.static : variants.entering}
        transition={{
          duration: settings.duration,
          ease: settings.easeIn,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

