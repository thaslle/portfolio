import React from 'react'
import s from './window.module.scss'

type WindowProps = { children: React.ReactNode; title: string }

export const Window: React.FC<WindowProps> = ({ children, title }) => {
  return (
    <div className={s.overlay}>
      <section className={s.window}>
        <div className={s.handler}>
          <div className={s.thumb}>
            <span></span>
          </div>
        </div>

        <header className={s.header}>
          <h1>{title}</h1>
        </header>
        <div className={s.content}>{children}</div>
      </section>
    </div>
  )
}
