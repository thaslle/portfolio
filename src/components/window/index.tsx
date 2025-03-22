'use client'

import React, { useEffect } from 'react'
import { ExtLink } from '@/components/ext-link'

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
  // Calls the close event when ESC is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className={s.overlay} onClick={onClose}>
      <section className={s.window}>
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
      </section>
    </div>
  )
}
