import s from './about.module.scss'
import { ExtLink } from '@/components/ext-link'

export const About = () => (
  <div className={s.about}>
    <p>
      I’m{'  '}
      <ExtLink href="https://www.linkedin.com/in/thaslle" play={false}>
        Thalles
      </ExtLink>
      {'  '}a web developer & digital designer based in{'  '}
      <ExtLink
        href="https://google.com/search?q=city+of+sao+paulo"
        play={false}
      >
        São Paulo
      </ExtLink>
    </p>

    <p>
      I’m driven by curiosity and a love for exploring new ideas, blending
      technical skills with playful, interactive experiences that lead us to
      unexpected and inspiring places.
    </p>
    <p>
      For me, design and development come together to create engaging,
      meaningful experiences. I’m captivated by the small details, the ones that
      can turn an ordinary moment into something special and bring a smile to
      your face.
    </p>
    <p>
      Whether I’m coding a smooth interface, creating an{' '}
      <ExtLink href="https://www.artstation.com/thaslle" play={false}>
        illustration
      </ExtLink>
      , or{' '}
      <ExtLink href="https://codepen.io/thaslle" play={false}>
        experimenting
      </ExtLink>{' '}
      with interactive elements, I’m always looking for ways to make{' '}
      <ExtLink href="https://www.behance.net/estudioamarelo" play={false}>
        creativity
      </ExtLink>{' '}
      feel fresh, fun, and full of possibilities.
    </p>
  </div>
)
