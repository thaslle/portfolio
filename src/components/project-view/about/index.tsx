import React from 'react'
import s from './about.module.scss'

type AboutProps = { description: string }

export const About: React.FC<AboutProps> = ({ description }) => (
  <div className={s.about}>
    <p>{description}</p>
  </div>
)
