'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { SponsorsContent } from './students-content'
import { CROsContent } from './merchants-content'
import { StatsDataManagementContent } from './stats-dm-content'

const tabs = [
  { id: 'sponsors', label: 'Pharma Sponsors & Biotech' },
  { id: 'cros', label: 'CROs' },
  { id: 'stats-dm', label: 'Stats & Data Management' },
] as const

type TabId = (typeof tabs)[number]['id']

export function AudienceTabs() {
  const [activeTab, setActiveTab] = useState<TabId>(tabs[0].id)

  return (
    <section id="benefits" className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">
          Who It&apos;s For
        </h2>
        <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-12">
          Omni serves clinical trial stakeholders. Explore how each audience benefits.
        </p>
      </ScrollReveal>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabId)}
        className="flex flex-col items-center"
      >
        <TabsList className="relative bg-muted/50 p-1 rounded-lg flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="relative px-4 sm:px-6 py-2.5 text-sm font-medium transition-colors data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="audience-tab-indicator"
                  className="absolute inset-0 bg-background rounded-md shadow-sm"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="w-full mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {activeTab === 'sponsors' && <SponsorsContent />}
              {activeTab === 'cros' && <CROsContent />}
              {activeTab === 'stats-dm' && <StatsDataManagementContent />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </section>
  )
}
