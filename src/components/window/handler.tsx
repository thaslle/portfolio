'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, frame, cancelFrame } from 'motion/react'
import type { LenisRef } from 'lenis/react'

import s from './window.module.scss'

type handlerProps = {
  lenisRef: React.RefObject<LenisRef>
}

export const Handler: React.FC<handlerProps> = ({ lenisRef }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      if (!lenisRef.current?.lenis) return
      setProgress(lenisRef.current.lenis.progress)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <div className={s.handler}>
      <div className={s.thumb}>
        <motion.span style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}

