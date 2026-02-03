'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { MobileNav } from './mobile-nav'
import { Magnetic } from '@/components/ui/magnetic-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { navVariants, navTransition } from '@/lib/animation-variants'

const navItems = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '#calculator', label: 'Calculator' },
  { href: '#faq', label: 'FAQ' },
]

export function HeaderNav() {
  const { scrollDirection, isAtTop } = useScrollDirection()
  const hidden = scrollDirection === 'down' && !isAtTop

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.pushState(null, '', href)
  }

  return (
    <motion.header
      variants={navVariants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={navTransition}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors',
        isAtTop ? 'bg-transparent' : 'bg-background/80 backdrop-blur-sm border-b'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          Omni
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={scrollTo(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button with Magnetic Effect */}
        <div className="hidden md:block">
          <Magnetic>
            <Button>Join Waitlist</Button>
          </Magnetic>
        </div>

        {/* Mobile Menu */}
        <MobileNav items={navItems} />
      </div>
    </motion.header>
  )
}
