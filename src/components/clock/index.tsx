'use client'

import React, { useState, useEffect } from 'react'
import s from './clock.module.scss'

export const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Function to update the time every second
    const updateTime = () => {
      const localTime = new Date()
      // Adjusting time to São Paulo (GMT -3) by using UTC time
      const saoPauloTime = new Date(
        localTime.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }),
      )
      setTime(saoPauloTime)
    }

    updateTime() // Initial update
    const interval = setInterval(updateTime, 1000) // Update time every second

    return () => clearInterval(interval) // Cleanup on component unmount
  }, [])

  const formatTime = (date: Date) => {
    const timeString = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    const parts = timeString.split(':')
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && <span>:</span>}
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <nav className={s.location}>
      <p>
        São Paulo, <span className={s.clock}>{formatTime(time)}</span>
      </p>
    </nav>
  )
}

export default Clock

