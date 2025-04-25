'use client'

import React, { useLayoutEffect, useRef } from 'react'
import clsx from 'clsx'

import { useStore } from '@/hooks/use-store'
import s from './content.module.scss'

type ContentProps = {
  children: React.ReactNode
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  const { window } = useStore()

  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    const body = document.body
    const computedStyle = getComputedStyle(body)
    const remSpacing = parseFloat(
      computedStyle.getPropertyValue('--window-spacing').trim(),
    )
    const fontSize = parseFloat(computedStyle.fontSize)

    // Get the original dimensions of the section element
    const rect = body.getBoundingClientRect()
    const originalWidth = rect.width
    const originalHeight = rect.height
    const maxSize = Math.max(originalWidth, originalHeight)

    const spacing = remSpacing * fontSize

    const scaleFactor = 1 - spacing / maxSize

    // Calculate the scaled dimensions
    const scaledWidth = originalWidth * scaleFactor
    const scaledHeight = originalHeight * scaleFactor

    // Calculate the differences in dimensions (how much smaller the element becomes)
    const widthDiff = (spacing - (originalWidth - scaledWidth)) / 2
    const heightDiff = (spacing - (originalHeight - scaledHeight)) / 2

    // Apply the calculated values as CSS custom properties (CSS variables)
    ref.current.style.setProperty('--scale', `${scaleFactor}`)
    ref.current.style.setProperty('--heightDiff', `${heightDiff}px`)
    ref.current.style.setProperty('--widthDiff', `${widthDiff}px`)
  }, [])
  return (
    <div ref={ref} className={clsx(s.wrapper, { [s.open]: window })}>
      {children}
    </div>
  )
}

