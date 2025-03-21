import { Menu } from '@/components/menu'

import s from './ui.module.scss'

export const UI = () => (
  <div className={s.ui}>
    <div className={s.clock}>São Paulo, 8:31 pm</div>
    <div className={s.menu}>
      <Menu />
    </div>
  </div>
)
