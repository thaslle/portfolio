'use client'

import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'motion/react'

import { Box } from './box'
import { Counter } from './counter'

import { useStore } from '@/hooks/use-store'
import { settings } from '@/utils/settings'

import s from './loading.module.scss'

export const Loading = () => {
  const { progress, active } = useProgress()
  const [showLoader, setShowLoader] = useState(true)

  const { ready, setReady } = useStore()

  // Set a delay time to hide loader
  useEffect(() => {
    if (active) return

    setReady(true)
    const delayHide = setTimeout(() => setShowLoader(false), 5000)

    return () => {
      clearTimeout(delayHide)
    }
  }, [active])

  return (
    <AnimatePresence>
      {showLoader && !ready && (
        <motion.div
          className={s.wrapper}
          exit={{
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className={s.loading}>
            <Box>
              <Counter to={progress} />
            </Box>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
