'use client'

import { Users, Eye, MapPinned, TrendingUp, BadgePercent } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Users,
    title: 'Student Customer Acquisition',
    description: 'Connect with thousands of students actively seeking local deals and rewards.',
  },
  {
    icon: Eye,
    title: 'Visibility Through Omni App',
    description: 'Your business appears on campus maps and discovery feeds in the Omni app.',
  },
  {
    icon: MapPinned,
    title: 'Location-Based Reach',
    description: "Target students when they're nearby with proximity-based notifications.",
  },
  {
    icon: TrendingUp,
    title: 'Drive Foot Traffic',
    description: 'Convert app users into in-store customers with compelling reward offers.',
  },
  {
    icon: BadgePercent,
    title: 'Flexible Reward Tiers',
    description: 'Set your own multipliers (3x-10x) to match your marketing goals and budget.',
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

export function MerchantsContent() {
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
