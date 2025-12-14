import React from 'react'

function Navbar({ isLoaded }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full pt-2.5 pb-2.5 bg-transparent pointer-events-none">
      <div className="flex w-full items-center justify-between px-3 md:px-4 text-white pointer-events-auto">
        {/* Logo in left corner */}
        <div className={`flex items-center ${isLoaded ? 'animate-fly-in-left' : ''}`} style={{animationDelay: isLoaded ? '0.1s' : '0s'}}>
          <a className="inline-flex shrink-0 items-center justify-center" href="/">
            <img 
              src="/assets/omni-logo.png" 
              alt="Omni" 
              className="h-8 md:h-10 w-auto"
            />
            <span className="sr-only">Omni</span>
          </a>
        </div>
        
        {/* Join Waitlist Button in right corner */}
        <div className={`flex h-fit items-center justify-center gap-2 transition-opacity duration-300 ${isLoaded ? 'animate-fly-in-right' : ''}`} style={{animationDelay: isLoaded ? '0.2s' : '0s'}}>
          <a href="#waitlist" className="purple-gradient-button rounded-[10px] flex items-center gap-[6px] w-fit font-medium text-[16px] tracking-[-0.13px] p-[10px_20px] relative overflow-hidden">
            <span className="absolute top-0 left-0 z-20 h-full w-full blur-[1px]" aria-hidden="true">
              <span className="blurred-border absolute -top-px -left-px z-20 h-full w-full"></span>
            </span>
            <span className="relative z-30 text-white font-semibold">Join Waitlist</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar

