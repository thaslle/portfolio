import { clsx } from 'clsx'
import { RefObject, useEffect, useRef, useState } from 'react'
import { frame, motion, useMotionValue, useSpring } from 'motion/react'

import { useStore } from '@/hooks/use-store'

import s from './cursor.module.scss'

export const Cursor = () => {
  const {
    label: { subtitle, title },
  } = useStore()
  const cursorRef = useRef<HTMLDivElement>(null)

  const { x, y } = useFollowPointer(cursorRef)

  useEffect(() => {
    if (!cursorRef.current) return

    console.log(title, subtitle)
  }, [title, subtitle])

  return (
    <motion.div
      ref={cursorRef}
      className={s.cursor}
      style={{ x, y }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
    >
      <span className={s.label}>
        {title} {subtitle}
      </span>
    </motion.div>
  )
}

export const useFollowPointer = (ref: RefObject<HTMLDivElement | null>) => {
  const spring = { damping: 10, stiffness: 50, restDelta: 0.005 }
  const xPoint = useMotionValue(0)
  const yPoint = useMotionValue(0)
  const x = useSpring(xPoint, spring)
  const y = useSpring(yPoint, spring)

  useEffect(() => {
    if (!ref.current) return

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!

      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2)
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2)
      })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return { x, y }
}

