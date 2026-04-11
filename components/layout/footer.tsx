'use client'

import Link from 'next/link'
import posthog from 'posthog-js'

export function Footer() {
  return (
    <footer className="border-t border-foreground">
      <div className="max-w-[1320px] mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="font-sans text-lg font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
            Astraea
          </Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Company</h5>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity" onClick={() => posthog.capture('footer_link_clicked', { label: 'About Us' })}>About Us</Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Platform</h5>
          <Link href="#technology" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity" onClick={() => posthog.capture('footer_link_clicked', { label: 'Technology', href: '#technology' })}>Technology</Link>
          <Link href="#pipeline" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity" onClick={() => posthog.capture('footer_link_clicked', { label: 'Pipeline', href: '#pipeline' })}>Pipeline</Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Policies</h5>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity" onClick={() => posthog.capture('footer_link_clicked', { label: 'Privacy Policy' })}>Privacy Policy</Link>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity" onClick={() => posthog.capture('footer_link_clicked', { label: 'Terms of Service' })}>Terms of Service</Link>
        </div>
      </div>
      <div className="max-w-[1320px] mx-auto px-8 pb-10 text-xs text-muted-foreground">
        &copy; Astraea Inc. {new Date().getFullYear()}
      </div>
    </footer>
  )
}
