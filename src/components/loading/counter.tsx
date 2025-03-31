'use client'

import { useRef } from 'react'
import {
  animate,
  KeyframeOptions,
  useIsomorphicLayoutEffect,
} from 'motion/react'

type CounterProps = {
  to: number
  onProgress: (progress: number) => void
  animationOptions?: KeyframeOptions
}

export const Counter = ({ to, onProgress, animationOptions }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const fromRef = useRef(0)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    const from = fromRef.current

    if (!element) return

    // Set initial value
    element.textContent = String(from)

    const controls = animate(from, to, {
      duration: 1,
      ease: 'easeOut',
      ...animationOptions,
      onUpdate(value) {
        const progress = Math.max(fromRef.current, value)

        element.textContent = progress.toFixed(0)
        fromRef.current = progress

        // Update smoothProgress
        onProgress(progress)
      },
    })

    // Cancel on unmount
    return () => {
      controls.stop()
    }
  }, [ref, to])

  return <span ref={ref}>0</span>
}

