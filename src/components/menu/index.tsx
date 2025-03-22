'use client'

import { useState } from 'react'
import { Window } from '@/components/window'

import { About } from './about'
import { List } from './list'
import { IconHamburger } from './icons'

import s from './menu.module.scss'

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <nav className={s.menu}>
      <header className={s.float}>
        <figure></figure>
        <h1>Thalles Lopes</h1>
        <p className={s.roles}>Creative Developer</p>

        <button aria-label="Menu" onClick={() => setShowMenu((prev) => !prev)}>
          <IconHamburger />
        </button>
      </header>

      {showMenu && (
        <Window title="Thalles Lopes">
          <figure className={s.highlight}></figure>
          <About />
          <List />
        </Window>
      )}
    </nav>
  )
}
