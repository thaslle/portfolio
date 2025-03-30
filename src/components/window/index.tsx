'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTransitionState } from 'next-transition-router'
import { useScramble } from 'use-scramble'
import { motion } from 'motion/react'
import type { LenisRef } from 'lenis/react'

import { Scroll } from './scroll'
import { ExtLink } from '@/components/ext-link'
import { settings } from '@/utils/settings'

import s from './window.module.scss'
import { Handler } from './handler'

type WindowProps = {
  children: React.ReactNode
  title: string
  link?: string
  label?: string
  onClose: () => void
}

export const Window: React.FC<WindowProps> = ({
  children,
  title,
  label,
  link,
  onClose,
}) => {
  const { stage } = useTransitionState()
  const lenisRef = useRef<LenisRef>(null)
  const [dragY, setDragY] = useState(0)

  // Calls the close event when ESC is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const variants = {
    overlay: {
      leaving: {
        opacity: 0,
        backdropFilter: 'blur(0rem)',
      },
      entering: {
        opacity: 1,
        backdropFilter: 'blur(0.2rem)',
      },
    },
    window: {
      leaving: {
        scale: 0.95,
        opacity: 0,
        y: '5%',
      },
      entering: {
        scale: 1,
        opacity: 1,
        y: 0,
      },
    },
  }

  return (
    <div className={s.wrapper}>
      <motion.div
        className={s.overlay}
        onClick={onClose}
        initial={variants.overlay.leaving}
        animate={
          stage === 'leaving'
            ? variants.overlay.leaving
            : variants.overlay.entering
        }
        exit={variants.overlay.leaving}
        transition={{ duration: settings.duration }}
      />

      <motion.section
        className={s.window}
        initial={variants.window.leaving}
        animate={
          stage === 'leaving'
            ? variants.window.leaving
            : variants.window.entering
        }
        exit={variants.window.leaving}
        transition={{
          duration: settings.duration * 0.3,
          delay: settings.duration * 0.5,
        }}
        drag
        dragDirectionLock
        onDragStart={(event) => setDragY((event as any).y)}
        onDrag={(event) => {
          if ((event as any).y - dragY > 100) onClose()
        }}
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        dragElastic={0.2}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <Handler lenisRef={lenisRef} />

        <header className={s.header}>
          <Title text={title} />
          {link && <ExtLink href={link}>{label}</ExtLink>}
        </header>

        <Scroll lenisRef={lenisRef}>{children}</Scroll>
      </motion.section>
    </div>
  )
}

const Title = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false)
  const { ref } = useScramble({
    text: show ? text : '',
  })

  useEffect(() => {
    const interval = setTimeout(() => setShow(true), settings.duration * 1000)
    return () => clearTimeout(interval)
  }, [])

  return show && <h1 ref={ref} />
}
