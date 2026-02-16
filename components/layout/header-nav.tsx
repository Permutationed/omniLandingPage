'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeaderNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="/8.png"
                alt="Omni logo"
                className="w-full h-full object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(1500%) hue-rotate(200deg)' }}
              />
            </div>
            <span className="font-semibold text-xl tracking-tight text-slate-900">
              Omni
            </span>
          </Link>

          <Button asChild className="rounded-lg shadow-sm">
            <a href="#request-demo">Request Demo</a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
