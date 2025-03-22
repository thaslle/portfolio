import React, { Suspense } from 'react'
import s from './video.module.scss'

type VideoProps = { aspect: string; src: string }

export const Video: React.FC<VideoProps> = ({ src, aspect }) => {
  return (
    <figure className={s.container} style={{ aspectRatio: aspect }}>
      <Suspense>
        <video
          className={s.video}
          controls={false}
          preload="none"
          aria-label="Video player"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Suspense>
    </figure>
  )
}
