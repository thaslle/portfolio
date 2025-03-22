'use client'
import { TransitionRouter } from 'next-transition-router'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      auto
      //   leave={(next) => {
      //     animate(
      //       wrapperRef.current,
      //       { opacity: [1, 0] },
      //       { duration: 0.5, onComplete: next }
      //     );
      //   }}
      //   enter={(next) => {
      //     animate(
      //       wrapperRef.current,
      //       { opacity: [0, 1] },
      //       { duration: 0.5, onComplete: next }
      //     );
      //   }}
    >
      {children}
    </TransitionRouter>
  )
}
