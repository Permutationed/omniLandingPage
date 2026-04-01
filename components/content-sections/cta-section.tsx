'use client'

import { Button } from '@/components/ui/button'
import { EmailCapture } from '@/components/hero/email-capture'

export function CTASection() {
  return (
    <section
      id="request-demo"
      className="max-w-4xl mx-auto px-4 py-12 sm:py-16"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Ready to ship faster?
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          Request a technical demo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button size="lg" className="h-12 px-8" asChild>
            <a href="mailto:josh29@stanford.edu?subject=Technical%20Demo%20Request">
              Book Technical Demo
            </a>
          </Button>
        </div>
        <div className="rounded-xl bg-muted/30 p-8 border border-border/50 max-w-md mx-auto">
          <p className="text-sm font-medium mb-4 text-center">
            Or leave your email and we&apos;ll be in touch.
          </p>
          <EmailCapture />
        </div>
      </div>
    </section>
  )
}
