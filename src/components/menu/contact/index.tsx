import { ExtLink } from '@/components/ext-link'

import s from './contact.module.scss'

export const Contact = () => (
  <div className={s.links}>
    <ExtLink href="https://github.com/thaslle">GitHub</ExtLink>
    <ExtLink href="https://www.linkedin.com/in/thaslle">LinkedIn</ExtLink>
    <ExtLink href="mailto:thalleslopesm@gmail.com">
      thalleslopesm@gmail.com
    </ExtLink>
  </div>
)
