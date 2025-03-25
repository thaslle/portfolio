import dynamic from 'next/dynamic'

const Clock = dynamic(() => import('@/components/clock'), {
  ssr: false,
})

import s from './ui.module.scss'
import { Filter } from '@/components/filter'

export const UI = () => (
  <div className={s.ui}>
    <div className={s.clock}>
      <Clock />
    </div>
    <div className={s.filter}>
      <Filter />
    </div>
  </div>
)
