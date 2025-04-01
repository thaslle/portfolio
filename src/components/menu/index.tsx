'use client'

import { useEffect, useState } from 'react'
import { Window } from '@/components/window'
import { Ascii } from '@/components/ascii'
import { AnimatePresence } from 'motion/react'

import { Avatar } from '@/components/avatar'
import { About } from './about'
import { List } from './list'
import { Contact } from './contact'
import { Header } from './header'
import { Switcher } from './switcher'

import { settings } from '@/utils/settings'
import s from './menu.module.scss'

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showMenuItems, setShowMenuItems] = useState(false)

  useEffect(() => {
    if (!showMenu) {
      setShowMenuItems(false)
      return
    }

    const timer = setTimeout(
      () => setShowMenuItems(showMenu),
      settings.duration * 300,
    )

    return () => clearTimeout(timer)
  }, [showMenu])

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
                <div className={s.avatar}>{showMenuItems && <Avatar />}</div>
                <div className={s.ascii}>{showMenuItems && <Ascii />}</div>
                <div className={s.switcher}>
                  {showMenuItems && <Switcher />}
                </div>
              </div>
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

