'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section id="request-demo" className="py-20 border-t border-foreground">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-end">
          <motion.div
            className="lg:sticky lg:top-[80px] lg:self-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-4">
              Partner With Us
            </p>
            <h2 className="font-serif text-[38px] font-semibold text-foreground mb-6" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Ready to ship your clinical trials faster? Let&apos;s accelerate together.
            </h2>
            <Link
              href="https://cal.com/team/astraea/product-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-10 px-[13px]"
              style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
            >
              Request Demo
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>

          <motion.div
            className="flex justify-end items-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <img
              src="/pharmaimage2.webp"
              alt="Pharmaceutical research"
              className="w-full max-w-[480px] h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
