'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const DISCIPLINES = [
  {
    number: '01',
    label: 'Protocol Design',
    heading: 'Human oversight for data analysis at AI speed.',
    body: 'Reduce data analysis and QC time by up to 90% while keeping experts in control of every critical decision.',
    imageRight: true,
    video: '/demo-1.mp4',
  },
  {
    number: '02',
    label: 'Data Management',
    heading: 'Unified visibility across the clinical data stack.',
    body: 'View, organize, and manage data across multiple sources, formats, and study assets in one workspace.',
    imageRight: false,
    video: '/demo-2.mp4',
  },
  {
    number: '03',
    label: 'Analysis & Reporting',
    heading: 'Automated SDTM and ADaM analysis with expert review built in.',
    body: 'Move faster on clinical analysis and downstream outputs with automation that improves speed, consistency, and traceability.',
    imageRight: true,
    video: '/demo-3.mp4',
  },
]

export function ProblemSolutionStrip() {
  return (
    <section id="technology" className="py-[60px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="space-y-20 lg:space-y-28">
          {DISCIPLINES.map((item) => (
            <DisciplineRow key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DisciplineRow({ item }: { item: typeof DISCIPLINES[number] }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 95%', 'center 40%'],
  })

  // Text slides in from its side with large offset
  const textX = useTransform(
    scrollYProgress,
    [0, 0.8],
    [item.imageRight ? -120 : 120, 0]
  )
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  // Image slides in from opposite side with large offset
  const imageX = useTransform(
    scrollYProgress,
    [0, 0.8],
    [item.imageRight ? 120 : -120, 0]
  )
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.55], [0, 1])

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
    >
      {/* Text side */}
      <motion.div
        className={item.imageRight ? 'lg:order-1' : 'lg:order-2'}
        style={{ x: textX, opacity: textOpacity }}
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
        style={{ x: imageX, opacity: imageOpacity }}
      >
        <div className="overflow-hidden" style={{ border: '1px solid var(--foreground)' }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#f0ebe5', borderBottom: '1px solid rgba(31,31,31,0.08)' }}>
            <div className="flex gap-[6px]">
              <span className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
            </div>
          </div>
          {/* Demo video */}
          <div className="aspect-video relative overflow-hidden" style={{ background: '#f7f6f4' }}>
            <video
              src={item.video}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
