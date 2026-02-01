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
      ease: 'easeOut',
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
