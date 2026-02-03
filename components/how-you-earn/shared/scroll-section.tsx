'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

interface ScrollSectionProps {
  children: (progress: MotionValue<number>) => ReactNode
  fallback?: ReactNode
  className?: string
  id?: string
}

/**
 * Reusable scroll-animated section wrapper
 * Provides scroll progress (0-1) to children for coordinated animations
 */
export function ScrollSection({
  children,
  fallback,
  className = '',
  id,
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // Track from entering to leaving viewport
  })

  // If reduced motion, render fallback or static version
  if (prefersReducedMotion && fallback) {
    return (
      <section id={id} className={className}>
        {fallback}
      </section>
    )
  }

  return (
    <section ref={ref} id={id} className={`min-h-screen relative ${className}`}>
      {children(scrollYProgress)}
    </section>
  )
}

/**
 * Hook for creating scroll-linked transforms within a section
 */
export function useScrollTransform<T extends number | string>(
  progress: MotionValue<number>,
  inputRange: number[],
  outputRange: T[]
): MotionValue<T> {
  return useTransform(progress, inputRange, outputRange)
}
