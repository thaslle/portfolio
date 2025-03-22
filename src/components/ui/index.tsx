import dynamic from 'next/dynamic'
import { Menu } from '@/components/menu'

const Clock = dynamic(() => import('@/components/clock'), {
  ssr: false,
})

import s from './ui.module.scss'

export const UI = () => (
  <div className={s.ui}>
    <div className={s.clock}>
      <Clock />
    </div>
    <div className={s.menu}>
      <Menu />
    </div>
  </div>
)
