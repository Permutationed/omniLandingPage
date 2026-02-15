'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { heroContainerVariants, heroItemVariants } from '@/lib/animation-variants'
import { Button } from '@/components/ui/button'

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
        End to end automation for{' '}
        <span className="text-primary">clinical trials</span>
      </motion.h1>

      <motion.p
        variants={heroItemVariants}
        className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
      >
        AI infrastructure that automates clinical trial operations from design through submission.
      </motion.p>

      <motion.p
        variants={heroItemVariants}
        className="mt-4 text-base text-muted-foreground"
      >
        Built for regulated environments. Human oversight. Audit-ready.
      </motion.p>

      <motion.div
        variants={heroItemVariants}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <a href="#request-demo">Request Demo</a>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
          <Link href="#architecture">See Architecture</Link>
        </Button>
      </motion.div>

      <motion.p
        variants={heroItemVariants}
        className="mt-6 text-sm text-muted-foreground"
      >
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <span>Regulated</span>
          <span className="text-border">|</span>
          <span>Automated</span>
          <span className="text-border">|</span>
          <span>Audit-ready</span>
        </span>
      </motion.p>
    </motion.div>
  )
}
