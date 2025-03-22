import s from './about.module.scss'
import { ExtLink } from '@/components/ext-link'

export const About = () => (
  <div className={s.about}>
    <p>
      Hello, I’m{'  '}
      <ExtLink href="https://www.linkedin.com/in/thaslle">Thalles</ExtLink>
      {'  '}a web developer & digital designer based in{'  '}
      <ExtLink href="https://google.com/search?q=city+of+sao+paulo">
        São Paulo
      </ExtLink>
    </p>

    <p>
      For over a decade, I’ve been creating engaging digital experiences through
      web design, architecture and illustration.
    </p>
  </div>
)
