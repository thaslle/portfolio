import React, { useState } from 'react'
import { Scramble } from '@/components/scramble'
import { useStore } from '@/hooks/use-store'
import { Category } from '@/utils/types'

import s from './list.module.scss'
import { Video } from '@/components/media'

type ListProps = {
  setShowMenu: () => void
}

type ItemListProps = {
  title: Category
  description: string
  video: string
}

type ItemProps = {
  props: ItemListProps
} & ListProps

export const List: React.FC<ListProps> = ({ setShowMenu }) => {
  const list: ItemListProps[] = [
    {
      title: 'Work',
      description: 'A glimpse of selected work',
      video: '/videos/menu/work.mp4',
    },
    {
      title: 'Craft',
      description: 'My lab for creative experiments',
      video: '/videos/menu/craft.mp4',
    },
  ]
  return (
    <div className={s.list}>
      <ul>
        {list &&
          list.map((item, i) => (
            <Item key={i} props={item} setShowMenu={setShowMenu} />
          ))}
      </ul>
    </div>
  )
}

const Item: React.FC<ItemProps> = ({ props, setShowMenu }) => {
  const [replay, setReplay] = useState(false)
  const { setFilter } = useStore()
  return (
    <li className={s.item}>
      <button
        onMouseOver={() => setReplay((prev) => !prev)}
        onFocus={() => setReplay((prev) => !prev)}
        onClick={() => {
          setFilter(props.title)
          setShowMenu()
        }}
      >
        <div className={s.video}>
          <Video src={props.video} aspect="1" />
        </div>
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
