'use client'

import { clsx } from 'clsx'
import { RefObject, useEffect, useRef } from 'react'
import { frame, motion, useMotionValue, useSpring } from 'motion/react'
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
    <motion.div ref={cursorRef} className={s.cursor} style={{ x, y }}>
      <div className={clsx(s.label, { [s.visible]: title && subtitle })}>
        {title && <Text text={title} className={s.title} />}
        {subtitle && <Text text={subtitle} className={s.subtitle} />}
      </div>
    </motion.div>
  )
}

const useFollowPointer = (ref: RefObject<HTMLDivElement | null>) => {
  const spring = { damping: 30, stiffness: 200, restDelta: 0.005 }
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
  text: string | null
} & React.HTMLProps<HTMLSpanElement>

const Text: React.FC<TextProps> = ({ text, ...props }) => {
  if (!text) return
  const { ref } = useScramble({
    text: text,
  })

  return <span ref={ref} {...props} />
}
