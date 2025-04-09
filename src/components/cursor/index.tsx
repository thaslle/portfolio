'use client'

import { RefObject, useEffect, useRef } from 'react'
import {
  AnimatePresence,
  frame,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react'
import { useScramble } from 'use-scramble'

import { useStore } from '@/hooks/use-store'

import s from './cursor.module.scss'

export const Cursor = () => {
  const {
    label: { subtitle, title },
  } = useStore()
  const cursorRef = useRef<HTMLDivElement>(null)

  const { x, y } = useFollowPointer(cursorRef)

  return (
    <motion.div
      ref={cursorRef}
      className={s.cursor}
      style={{ x, y }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
    >
      <AnimatePresence>
        {title && subtitle && (
          <motion.div
            key="label"
            className={s.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Text text={title} className={s.title} />
            <Text text={subtitle} className={s.subtitle} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const useFollowPointer = (ref: RefObject<HTMLDivElement | null>) => {
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

type TextProps = {
  text: string
} & React.HTMLProps<HTMLSpanElement>

const Text: React.FC<TextProps> = ({ text, ...props }) => {
  const { ref } = useScramble({
    text: text,
  })

  return <span ref={ref} {...props} />
}

