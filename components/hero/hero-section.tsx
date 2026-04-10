'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { EmailCapture } from '@/components/hero/email-capture'
import Link from 'next/link'

const SNAP_POINTS = [0, 0.5, 1.0]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isAnimatingRef = useRef(false)
  const wheelAccumRef = useRef(0)
  const [, setCurrentSnap] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Scroll snapping via wheel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const WHEEL_THRESHOLD = 80
    let cooldownTimer: ReturnType<typeof setTimeout>

    const scrollToSnap = (index: number) => {
      const rect = container.getBoundingClientRect()
      const containerTop = window.scrollY + rect.top
      const totalScroll = container.offsetHeight - window.innerHeight
      const target = containerTop + SNAP_POINTS[index] * totalScroll

      isAnimatingRef.current = true
      setCurrentSnap(index)
      wheelAccumRef.current = 0

      window.scrollTo({ top: target, behavior: 'smooth' })

      clearTimeout(cooldownTimer)
      cooldownTimer = setTimeout(() => {
        isAnimatingRef.current = false
      }, 900)
    }

    const handleWheel = (e: WheelEvent) => {
      const progress = scrollYProgress.get()

      if (progress <= 0.001 && e.deltaY < 0) return
      if (progress >= 0.999 && e.deltaY > 0) return
      if (progress < -0.01 || progress > 1.01) return

      e.preventDefault()

      if (isAnimatingRef.current) return

      wheelAccumRef.current += e.deltaY

      if (Math.abs(wheelAccumRef.current) >= WHEEL_THRESHOLD) {
        const direction = wheelAccumRef.current > 0 ? 1 : -1

        let nearestSnap = 0
        let minDist = Infinity
        for (let i = 0; i < SNAP_POINTS.length; i++) {
          const dist = Math.abs(progress - SNAP_POINTS[i])
          if (dist < minDist) {
            minDist = dist
            nearestSnap = i
          }
        }

        const nextSnap = nearestSnap + direction
        if (nextSnap >= 0 && nextSnap < SNAP_POINTS.length) {
          scrollToSnap(nextSnap)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(cooldownTimer)
    }
  }, [scrollYProgress])

  // Panel 1: Astraea title
  const p1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0])
  const p1Y = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0, -80])

  // Panel 2: Hero detail grid
  const p2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0])
  const p2Y = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [40, 0, 0, -80])

  // Panel 3: CTA
  const p3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1.0], [0, 1, 1])
  const p3Y = useTransform(scrollYProgress, [0.75, 0.85], [40, 0])
  const p3Scale = useTransform(scrollYProgress, [0.75, 0.85], [0.96, 1])

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-[60px] overflow-hidden flex items-center justify-center" style={{ height: 'calc(100vh - 60px)' }}>

        {/* Panel 1: Title */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
          style={{ opacity: p1Opacity, y: p1Y }}
        >
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-[72px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Astraea
          </h1>
          <p className="text-base text-muted-foreground max-w-[400px]">
            Autonomous clinical trial automation for modern healthcare.
          </p>
        </motion.div>

        {/* Panel 2: Hero Detail Grid */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-5"
          style={{ opacity: p2Opacity, y: p2Y }}
        >
          <div className="max-w-[1140px] w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-5">
            {/* Left: Text */}
            <div className="pt-5">
              <h2 className="font-serif text-[32px] font-semibold text-foreground mb-4" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                Ship clinical trials faster with autonomous automation.
              </h2>
              <p className="text-sm text-foreground leading-relaxed">
                Astraea accelerates the full trial lifecycle from protocol design to FDA
                submission using compliant, enterprise-grade AI designed for modern healthcare.
              </p>
            </div>

            {/* Center: Image placeholder */}
            <div className="min-h-[400px] lg:min-h-[500px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8e0d8 0%, #d5cdc5 100%)' }}>
              <span className="text-xs text-muted-foreground">[Clinical / pharma hero image]</span>
            </div>

            {/* Right: Pillar Cards */}
            <div className="flex flex-col gap-10 pt-5 pb-10">
              {[
                { title: 'Platform', desc: 'AI-native trial automation built for regulated environments.', href: '#platform', label: 'Our Platform' },
                { title: 'Technology', desc: 'Proprietary engine from protocol design through FDA submission.', href: '#technology', label: 'Our Technology' },
                { title: 'Pipeline', desc: 'End-to-end execution across Phase II and III clinical programs.', href: '#pipeline', label: 'Our Pipeline' },
              ].map((card) => (
                <div key={card.title} className="flex flex-col gap-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground" style={{ lineHeight: 1.2 }}>
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-snug">
                    {card.desc}
                  </p>
                  <Link
                    href={card.href}
                    className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-base font-normal h-[34px] px-[13px] self-start"
                    style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
                  >
                    {card.label}
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Panel 3: CTA */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
          style={{ opacity: p3Opacity, y: p3Y, scale: p3Scale }}
        >
          <h2 className="font-serif text-[38px] font-semibold text-foreground mb-3 max-w-[500px]" style={{ lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            Ready to ship your trials faster?
          </h2>
          <p className="text-[15px] text-muted-foreground mb-7">
            Request a technical demo.
          </p>
          <EmailCapture />
        </motion.div>
      </div>
    </section>
  )
}
