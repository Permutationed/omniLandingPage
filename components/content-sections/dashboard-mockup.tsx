'use client'

import { motion } from 'motion/react'

const STEPS = [
  { name: 'Protocol', done: true },
  { name: 'Site Select', done: true },
  { name: 'Recruitment', done: true },
  { name: 'Screening', done: false, active: true, pct: '78%' },
  { name: 'Treatment', done: false },
  { name: 'Data Lock', done: false },
  { name: 'Analysis', done: false },
]

export function DashboardMockup() {
  return (
    <section className="py-[60px]" style={{ background: '#fafafa' }}>
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-[38px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Real-time trial orchestration.
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              Track every phase of your trial from a single interface. Protocol, site selection,
              recruitment, screening, treatment, data lock, and analysis -- all visible, all automated.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="bg-white overflow-hidden" style={{ border: '1px solid var(--foreground)' }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #e0dbd5' }}>
                <span className="w-[8px] h-[8px] rounded-full bg-[#ef4444]" />
                <span className="w-[8px] h-[8px] rounded-full bg-[#f59e0b]" />
                <span className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                <span className="text-xs text-muted-foreground ml-2">Astraea Trial Dashboard</span>
                <span className="ml-auto flex items-center gap-[4px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#22c55e]" />
                  <span className="text-[11px] text-muted-foreground">Live</span>
                </span>
              </div>

              {/* Dashboard body */}
              <div className="p-5">
                <div className="h-[6px] rounded-[3px] mb-5 overflow-hidden" style={{ background: '#e8e0d8' }}>
                  <div className="h-full rounded-[3px] bg-foreground" style={{ width: '60%' }} />
                </div>
                <div className="flex gap-[6px] flex-wrap">
                  {STEPS.map((step) => (
                    <span
                      key={step.name}
                      className="px-3 py-[5px] text-xs font-medium"
                      style={{
                        border: '1px solid',
                        borderColor: step.done ? '#c8c8c8' : step.active ? 'var(--foreground)' : '#ddd',
                        color: step.done ? '#666' : step.active ? 'var(--foreground)' : '#aaa',
                        background: step.active ? 'rgba(31,31,31,0.05)' : 'transparent',
                      }}
                    >
                      {step.name}{step.pct ? ` ${step.pct}` : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
