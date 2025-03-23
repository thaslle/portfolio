'use client'
import { settings } from '@/utils/settings'
import { TransitionRouter } from 'next-transition-router'

const delay = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000))

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      auto
      leave={async (next) => {
        await delay(settings.duration)
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
