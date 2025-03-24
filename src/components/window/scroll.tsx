'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cancelFrame, frame } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'

import s from './window.module.scss'

type ScrollProps = {
  children: React.ReactNode
  lenisRef: React.RefObject<LenisRef>
}

export const Scroll: React.FC<ScrollProps> = ({ children, lenisRef }) => {
  // const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp

      if (!lenisRef.current?.lenis) return

      lenisRef.current.lenis.raf(time)
      //onScrollProgress(lenisRef.current.lenis.progress)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis
      options={{ autoRaf: false }}
      ref={lenisRef}
      className={s.content}
    >
      {children}
    </ReactLenis>
  )
}

