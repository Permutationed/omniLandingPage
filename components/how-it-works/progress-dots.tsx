'use client'

import { type RefObject } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'

interface ProgressDotsProps {
  progress: MotionValue<number>
  containerRef: RefObject<HTMLElement | null>
}

const steps = [
  { label: 'Swipe Card', position: 0.15 },
  { label: 'Process', position: 0.5 },
  { label: 'Split Funds', position: 0.85 },
] as const

interface ProgressDotProps {
  step: (typeof steps)[number]
  progress: MotionValue<number>
  onClick: () => void
}

function ProgressDot({ step, progress, onClick }: ProgressDotProps) {
  const scale = useTransform(
    progress,
    [step.position - 0.15, step.position, step.position + 0.15],
    [1, 1.5, 1]
  )
  const opacity = useTransform(
    progress,
    [step.position - 0.15, step.position, step.position + 0.15],
    [0.4, 1, 0.4]
  )

  return (
    <button
      type="button"
      aria-label={`Go to ${step.label}`}
      onClick={onClick}
      className="group relative p-4 -m-4 touch-manipulation focus-visible:outline-none"
    >
      <motion.div
        className="w-3 h-3 rounded-full bg-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        style={{ scale, opacity }}
      />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {step.label}
      </span>
    </button>
  )
}

export function ProgressDots({ progress, containerRef }: ProgressDotsProps) {
  // Show dots only when section is in viewport
  const dotsOpacity = useTransform(
    progress,
    [0, 0.02, 0.98, 1],
    [0, 1, 1, 0]
  )

  const scrollToStep = (stepPosition: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollableDistance = container.scrollHeight - window.innerHeight
    const targetScrollTop = container.offsetTop + (scrollableDistance * stepPosition)

    window.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })
  }

  return (
    <motion.nav
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50"
      aria-label="How it works steps"
      style={{ opacity: dotsOpacity }}
    >
      {steps.map((step) => (
        <ProgressDot
          key={step.label}
          step={step}
          progress={progress}
          onClick={() => scrollToStep(step.position)}
        />
      ))}
    </motion.nav>
  )
}
