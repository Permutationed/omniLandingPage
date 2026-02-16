'use client'

import { FileText, Users, Code2, Activity, FileCheck } from 'lucide-react'
import { FeatureCard } from './feature-card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const features = [
  {
    icon: FileText,
    title: 'Study Design to Forms',
    description:
      'Automated translation of study design into data collection forms. Weeks instead of months.',
  },
  {
    icon: Users,
    title: 'Patient Matching',
    description:
      'Automated eligibility screening and patient matching with privacy and compliance built in.',
  },
  {
    icon: Code2,
    title: 'Statistical Outputs',
    description:
      'Automated dataset generation and reconciliation for faster database lock.',
  },
  {
    icon: Activity,
    title: 'Continuous Monitoring',
    description:
      'Automated oversight across sites. Flag issues before they become findings.',
  },
  {
    icon: FileCheck,
    title: 'Report Drafting',
    description:
      'Automated report generation with audit-ready outputs.',
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          High-Impact Integration Points
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Where Omni connects to your stack and where it delivers the biggest gains.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={<feature.icon className="size-8" />}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  )
}
