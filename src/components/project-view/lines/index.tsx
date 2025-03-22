import React from 'react'
import { clsx } from 'clsx'
import { Line } from '@/utils/types'
import { Media } from './media'

import s from './lines.module.scss'

type LinesProps = {
  lines: Line[]
  title: string
}

export const Lines: React.FC<LinesProps> = ({ lines, title }) => (
  <div className={s.lines}>
    {lines &&
      lines.map((line, i) => {
        return (
          <div className={clsx(s.line, s[line.class])} key={i}>
            {line.media.map((media, i) => (
              <Media media={media} title={title} key={i} />
            ))}
          </div>
        )
      })}
  </div>
)
