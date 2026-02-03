'use client'

import { GraduationCap, Wallet, MapPin, Bell, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Wallet,
    title: 'Rewards on Tuition',
    description: 'Earn up to 1% cash back on every tuition payment. No caps, no gimmicks.',
  },
  {
    icon: TrendingUp,
    title: 'Better Loan Rates',
    description: 'Unlock lower interest rates as you build payment history with Omni.',
  },
  {
    icon: MapPin,
    title: '3x-10x Merchant Points',
    description: 'Discover local businesses near campus offering boosted reward multipliers.',
  },
  {
    icon: GraduationCap,
    title: 'Campus Discovery',
    description: 'Find the best student deals and rewards at businesses around your school.',
  },
  {
    icon: Bell,
    title: 'Proximity Notifications',
    description: "Get alerts when you're near a partner merchant with elevated rewards.",
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

export function StudentsContent() {
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
