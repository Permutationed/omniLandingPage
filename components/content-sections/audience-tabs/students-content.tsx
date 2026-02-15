'use client'

import { Building2, FileCheck, Zap, Clock, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Building2,
    title: 'End-to-End Acceleration',
    description: 'From study design through submission with a single auditable workflow.',
  },
  {
    icon: FileCheck,
    title: 'Regulatory Readiness',
    description: 'Compliant outputs with traceability to submission.',
  },
  {
    icon: Zap,
    title: 'Faster Time to Lock',
    description: 'Automated mapping and generation shrink timelines.',
  },
  {
    icon: Clock,
    title: 'Capacity Reclamation',
    description: 'Reclaim 25–40% of capacity from manual tasks.',
  },
  {
    icon: Shield,
    title: 'Audit-Ready',
    description: 'Traceability and human oversight for compliance.',
  },
]

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon
  return (
    <div className="bg-card rounded-xl p-6 border border-border/50">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="font-semibold mb-2">{benefit.title}</h3>
      <p className="text-muted-foreground text-sm">{benefit.description}</p>
    </div>
  )
}

export function SponsorsContent() {
  const topRow = benefits.slice(0, 3)
  const bottomRow = benefits.slice(3, 5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topRow.map((benefit) => (
        <BenefitCard key={benefit.title} benefit={benefit} />
      ))}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center">
        <div className="flex gap-6 w-full lg:w-2/3 max-w-full">
          {bottomRow.map((benefit) => (
            <div key={benefit.title} className="flex-1 min-w-0">
              <BenefitCard benefit={benefit} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
