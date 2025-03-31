'use client'

import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'motion/react'

import { Counter } from './counter'
import { useStore } from '@/hooks/use-store'

import s from './loading.module.scss'

export const Loading = () => {
  const [smoothProgress, setSmoothProgress] = useState(0)
  const { progress, active } = useProgress()
  const { ready, setReady } = useStore()

  // Set a delay time to hide loader
  useEffect(() => {
    if (active) return

    const delayHide = setTimeout(() => setReady(true), 500)

    return () => {
      clearTimeout(delayHide)
    }
  }, [active])

  console.log(progress)

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className={s.wrapper}
          exit={{
            filter: 'blur(5rem)',
            opacity: 0,
          }}
          transition={{ duration: 0.15 }}
          style={
            {
              '--progress': `${smoothProgress}%`,
              '--translate': `${smoothProgress}vw`,
            } as React.CSSProperties
          }
        >
          <div className={s.loading}>
            <Counter to={progress} onProgress={(p) => setSmoothProgress(p)} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

