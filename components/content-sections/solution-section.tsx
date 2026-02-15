'use client'

import { motion } from 'motion/react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { FeatureCard } from './feature-grid/feature-card'
import { staggerContainerVariants, slideUpVariants } from '@/lib/animation-variants'
import {
  FileSearch,
  FileCheck,
  Database,
  BarChart3,
  Activity,
  FileText,
  ShieldCheck,
} from 'lucide-react'

const agents = [
  { icon: FileSearch, title: 'Document Automation', description: 'Automated document processing and structuring.' },
  { icon: FileCheck, title: 'Analysis Intelligence', description: 'Automated analysis planning and gap detection.' },
  { icon: Database, title: 'Data Standards', description: 'Automated standards mapping and compliance.' },
  { icon: BarChart3, title: 'Statistical Outputs', description: 'Automated programming and dataset generation.' },
  { icon: Activity, title: 'Monitoring', description: 'Automated oversight and anomaly detection.' },
  { icon: FileText, title: 'Report Drafting', description: 'Automated regulatory narrative generation.' },
  { icon: ShieldCheck, title: 'Verification', description: 'Automated quality checks and validation.' },
]

export function SolutionSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          The Solution
        </h2>
        <h3 className="text-2xl font-semibold text-primary mb-4">
          Orchestrated AI — Not a Single Model
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Omni automates the full clinical trial workflow with coordinated, auditable outputs.
        </p>
      </ScrollReveal>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {agents.map((agent) => (
          <motion.div key={agent.title} variants={slideUpVariants}>
            <FeatureCard
              icon={<agent.icon className="size-8" />}
              title={agent.title}
              description={agent.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
