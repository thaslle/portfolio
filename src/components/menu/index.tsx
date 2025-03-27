'use client'

import { useState } from 'react'
import { Window } from '@/components/window'
import { Ascii } from '@/components/ascii'
import { AnimatePresence } from 'motion/react'

import { About } from './about'
import { List } from './list'
import { Contact } from './contact'

import s from './menu.module.scss'
import { Header } from './header'

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className={s.wrapper}>
      <nav className={s.menu}>
        <AnimatePresence>
          {!showMenu && (
            <Header setShowMenu={() => setShowMenu((prev) => !prev)} />
          )}

          {showMenu && (
            <Window title="Thalles Lopes" onClose={() => setShowMenu(false)}>
              <Ascii />
              <About />
              <List setShowMenu={() => setShowMenu(false)} />
              <Contact />
            </Window>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

