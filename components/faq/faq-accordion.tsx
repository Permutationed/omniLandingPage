'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, Shield, Lock, Server, CheckCircle } from 'lucide-react'
import { faqItems } from './faq-data'

const securityGridItems = [
  { icon: CheckCircle, title: 'Privacy & Compliance', description: 'Designed for regulated data handling' },
  { icon: Lock, title: 'Audit-Ready Outputs', description: 'Full traceability and lineage' },
  { icon: Server, title: 'Secure Architecture', description: 'Enterprise-grade security' },
  { icon: Shield, title: 'Human Oversight', description: 'Built-in review checkpoints' },
]

export function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="divide-y divide-border rounded-xl border bg-card">
      {faqItems.map((item) => {
        const isOpen = openId === item.id
        const showIcon = item.icon === 'shield'

        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-content-${item.id}`}
              className="flex w-full items-center justify-between py-5 px-6 text-left font-medium transition-colors hover:text-primary"
            >
              <span className={`flex items-center gap-3 pr-4`}>
                {showIcon && <Shield className="size-5 text-primary shrink-0" aria-hidden />}
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown
                  className="size-5 text-muted-foreground shrink-0"
                  aria-hidden
                />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  {item.contentKey === 'security-grid' ? (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {securityGridItems.map((gridItem) => (
                          <div
                            key={gridItem.title}
                            className="flex items-start gap-3 rounded-lg bg-muted/50 p-4"
                          >
                            <gridItem.icon
                              className="size-5 text-primary shrink-0 mt-0.5"
                              aria-hidden
                            />
                            <div>
                              <p className="font-medium text-sm">{gridItem.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {gridItem.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="pb-5 px-6 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
