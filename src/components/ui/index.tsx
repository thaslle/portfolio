import { Menu } from '@/components/menu'
import { Clock } from '@/components/clock'

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
