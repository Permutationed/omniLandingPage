'use client'

import { motion } from 'motion/react'
import { Gift, Building2, Clock, Shield, Activity, Brain } from 'lucide-react'
import { FeatureCard } from './feature-card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import {
  staggerContainerVariants,
  slideUpVariants,
} from '@/lib/animation-variants'

const features = [
  {
    icon: Gift,
    title: 'Rewards on Tuition',
    description:
      'Earn cash back every time you pay tuition. Up to 1% back on qualifying payments.',
  },
  {
    icon: Building2,
    title: 'Zero School Fees',
    description:
      'Schools pay nothing. Omni covers all processing costs so institutions can focus on education.',
  },
  {
    icon: Clock,
    title: 'Pay Over Time',
    description:
      'Flexible payment plans that fit your budget. No hidden fees, no surprises.',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description:
      'Your data is protected with enterprise-grade encryption and fraud monitoring.',
  },
  {
    icon: Activity,
    title: 'Real-Time Tracking',
    description:
      'Monitor your payments, rewards, and spending from a single dashboard.',
  },
  {
    icon: Brain,
    title: 'Smart Underwriting',
    description:
      'Our AI-powered system offers personalized rates based on your complete financial picture.',
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Why Omni?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          The smart way to pay for education with rewards that actually matter.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={slideUpVariants}>
            <FeatureCard
              icon={<feature.icon className="size-8" />}
              title={feature.title}
              description={feature.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
