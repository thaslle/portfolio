import clsx from 'clsx'
import Image from 'next/image'

import { MediaItem } from '@/utils/types'
import s from './lines.module.scss'

export const Media: React.FC<{ media: MediaItem; title: string }> = ({
  media,
  title,
}) => {
  switch (media.type) {
    case 'image':
      return (
        <figure className={clsx(s.media, s.image)}>
          <Image src={media.url} alt={title} fill={true} />
        </figure>
      )
    case 'video':
      return (
        <figure className={clsx(s.media, s.video)}>
          <iframe
            src={media.url}
            allow="autoplay; fullscreen"
            allowFullScreen
            data-ready="true"
            title={title}
          ></iframe>
        </figure>
      )
  }
}
