// Navigation hide/show variants
export const navVariants = {
  visible: { y: '0%' },
  hidden: { y: '-100%' },
}

export const navTransition = {
  duration: 0.2,
  ease: 'easeInOut' as const,
}

// Hero staggered animation variants
export const heroContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

export const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
}

// Metric card hover variants
export const cardHoverVariants = {
  rest: { y: 0 },
  hover: { y: -5 },
}

export const cardTransition = {
  duration: 0.2,
  ease: 'easeOut' as const,
}

// Icon hover animation for feature cards
export const iconHoverVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: -5 },
}

// === SCROLL REVEAL VARIANTS ===

import type { Variants, Transition } from 'motion/react'

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
}

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
}

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
}

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

// Stagger container (for grids/lists)
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// === TRANSITION PRESETS ===

export const defaultRevealTransition: Transition = {
  duration: 0.5,
  ease: 'easeOut',
}

export const quickRevealTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
}

export const springRevealTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
}

// === VIEWPORT PRESETS ===

export const defaultViewport = {
  once: true,
  amount: 0.3 as const,
}

export const fullViewport = {
  once: true,
  amount: 'all' as const,
}
