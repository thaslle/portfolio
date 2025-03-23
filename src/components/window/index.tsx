'use client'

import React, { useEffect } from 'react'
import { useTransitionState } from 'next-transition-router'
import { motion } from 'motion/react'

import { ExtLink } from '@/components/ext-link'
import { settings } from '@/utils/settings'

import s from './window.module.scss'

type WindowProps = {
  children: React.ReactNode
  title: string
  link?: string
  onClose: () => void
}

export const Window: React.FC<WindowProps> = ({
  children,
  title,
  link,
  onClose,
}) => {
  const { stage } = useTransitionState()

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
      leaving: { opacity: 0 },
      entering: { opacity: 1 },
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
      >
        <div className={s.handler}>
          <div className={s.thumb}>
            <span></span>
          </div>
        </div>

        <header className={s.header}>
          <h1>{title}</h1>
          {link && <ExtLink href={link}>View live</ExtLink>}
        </header>
        <div className={s.content}>{children}</div>
      </motion.section>
    </div>
  )
}
