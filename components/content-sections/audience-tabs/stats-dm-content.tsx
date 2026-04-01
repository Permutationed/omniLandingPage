'use client'

import { Code2, Database, FileText, GitBranch, CheckCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Code2,
    title: 'Dataset Automation',
    description: 'Automated dataset generation with gap detection and validation.',
  },
  {
    icon: Database,
    title: 'Data Lineage',
    description: 'Full traceability from source to output. Audit-ready for every deliverable.',
  },
  {
    icon: FileText,
    title: 'Analysis Outputs',
    description: 'Automated tables and figures. Weeks→hours for standard outputs.',
  },
  {
    icon: GitBranch,
    title: 'Automatic Propagation',
    description: 'Change upstream and outputs update automatically.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    description: 'Automated verification for higher accuracy.',
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

export function StatsDataManagementContent() {
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
