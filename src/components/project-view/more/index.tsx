import React, { useState } from 'react'
import Link from 'next/link'

import { Scramble } from '@/components/scramble'
import { Media } from '@/components/media'

import { Project } from '@/utils/types'

import s from './more.module.scss'

type MoreProps = {
  prev: Project
  next: Project
}

type ItemProps = {
  props: Project
}

export const More: React.FC<MoreProps> = ({ prev, next }) => {
  return (
    <div className={s.more}>
      <Item props={prev} />
      <Item props={next} />
    </div>
  )
}

const Item: React.FC<ItemProps> = ({ props }) => {
  const [replay, setReplay] = useState(false)
  return (
    <div className={s.item}>
      <Link
        href={`/project/${props.slug}`}
        onMouseOver={() => setReplay((prev) => !prev)}
        onFocus={() => setReplay((prev) => !prev)}
      >
        <div className={s.group}>
          <div className={s.video}>
            <Media {...props.media} aspect="1" />
          </div>

          <h3>
            <Scramble text={props.title} onReplay={replay} />
          </h3>
          <p className={s.info}>
            <Scramble text={props.category} onReplay={replay} />
          </p>
        </div>
      </Link>
    </div>
  )
}
