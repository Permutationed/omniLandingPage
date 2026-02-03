'use client'

import { motion } from 'motion/react'
import { Coffee, BookOpen, Pizza, ShoppingBag } from 'lucide-react'

const merchants = [
  { id: 1, name: 'Campus Coffee', icon: Coffee, x: 30, y: 35, multiplier: 5 },
  { id: 2, name: 'Book Nook', icon: BookOpen, x: 65, y: 25, multiplier: 3 },
  { id: 3, name: 'Pizza Place', icon: Pizza, x: 55, y: 60, multiplier: 7 },
  { id: 4, name: 'Campus Store', icon: ShoppingBag, x: 25, y: 70, multiplier: 4 },
]

export function MapPreview() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-emerald-50 to-emerald-100 pt-10">
      {/* Map header bar */}
      <div className="absolute top-10 left-0 right-0 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium">Discover nearby rewards</span>
        </div>
      </div>

      {/* Simplified map grid */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapGrid)" />

        {/* "Roads" */}
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(0,0,0,0.1)" strokeWidth="8"/>
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(0,0,0,0.1)" strokeWidth="8"/>
      </svg>

      {/* User location (center) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          className="w-6 h-6 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-primary border-2 border-white shadow-lg" />
      </div>

      {/* Merchant pins */}
      {merchants.map((merchant, index) => (
        <motion.div
          key={merchant.id}
          className="absolute z-10"
          style={{ left: `${merchant.x}%`, top: `${merchant.y}%` }}
          initial={{ scale: 0, y: -10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.15, type: 'spring', bounce: 0.4 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Pin body */}
            <div className="w-8 h-8 rounded-full bg-white shadow-lg border border-border flex items-center justify-center">
              <merchant.icon className="w-4 h-4 text-primary" />
            </div>
            {/* Multiplier badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[8px] font-bold flex items-center justify-center shadow-sm">
              {merchant.multiplier}x
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
