'use client'

import { motion } from 'motion/react'
import { cardHoverVariants, cardTransition } from '@/lib/animation-variants'

interface MetricCardProps {
  value: string
  label: string
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={cardTransition}
      className="bg-card rounded-xl p-8 shadow-md border border-border/50 cursor-default"
      style={{ willChange: 'transform' }}
    >
      <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{value}</div>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
    </motion.div>
  )
}

const metrics = [
  { value: '$50B+', label: 'Built for tuition payments' },
  { value: 'Zero', label: 'Fees for schools' },
  { value: '3x-10x', label: 'Merchant reward multipliers' },
  { value: 'Day 1', label: 'Start earning immediately' },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} value={metric.value} label={metric.label} />
      ))}
    </div>
  )
}
