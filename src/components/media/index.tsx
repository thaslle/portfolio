import React, { Suspense } from 'react'
import Image from 'next/image'

import { MediaItem } from '@/utils/types'
import s from './media.module.scss'

export const Media: React.FC<MediaItem> = ({ url, aspect, type }) => {
  return (
    <figure className={s.container} style={{ aspectRatio: aspect }}>
      {type === 'video' && (
        <Suspense>
          <video
            className={s.media}
            controls={false}
            preload="none"
            aria-label="Video player"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Suspense>
      )}

      {type === 'image' && (
        <Image className={s.media} src={url} alt="Cover" fill={true} />
      )}
    </figure>
  )
}
