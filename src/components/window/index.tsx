'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTransitionState } from 'next-transition-router'
import { useScramble } from 'use-scramble'
import { motion } from 'motion/react'
import type { LenisRef } from 'lenis/react'

import { Handler } from './handler'
import { Scroll } from './scroll'
import { ExtLink } from '@/components/ext-link'
import { Portal } from '@/components/portal'

import { settings } from '@/utils/settings'
import { useStore } from '@/hooks/use-store'
import { animations } from './animations'

import s from './window.module.scss'

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
  const { fromTo, setWindow } = useStore()
  const { stage } = useTransitionState()
  const lenisRef = useRef<LenisRef>(null)
  const [dragY, setDragY] = useState(0)

  const [hasMounted, setHasMounted] = useState(false)
  useLayoutEffect(() => {
    setHasMounted(true)

    // Update window opened state
    setWindow(true)

    return () => setWindow(false)
  }, [])

  // Calls the close event when ESC is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const fromProject = fromTo.from === 'project' && fromTo.to === 'project'

  const variants = {
    overlay: {
      leaving: fromProject
        ? animations.overlay.leaving.fromProject
        : animations.overlay.leaving.fromHome,
      entering: fromProject
        ? animations.overlay.entering.fromProject
        : animations.overlay.entering.fromHome,
    },
    window: {
      leaving: fromProject
        ? animations.window.leaving.fromProject
        : animations.window.leaving.fromHome,
      entering: fromProject
        ? animations.window.entering.fromProject
        : animations.window.entering.fromHome,
    },

    wrapper: {
      leaving: fromProject
        ? animations.wrapper.leaving.fromProject
        : animations.wrapper.leaving.fromHome,
      entering: fromProject
        ? animations.wrapper.entering.fromProject
        : animations.wrapper.entering.fromHome,
    },
  }

  return (
    <>
      {hasMounted && (
        <motion.section
          key="window"
          className={s.window}
          initial={variants.window.leaving}
          animate={
            stage === 'leaving'
              ? variants.window.leaving
              : variants.window.entering
          }
          exit={variants.window.leaving}
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
          <motion.section
            key="wrapper"
            className={s.wrapper}
            initial={variants.wrapper.leaving}
            animate={
              stage === 'leaving'
                ? variants.wrapper.leaving
                : variants.wrapper.entering
            }
            exit={variants.wrapper.leaving}
          >
            <Handler lenisRef={lenisRef} />

            <header className={s.header}>
              <Title text={title} />
              {link && <ExtLink href={link}>{label}</ExtLink>}
            </header>

            <Scroll lenisRef={lenisRef}>{children}</Scroll>
          </motion.section>
        </motion.section>
      )}

      <Portal>
        <motion.div
          key="overlay"
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
      </Portal>
    </>
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

