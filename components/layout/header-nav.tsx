'use client'

import Link from 'next/link'
import posthog from 'posthog-js'

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground" style={{ height: '60px' }}>
      <div className="max-w-[1320px] mx-auto px-8 h-full flex justify-between items-center">
        <Link href="/" className="font-sans text-lg font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
          Astraea
        </Link>
        <nav>
          <ul className="flex gap-7">
            <li><Link href="#platform" className="text-foreground text-base font-normal hover:opacity-70 transition-opacity" onClick={() => posthog.capture('nav_link_clicked', { label: 'Platform', href: '#platform' })}>Platform</Link></li>
            <li><Link href="#technology" className="text-foreground text-base font-normal hover:opacity-70 transition-opacity" onClick={() => posthog.capture('nav_link_clicked', { label: 'Technology', href: '#technology' })}>Technology</Link></li>
            <li><Link href="#pipeline" className="text-foreground text-base font-normal hover:opacity-70 transition-opacity" onClick={() => posthog.capture('nav_link_clicked', { label: 'Pipeline', href: '#pipeline' })}>Pipeline</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
