'use client'

import { motion } from 'motion/react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { staggerContainerVariants, slideUpVariants } from '@/lib/animation-variants'
import { AlertCircle, Database, Clock, Users } from 'lucide-react'

const points = [
  {
    icon: Clock,
    text: 'Phase II → III transitions still take years',
  },
  {
    icon: Database,
    text: 'More data per trial, same timelines',
  },
  {
    icon: AlertCircle,
    text: 'Long operational gaps and delays',
  },
  {
    icon: Users,
    text: 'Manual handoffs across teams and systems',
  },
]

export function ProblemSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          The Problem — Clinical Trials Are Drowning in Data
        </h2>
        <h3 className="text-2xl font-semibold text-primary mb-4">
          More Data. Same Timelines.
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Legacy workflows can&apos;t keep up. Modern trials need automation.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {points.map((item) => (
          <motion.div
            key={item.text}
            variants={slideUpVariants}
            className="flex items-start gap-4 rounded-xl bg-card p-6 border border-border/50"
          >
            <item.icon className="size-6 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
