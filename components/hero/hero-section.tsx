'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { EmailCapture } from '@/components/hero/email-capture'

const SWOOP = [0.16, 1, 0.3, 1] as const

const PILLAR_CARDS = [
  { title: 'Platform', desc: 'AI-native trial automation built for regulated environments.', href: '#platform', label: 'Our Platform' },
  { title: 'Technology', desc: 'Proprietary engine from protocol design through FDA submission.', href: '#technology', label: 'Our Technology' },
  { title: 'Pipeline', desc: 'End-to-end execution across Phase II and III clinical programs.', href: '#pipeline', label: 'Our Pipeline' },
]

export function HeroSection() {
  return (
    <section className="pt-10 pb-[60px]">
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-5">

          {/* Left: Text */}
          <motion.div
            className="pt-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SWOOP }}
          >
            <h1 className="font-serif text-[38px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Autonomous clinical trial automation.
            </h1>
            <p className="text-base text-foreground leading-relaxed">
              Astraea accelerates the full trial lifecycle from protocol design to FDA
              submission using compliant, enterprise-grade AI designed for modern healthcare.
            </p>
          </motion.div>

          {/* Center: Image placeholder */}
          <motion.div
            className="min-h-[400px] lg:min-h-[580px] flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #e8e0d8 0%, #d5cdc5 100%)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SWOOP, delay: 0.1 }}
          >
            <span className="text-xs text-muted-foreground">[Clinical / pharma hero image]</span>
          </motion.div>

          {/* Right: Pillar Cards */}
          <div className="flex flex-col gap-10 pt-5 pb-10">
            {PILLAR_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: SWOOP, delay: 0.2 + i * 0.1 }}
              >
                <h3 className="font-serif text-xl font-semibold text-foreground" style={{ lineHeight: 1.2 }}>
                  {card.title}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-snug">
                  {card.desc}
                </p>
                <Link
                  href={card.href}
                  className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-[40px] px-[13px] self-start"
                  style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
                >
                  {card.label}
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
