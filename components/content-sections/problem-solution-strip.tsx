'use client'

import { motion } from 'motion/react'

const SWOOP = [0.16, 1, 0.3, 1] as const

const DISCIPLINES = [
  {
    number: '01',
    label: 'Protocol Design',
    heading: 'Human oversight for protocol design at AI speed.',
    body: 'Reduce protocol development time by up to 90% while keeping experts in control of every critical decision.',
    imageRight: true,
  },
  {
    number: '02',
    label: 'Data Management',
    heading: 'Unified visibility across the clinical data stack.',
    body: 'View, organize, and manage data across multiple sources, formats, and study assets in one workspace.',
    imageRight: false,
  },
  {
    number: '03',
    label: 'Analysis & Reporting',
    heading: 'Automated SDTM and ADaM analysis with expert review built in.',
    body: 'Move faster on clinical analysis and downstream outputs with automation that improves speed, consistency, and traceability.',
    imageRight: true,
  },
]

export function ProblemSolutionStrip() {
  return (
    <section className="py-[60px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="space-y-20 lg:space-y-28">
          {DISCIPLINES.map((item, i) => (
            <div
              key={item.number}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Text side */}
              <motion.div
                className={item.imageRight ? 'lg:order-1' : 'lg:order-2'}
                initial={{ opacity: 0, x: item.imageRight ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: SWOOP }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">
                  {item.number} -- {item.label}
                </p>
                <h3 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-3" style={{ lineHeight: 1.2 }}>
                  {item.heading}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </motion.div>

              {/* Image/demo side */}
              <motion.div
                className={item.imageRight ? 'lg:order-2' : 'lg:order-1'}
                initial={{ opacity: 0, x: item.imageRight ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: SWOOP, delay: 0.1 }}
              >
                <div className="overflow-hidden" style={{ border: '1px solid var(--foreground)', borderRadius: '0' }}>
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#f0ebe5', borderBottom: '1px solid rgba(31,31,31,0.08)' }}>
                    <div className="flex gap-[6px]">
                      <span className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
                      <span className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
                      <span className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
                    </div>
                  </div>
                  {/* Placeholder content */}
                  <div className="aspect-video relative overflow-hidden" style={{ background: '#f7f6f4' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">{item.label} Demo</p>
                        <p className="text-[10px] text-muted-foreground opacity-60">Video / screenshot placeholder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
