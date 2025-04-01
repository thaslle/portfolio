import { useEffect, useState } from 'react'
import { useScramble } from 'use-scramble'

import s from './switcher.module.scss'

export const Switcher = () => {
  const roles = [
    { first: 'Creative', second: 'Developer' },
    { first: 'Digital', second: 'Designer' },
  ]
  const [currentRole, setCurrentRole] = useState(roles[0])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRole((prevRole) => {
        const currentIndex = roles.indexOf(prevRole)
        const nextIndex = (currentIndex + 1) % roles.length
        return roles[nextIndex]
      })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={s.wrapper}>
      <Text text={currentRole.first} />
      <Text text={currentRole.second} />
    </div>
  )
}

const Text = ({ text }: { text: string }) => {
  const { ref } = useScramble({
    text: text,
  })

  return <p className={s.roles} ref={ref} />
}

