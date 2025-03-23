'use client'

import { motion } from 'motion/react'
import { useTransitionState } from 'next-transition-router'
import { IconHamburger } from './icons'
import { settings } from '@/utils/settings'

import s from './menu.module.scss'

type HeaderProps = {
  setShowMenu: () => void
}

export const Header: React.FC<HeaderProps> = ({ setShowMenu }) => {
  const { stage } = useTransitionState()

  const variants = {
    header: {
      leaving: {
        scale: 0.98,
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
    <motion.header
      className={s.float}
      initial={variants.header.leaving}
      animate={
        stage === 'leaving' ? variants.header.leaving : variants.header.entering
      }
      exit={variants.header.leaving}
      transition={{ duration: settings.duration * 0.2 }}
    >
      <figure></figure>
      <h1>Thalles Lopes</h1>
      <p className={s.roles}>Creative Developer</p>

      <button aria-label="Menu" onClick={setShowMenu}>
        <IconHamburger />
      </button>
    </motion.header>
  )
}
