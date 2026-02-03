'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, Shield, Lock, Server, CheckCircle } from 'lucide-react'

const securityItems = [
  {
    icon: CheckCircle,
    title: 'SOC 2 Type II Compliant',
    description: 'Independently audited security controls',
  },
  {
    icon: Lock,
    title: '256-bit AES Encryption',
    description: 'Bank-level data protection',
  },
  {
    icon: Server,
    title: 'PCI DSS Level 1',
    description: 'Highest payment security standard',
  },
  {
    icon: Shield,
    title: 'GDPR Compliant',
    description: 'Full data privacy protection',
  },
]

export function SecurityAccordion() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-xl border bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="security-content"
        className="flex w-full items-center justify-between py-5 px-6 text-left transition-colors hover:text-primary"
      >
        <div className="flex items-center gap-3">
          <Shield className="size-5 text-primary" aria-hidden />
          <span className="font-medium">Bank-Level Security</span>
        </div>
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
            id="security-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {securityItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-lg bg-muted/50 p-4"
                  >
                    <item.icon
                      className="size-5 text-primary shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
