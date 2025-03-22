import React from 'react'
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
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={s.link}>
    {children} {arrow && '↗'}
  </a>
)
