import React, { useState } from 'react'

import { Scramble } from '@/components/scramble'
import { Media } from '@/components/media'

import { useStore } from '@/hooks/use-store'
import { CategoryList } from '@/utils/types'
import { categories } from '@/utils/category-list'

import s from './list.module.scss'

type ListProps = {
  setShowMenu: () => void
}

type ItemProps = {
  props: CategoryList
} & ListProps

export const List: React.FC<ListProps> = ({ setShowMenu }) => {
  return (
    <div className={s.list}>
      <ul>
        {categories &&
          categories.map((item, i) => (
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
          <Media url={props.video} type="video" aspect="1" />
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

