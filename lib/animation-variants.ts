import type { Variants, Transition } from 'motion/react'

export const swoopEase = [0.16, 1, 0.3, 1] as const

export const navVariants: Variants = {
  visible: { y: '0%' },
  hidden: { y: '-100%' },
}
export const navTransition: Transition = { duration: 0.2, ease: 'easeInOut' }

export const scrollEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}
export const scrollEntranceTransition: Transition = {
  duration: 0.6,
  ease: swoopEase,
}

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

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const defaultViewport = { once: true, amount: 0.3 as const }
export const defaultRevealTransition: Transition = {
  duration: 0.6,
  ease: swoopEase,
}
