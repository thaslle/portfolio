import React from 'react'
import s from './ext-link.module.scss'

type ExtLinkProps = { children: React.ReactNode; href: string }

export const ExtLink: React.FC<ExtLinkProps> = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={s.link}>
    {children} ↗
  </a>
)
