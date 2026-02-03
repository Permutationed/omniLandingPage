'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface NavItem {
  href: string
  label: string
}

interface MobileNavProps {
  items: NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setOpen(false)
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', href)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
          {items.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {item.label}
            </button>
          ))}
          <Button
            className="mt-4"
            onClick={() => handleNavClick('#waitlist')}
          >
            Join Waitlist
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
