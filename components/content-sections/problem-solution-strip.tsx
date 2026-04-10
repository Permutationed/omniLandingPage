'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

export function ProblemSolutionStrip() {
  return (
    <section className="py-[60px]">
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-[38px] font-semibold text-foreground" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Built for the regulated complexity of modern clinical research.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="text-base text-foreground leading-relaxed mb-8">
              Our platform brings together expertise across three critical disciplines:
            </p>
            <div className="flex gap-0">
              {['Protocol Design', 'Patient Recruitment', 'Data Automation'].map((name) => (
                <div key={name} className="flex-1 pt-5 pr-5 border-t border-foreground">
                  <h4 className="font-serif text-lg font-semibold text-foreground">{name}</h4>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="#request-demo"
                className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-10 px-[13px]"
                style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
              >
                Request Demo
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
