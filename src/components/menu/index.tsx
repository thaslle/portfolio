'use client'

import { useState } from 'react'
import { Window } from '@/components/window'
import { Ascii } from '@/components/ascii'
import { AnimatePresence } from 'motion/react'

import { Avatar } from '@/components/avatar'
import { About } from './about'
import { List } from './list'
import { Contact } from './contact'
import { Header } from './header'

import s from './menu.module.scss'

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className={s.wrapper}>
      <nav className={s.menu}>
        <AnimatePresence>
          {!showMenu && (
            <Header
              key="header"
              setShowMenu={() => setShowMenu((prev) => !prev)}
            />
          )}

          {showMenu && (
            <Window
              key="window"
              title="Get to know me"
              onClose={() => setShowMenu(false)}
            >
              <div className={s.interactive}>
                <Avatar />
              </div>
              <About />
              <List setShowMenu={() => setShowMenu(false)} />
              <Contact />
              <div className={s.ascii}>
                <Ascii />
              </div>
            </Window>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

