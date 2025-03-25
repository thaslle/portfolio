'use client'

import React from 'react'
import { useScramble } from 'use-scramble'
import { AnimatePresence, motion } from 'motion/react'

import { useStore } from '@/hooks/use-store'
import { settings } from '@/utils/settings'

import s from './filter.module.scss'

export const Filter = () => {
  const { filter, setFilter } = useStore()

  const { ref, replay } = useScramble({
    text: `${filter} ✕`,
  })

  const variants = {
    leaving: {
      scale: 0.98,
      opacity: 0,
      y: '-15%',
    },
    entering: {
      scale: 1,
      opacity: 1,
      y: 0,
    },
  }

  return (
    <AnimatePresence>
      {filter && (
        <motion.button
          ref={ref}
          className={s.button}
          onMouseOver={replay}
          onFocus={replay}
          onClick={() => setFilter(null)}
          initial={variants.leaving}
          animate={variants.entering}
          exit={variants.leaving}
          transition={{ duration: settings.duration * 0.2 }}
        />
      )}
    </AnimatePresence>
  )
}

