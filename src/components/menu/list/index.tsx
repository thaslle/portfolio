import React from 'react'
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

const Item = ({ props }: { props: ItemProps }) => (
  <li className={s.item}>
    <button>
      <figure></figure>
      <h2>{props.title}</h2>
      <p className={s.info}>{props.description}</p>
    </button>
  </li>
)
