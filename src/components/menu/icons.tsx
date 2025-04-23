import { clsx } from 'clsx'

import s from './menu.module.scss'

export const IconHamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={clsx(s.icon, s.hamburger)}
  >
    <rect className={s.top} x="3" y="6" width="18" height="2" />
    <rect x="3" y="11" width="18" height="2" />
    <rect className={s.bottom} x="3" y="16" width="18" height="2" />
  </svg>
)

export const IconClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={clsx(s.icon, s.close)}
  >
    <rect
      className={s.left}
      x="3"
      y="11"
      width="18"
      height="2"
      transform="rotate(45, 12, 12)"
    />
    <rect
      className={s.right}
      x="3"
      y="11"
      width="18"
      height="2"
      transform="rotate(-45, 12, 12)"
    />
  </svg>
)
