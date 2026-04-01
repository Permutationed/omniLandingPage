'use client'

import { motion } from 'motion/react'
import { heroContainerVariants, heroItemVariants } from '@/lib/animation-variants'
import { EmailCapture } from './email-capture'

export function HeroContent() {
  return (
    <motion.div
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      className="text-center max-w-4xl mx-auto"
    >
      <motion.h1
        variants={heroItemVariants}
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] text-foreground leading-[1.1]"
      >
        Earn Rewards on Your{' '}
        <span className="text-primary">Biggest Expense</span>
      </motion.h1>

      <motion.p
        variants={heroItemVariants}
        className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
      >
        Pay tuition through the Omni platform. Earn points on tuition.
        Maximize rewards as a student.
      </motion.p>

      <motion.div variants={heroItemVariants} className="mt-8">
        <EmailCapture />
      </motion.div>

      <motion.p
        variants={heroItemVariants}
        className="mt-6 text-sm text-muted-foreground"
      >
        <span className="inline-flex items-center gap-2">
          <span>Bank-level security</span>
          <span className="text-border">|</span>
          <span>No fees for schools</span>
          <span className="text-border">|</span>
          <span>Rewards from day one</span>
        </span>
      </motion.p>
    </motion.div>
  )
}
