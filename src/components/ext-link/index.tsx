import React from 'react'
import { useScramble } from 'use-scramble'

import s from './ext-link.module.scss'

type ExtLinkProps = {
  children: React.ReactNode
  href: string
  arrow?: boolean
}

export const ExtLink: React.FC<ExtLinkProps> = ({
  children,
  href,
  arrow = true,
}) => {
  const { ref, replay } = useScramble({
    text: `${children?.toString()}${arrow && ' ↗'}`,
  })

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={s.link}
      onMouseOver={replay}
      onFocus={replay}
    />
  )
}
