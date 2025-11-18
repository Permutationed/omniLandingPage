import React from 'react'

function Hero() {
  return (
    <div className="hero-v2 flex flex-col items-center gap-8 lg:gap-16">
      <div className="relative w-full">
        <section className="flex h-full items-start justify-center pt-20 lg:pt-20 bg-transparent">
          <div className="flex flex-col items-center gap-8 py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-4 lg:gap-3">
                <h1 style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback'"}} className="text-center text-[56px] leading-[102%] font-medium tracking-[-1px] text-white lg:text-[80px]">
                  <span className="block h-[57px] overflow-hidden lg:h-[76px]">
                    <span className="inline-block" style={{transform: 'none'}}>The</span>{' '}
                    <span className="inline-block" style={{transform: 'none'}}>Smartest</span>{' '}
                    <span className="inline-block" style={{transform: 'none'}}>Way</span>{' '}
                    <span className="inline-block" style={{transform: 'none'}}>to</span>
                  </span>
                  <span className="block h-[70px] overflow-hidden lg:h-[94px]">
                    <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{transform: 'none'}}>Earn</span>{' '}
                    <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{transform: 'none'}}>More</span>
                  </span>
                </h1>
                <hr className="hidden h-px w-96 border-none lg:block" style={{background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)', opacity: 1, transform: 'none'}} />
                <h2 className="text-center leading-[140%] font-medium tracking-[-0.02em] text-white lg:text-[19px]" style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif", textShadow: 'rgba(0, 0, 0, 0) 0px 112px 31px, rgba(0, 0, 0, 0) 0px 72px 29px, rgba(0, 0, 0, 0.01) 0px 40px 24px, rgba(0, 0, 0, 0.01) 0px 18px 18px, rgba(0, 0, 0, 0.01) 0px 4px 10px', opacity: 1, transform: 'none'}}>
                  Omni automatically analyzes your purchases<br className="md:hidden" /> and tells you which card earns the most<br className="hidden md:block" /> points, cash back, or perks—every time.<br className="md:hidden" /> Maximize rewards with zero effort.
                </h2>
              </div>
            </div>
            <div className="h-10" id="download-button" style={{opacity: 1, transform: 'none'}}>
              <button className="purple-gradient-button rounded-[10px] flex items-center gap-[6px] w-fit text-white font-medium text-[16px] tracking-[-0.13px] p-[10px_20px] relative overflow-hidden">
                <span className="absolute top-0 left-0 z-20 h-full w-full blur-[1px]" aria-hidden="true">
                  <span className="blurred-border absolute -top-px -left-px z-20 h-full w-full"></span>
                </span>
                <span>Start Your Free Trial</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Hero

