'use client'

import { motion } from 'motion/react'
import { useTransitionState } from 'next-transition-router'
import { useScramble } from 'use-scramble'

import { Media } from '@/components/media'
import { IconClose } from './icons'

import { useStore } from '@/hooks/use-store'
import { settings } from '@/utils/settings'
import { categories } from '@/utils/category-list'

import s from './menu.module.scss'

export const Filter = () => {
  const { stage } = useTransitionState()
  const { filter, setFilter } = useStore()

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

  const item = categories.find((category) => category.title === filter)

  return (
    item && (
      <motion.nav
        className={s.nav}
        initial={variants.nav.leaving}
        animate={
          stage === 'leaving' ? variants.nav.leaving : variants.nav.entering
        }
        exit={variants.nav.leaving}
        transition={{
          duration: settings.duration,
          delay: settings.delay,
          ease: settings.easeIn,
        }}
      >
        <div className={s.avatar}>
          <Media url={item.video} type="video" aspect="1" />
        </div>
        <Title text={item.title} />
        <Subtitle text={item.description} />

        <button aria-label="Menu" onClick={() => setFilter(null)}>
          <IconClose />
        </button>
      </motion.nav>
    )
  )
}

const Title = ({ text }: { text: string }) => {
  const { ref } = useScramble({
    text: text,
  })

  return <h1 ref={ref} />
}

const Subtitle = ({ text }: { text: string }) => {
  const {
    label: { tag },
  } = useStore()

  const { ref } = useScramble({
    text: tag ?? text,
  })

  return <p className={s.roles} ref={ref} />
}

