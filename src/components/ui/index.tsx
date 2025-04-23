import dynamic from 'next/dynamic'

const Clock = dynamic(() => import('@/components/clock'), {
  ssr: false,
})

import s from './ui.module.scss'

export const UI = () => (
  <div className={s.ui}>
    <div className={s.clock}>
      <Clock />
    </div>
  </div>
)
