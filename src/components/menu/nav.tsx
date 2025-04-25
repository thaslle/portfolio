'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useTransitionState } from 'next-transition-router'
import { useScramble } from 'use-scramble'

import { IconHamburger } from './icons'
import { Avatar } from '@/components/avatar'

import { useStore } from '@/hooks/use-store'
import { settings } from '@/utils/settings'

import s from './menu.module.scss'

type NavProps = {
  setShowMenu: () => void
}

export const Nav: React.FC<NavProps> = ({ setShowMenu }) => {
  const { stage } = useTransitionState()

  const variants = {
    nav: {
      leaving: {
        opacity: 0,
      },
      entering: {
        opacity: 1,
      },
    },
  }

  return (
    <motion.nav
      className={s.nav}
      initial={variants.nav.leaving}
      animate={
        stage === 'leaving' ? variants.nav.leaving : variants.nav.entering
      }
      exit={variants.nav.leaving}
      transition={{
        duration: settings.duration,
        ease: settings.easeIn,
      }}
    >
      <div className={s.avatar}>
        <Avatar />
      </div>
      <Title />
      <Roles />

      <button aria-label="Menu" onClick={setShowMenu}>
        <IconHamburger />
      </button>
    </motion.nav>
  )
}

const Title = () => {
  const {
    label: { tag },
  } = useStore()

  const { ref } = useScramble({
    text: tag ?? 'Thalles Lopes',
  })

  return <h1 ref={ref} />
}

const Roles = () => {
  const roles = ['Creative Developer', 'Digital Designer']
  const [currentRole, setCurrentRole] = useState(roles[0])

  const {
    label: { tag },
  } = useStore()

  const { ref } = useScramble({
    text: tag ? '' : currentRole,
  })

  useEffect(() => {
    if (tag) return

    const intervalId = setInterval(() => {
      setCurrentRole((prevRole) => {
        const currentIndex = roles.indexOf(prevRole)
        const nextIndex = (currentIndex + 1) % roles.length
        return roles[nextIndex]
      })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  return <p className={s.roles} ref={ref} />
}
