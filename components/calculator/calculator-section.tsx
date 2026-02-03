'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { EmailCapture } from '@/components/hero/email-capture'
import { TuitionSlider } from './tuition-slider'
import { SpendSlider } from './spend-slider'
import { TrendingUp } from 'lucide-react'

export function CalculatorSection() {
  const [tuition, setTuition] = useState(9000)
  const [monthlySpend, setMonthlySpend] = useState(300)

  const results = useMemo(() => {
    const annualSpend = monthlySpend * 12

    // Base Points: 1 point per $1 on all spend
    const basePoints = tuition + annualSpend

    // Bonus thresholds
    const threshold20 = tuition * 0.20
    const threshold40 = tuition * 0.40

    let bonusValue = 0
    let bonusRate = 0
    let nextThreshold = threshold20
    let spendToNextTier = threshold20 - annualSpend

    if (annualSpend >= threshold40) {
      bonusValue = tuition * 0.01
      bonusRate = 1.0
      nextThreshold = threshold40
      spendToNextTier = 0 // Already at max
    } else if (annualSpend >= threshold20) {
      bonusValue = tuition * 0.005
      bonusRate = 0.5
      nextThreshold = threshold40
      spendToNextTier = threshold40 - annualSpend
    }

    const totalValue = (basePoints * 0.01) + bonusValue
    const tuitionReduction = (totalValue / tuition) * 100

    return {
      totalPoints: Math.round(basePoints),
      totalValue: Math.round(totalValue),
      tuitionReduction: Math.round(tuitionReduction * 10) / 10,
      bonusRate,
      annualSpend,
      threshold20,
      threshold40,
      spendToNextTier: Math.max(0, spendToNextTier),
      atMaxTier: annualSpend >= threshold40,
    }
  }, [tuition, monthlySpend])

  // Calculate monthly spend needed to reach next tier
  const monthlyToNextTier = Math.ceil(results.spendToNextTier / 12)

  return (
    <section id="calculator" className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <ScrollReveal className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Calculate Your Rewards
          </h2>
          <p className="text-muted-foreground">
            Adjust the sliders to see your personalized savings
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            {/* Sliders Section */}
            <div className="p-6 border-b border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TuitionSlider value={tuition} onChange={setTuition} />
                <SpendSlider value={monthlySpend} onChange={setMonthlySpend} />
              </div>
            </div>

            {/* Results Section - Hero Metric Pattern */}
            <div className="p-6 bg-gradient-to-b from-primary/5 to-transparent">
              {/* Primary Result - The "Wow" Number */}
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Your Annual Rewards
                </p>
                <div className="font-display text-4xl sm:text-5xl font-bold text-primary tabular-nums">
                  ${results.totalValue.toLocaleString()}
                </div>
                <p className="text-muted-foreground mt-1">
                  <span className="text-foreground font-medium">{results.tuitionReduction}%</span> off your tuition
                </p>
              </div>

              {/* Secondary Metrics */}
              <div className="flex justify-center gap-8 text-center text-sm">
                <div>
                  <p className="text-muted-foreground">Points Earned</p>
                  <p className="font-semibold tabular-nums">{results.totalPoints.toLocaleString()}</p>
                </div>
                <div className="border-l border-border pl-8">
                  <p className="text-muted-foreground">Tuition Bonus</p>
                  <p className="font-semibold text-accent">+{results.bonusRate}%</p>
                </div>
              </div>

              {/* Threshold Progress Nudge */}
              <AnimatePresence mode="wait">
                {!results.atMaxTier && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-3 rounded-lg bg-accent/10 text-center"
                  >
                    <p className="text-sm text-muted-foreground">
                      <TrendingUp className="inline w-4 h-4 mr-1 text-accent" />
                      Spend <span className="font-semibold text-foreground">${monthlyToNextTier.toLocaleString()}/mo</span> more to unlock{' '}
                      <span className="font-semibold text-accent">
                        +{results.bonusRate === 0 ? '0.5' : '1.0'}% tuition bonus
                      </span>
                    </p>
                  </motion.div>
                )}
                {results.atMaxTier && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-3 rounded-lg bg-accent/10 text-center"
                  >
                    <p className="text-sm text-accent font-medium">
                      Maximum bonus unlocked
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Section - Inline with Results */}
            <div className="p-6 border-t border-border bg-muted/30">
              <p className="text-center text-muted-foreground mb-4">
                Ready to start earning?
              </p>
              <EmailCapture />
            </div>
          </div>
        </ScrollReveal>

        {/* Micro-copy */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Earn 1 point per $1 on tuition and everyday purchases. 100 points = $1.
        </p>
      </div>
    </section>
  )
}
