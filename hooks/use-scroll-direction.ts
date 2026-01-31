'use client'

import { useScroll, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'

export function useScrollDirection() {
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isAtTop, setIsAtTop] = useState(true)

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = current - previous
    setIsAtTop(current < 10)
    if (Math.abs(diff) > 10) {
      setScrollDirection(diff > 0 ? 'down' : 'up')
    }
  })

  return { scrollDirection, isAtTop, scrollY }
}
