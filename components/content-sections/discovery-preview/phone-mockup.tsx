import { ReactNode } from 'react'

interface PhoneMockupProps {
  children: ReactNode
  className?: string
}

export function PhoneMockup({ children, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto w-[280px] ${className}`}>
      {/* Phone frame - dark bezel */}
      <div className="relative rounded-[40px] border-[8px] border-foreground/90 bg-background overflow-hidden shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground/90 rounded-full z-20" />

        {/* Screen content - aspect ratio matches iPhone 14/15 */}
        <div className="aspect-[9/19.5] overflow-hidden">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full z-20" />
      </div>
    </div>
  )
}
