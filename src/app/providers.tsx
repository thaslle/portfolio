'use client'

import { useStore } from '@/hooks/use-store'
import { settings } from '@/utils/settings'
import { TransitionRouter } from 'next-transition-router'

const delay = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000))

const checkPath = (path: string | undefined) => {
  if (!path) return
  if (path.includes('/project/')) return 'project'
  return 'home'
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const { setFromTo } = useStore()

  return (
    <TransitionRouter
      auto
      leave={async (next, from, to) => {
        const newFrom = checkPath(from)
        const newTo = checkPath(to)

        if (newFrom && newTo) setFromTo({ from: newFrom, to: newTo })

        // set a different time to wait if we are going from home
        const time =
          newFrom === 'home' ? settings.duration : settings.duration * 2.5

        await delay(time)
        next()
      }}
      enter={async (next) => {
        await delay(settings.duration)
        next()
      }}
    >
      {children}
    </TransitionRouter>
  )
}
