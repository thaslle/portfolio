import React, { useEffect } from 'react'
import { useScramble } from 'use-scramble'

type TextProps = {
  text: string
  onReplay: boolean
}

export const Scramble: React.FC<TextProps> = ({ text, onReplay }) => {
  const { ref, replay } = useScramble({
    text: text,
  })

  useEffect(() => {
    if (onReplay) replay()
  }, [onReplay])

  return <span ref={ref} />
}
