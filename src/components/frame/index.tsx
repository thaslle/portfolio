import React from 'react'

import s from './frame.module.scss'

type FrameProps = {
  children: React.ReactNode
}

export const Frame: React.FC<FrameProps> = ({ children }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.frame}>{children}</div>
    </div>
  )
}
