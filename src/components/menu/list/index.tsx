import React, { useState } from 'react'
import { Scramble } from '@/components/scramble'

import s from './list.module.scss'

type ItemProps = {
  title: string
  description: string
}

export const List = () => {
  const list: ItemProps[] = [
    { title: 'Work', description: 'A glimpse of selected work' },
    { title: 'Craft', description: 'My lab for creative experiments' },
  ]
  return (
    <div className={s.list}>
      <ul>{list && list.map((item, i) => <Item key={i} props={item} />)}</ul>
    </div>
  )
}

const Item = ({ props }: { props: ItemProps }) => {
  const [replay, setReplay] = useState(false)
  return (
    <li className={s.item}>
      <button
        onMouseOver={() => setReplay((prev) => !prev)}
        onFocus={() => setReplay((prev) => !prev)}
      >
        <figure></figure>
        <h2>
          <Scramble text={props.title} onReplay={replay} />
        </h2>
        <p className={s.info}>
          <Scramble text={props.description} onReplay={replay} />
        </p>
      </button>
    </li>
  )
}
