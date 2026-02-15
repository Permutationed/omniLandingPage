'use client'

import { motion } from 'motion/react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Button } from '@/components/ui/button'
import { EmailCapture } from '@/components/hero/email-capture'

export function CTASection() {
  return (
    <section
      id="request-demo"
      className="max-w-4xl mx-auto px-4 py-20 sm:py-24"
    >
      <ScrollReveal className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Bring AI Automation Into Your Clinical Workflow
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Request a technical demo or download our research whitepaper to learn more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="h-12 px-8" asChild>
            <a href="mailto:demo@omni.pharma?subject=Technical%20Demo%20Request">
              Book Technical Demo
            </a>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8" asChild>
            <a href="mailto:info@omni.pharma?subject=Whitepaper%20Request">
              Download Whitepaper
            </a>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8" asChild>
            <a href="mailto:partnerships@omni.pharma?subject=Partnership%20Inquiry">
              Partner With Us
            </a>
          </Button>
        </div>

        <div className="rounded-xl bg-muted/30 p-8 border border-border/50">
          <p className="text-sm font-medium mb-4 text-center">
            Or leave your email and we&apos;ll be in touch.
          </p>
          <EmailCapture />
        </div>
      </ScrollReveal>
    </section>
  )
}
