import React from 'react'

function Navbar() {
  return (
    <header className="absolute top-0 z-[9999] flex w-full pt-2.5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-b-lg pr-5 text-white md:pr-8">
        <div className="flex items-center justify-center gap-1 rounded-2xl px-3 py-1 lg:gap-7">
          <a className="inline-flex shrink-0 translate-y-0.5 items-center justify-center rounded lg:mr-7" href="/">
            <h1 className="text-2xl font-bold text-white" style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif"}}>Omni</h1>
            <span className="sr-only">Omni</span>
          </a>
          <div className="flex hidden items-center md:flex">
            <a className="flex items-center justify-center px-3.5 py-2 text-sm font-medium text-white focus:underline" href="#features">Features</a>
            <a className="flex items-center justify-center px-3.5 py-2 text-sm font-medium text-white focus:underline" href="#benefits">Benefits</a>
            <a className="flex items-center justify-center px-3.5 py-2 text-sm font-medium text-white focus:underline" href="#testimonials">Testimonials</a>
            <a className="flex items-center justify-center px-3.5 py-2 text-sm font-medium text-white focus:underline" href="#pricing">Pricing</a>
          </div>
        </div>
        <div className="fixed top-2.5 right-2.5 hidden h-fit items-center justify-center gap-2 transition-opacity duration-300 md:flex opacity-100">
          <a href="#waitlist" className="purple-gradient-button rounded-[10px] flex items-center gap-[6px] w-fit text-white font-medium text-[16px] tracking-[-0.13px] p-[10px_20px] relative overflow-hidden">
            <span className="absolute top-0 left-0 z-20 h-full w-full blur-[1px]" aria-hidden="true">
              <span className="blurred-border absolute -top-px -left-px z-20 h-full w-full"></span>
            </span>
            <span>Join Waitlist</span>
          </a>
        </div>
        <button type="button" className="relative ml-4 flex size-6 text-white outline-hidden md:hidden">
          <span className="absolute -inset-3 lg:hidden"></span>
          <svg className="-mr-1.5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>Trigger</title>
            <path d="M3.99902 7.71436H19.999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3.99902 16.2856H19.999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="sr-only">Open menu</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar

