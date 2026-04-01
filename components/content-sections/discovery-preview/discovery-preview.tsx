'use client'

import { motion } from 'motion/react'
import { Coffee } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { PhoneMockup } from './phone-mockup'
import { MapPreview } from './map-preview'

export function DiscoveryPreview() {
  return (
    <section className="py-20 sm:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Discover Local Rewards
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find partner merchants near campus and earn 3x-10x points on everyday purchases.
          </p>
        </ScrollReveal>

        {/* Content: Phone + Description */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Phone mockup */}
          <ScrollReveal className="flex-shrink-0">
            <PhoneMockup>
              <MapPreview />
            </PhoneMockup>
          </ScrollReveal>

          {/* Description + Notification */}
          <div className="flex-1 max-w-lg">
            <ScrollReveal>
              {/* Feature list */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Open the Omni app</h3>
                    <p className="text-muted-foreground text-sm">See partner merchants on the map with their reward multipliers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Get proximity alerts</h3>
                    <p className="text-muted-foreground text-sm">Receive notifications when you&apos;re near a merchant with boosted rewards.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pay with Omni</h3>
                    <p className="text-muted-foreground text-sm">Earn multiplied points automatically. No codes, no hassle.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Static notification preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="bg-background border border-border rounded-xl shadow-xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary via-green-500 to-amber-500" />
                <div className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">You&apos;re near Campus Coffee</p>
                    <p className="text-xs text-muted-foreground">
                      Earn <span className="font-bold text-primary">5x points</span> today
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Coffee className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
