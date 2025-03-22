import React from 'react'
import Link from 'next/link'
import { Video } from '@/components/video'

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

const Item: React.FC<ItemProps> = ({ props }) => (
  <div className={s.item}>
    <Link href={`/project/${props.slug}`}>
      <div className={s.group}>
        <div className={s.video}>
          <Video src={props.video} aspect="1" />
        </div>

        <h3>{props.title}</h3>
        <p className={s.info}>{props.category}</p>
      </div>
    </Link>
  </div>
)
