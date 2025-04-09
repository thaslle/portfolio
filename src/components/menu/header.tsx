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
      <div className={s.avatar}>
        <Avatar />
      </div>
      <Title />
      <Roles />

      <button aria-label="Menu" onClick={setShowMenu}>
        <IconHamburger />
      </button>
    </motion.header>
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

