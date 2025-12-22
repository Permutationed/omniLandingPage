import React from 'react'

function Hero({ isLoaded }) {
  return (
    <div className="hero-v2 flex flex-col items-center gap-8 lg:gap-16">
      <div className="relative w-full">
        <section className="flex h-full items-start justify-center pt-20 lg:pt-20 bg-transparent">
          <div className="flex flex-col items-center gap-8 py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-4 lg:gap-4">
                <h1 
                  style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback'", animationDelay: isLoaded ? '0.1s' : '0s'}} 
                  className={`text-center text-[56px] leading-[102%] font-medium tracking-[-1px] text-white lg:text-[80px] ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
                >
                  <span className="block h-[57px] overflow-hidden lg:h-[76px]">
                    <span className="inline-block" style={{transform: 'none', color: '#ffffff'}}>The</span>{' '}
                    <span className="inline-block" style={{transform: 'none', color: '#ffffff'}}>Smartest</span>{' '}
                    <span className="inline-block" style={{transform: 'none', color: '#ffffff'}}>Way</span>{' '}
                    <span className="inline-block" style={{transform: 'none', color: '#ffffff'}}>to</span>
                  </span>
                  <span className="block h-[70px] overflow-hidden lg:h-[94px]">
                    <span className="inline-block" style={{transform: 'none', color: '#ffffff', textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'}}>Earn</span>{' '}
                    <span className="inline-block" style={{transform: 'none', color: '#ffffff', textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'}}>More</span>
                  </span>
                </h1>
                <hr 
                  style={{animationDelay: isLoaded ? '0.3s' : '0s', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)'}} 
                  className={`hidden h-px w-96 border-none lg:block ${isLoaded ? 'animate-fade-in' : ''}`} 
                />
                <h2 
                  style={{animationDelay: isLoaded ? '0.4s' : '0s', textShadow: 'rgba(0, 0, 0, 0) 0px 112px 31px, rgba(0, 0, 0, 0) 0px 72px 29px, rgba(0, 0, 0, 0.01) 0px 40px 24px, rgba(0, 0, 0, 0.01) 0px 18px 18px, rgba(0, 0, 0, 0.01) 0px 4px 10px'}} 
                  className={`text-center leading-[140%] font-medium tracking-[-0.02em] text-white text-base md:text-lg lg:text-xl ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
                >
                  Omni is the only seamless smart wallet that maximizes your card rewards before you pay, automatically.
                </h2>
              </div>
            </div>
            <div 
              id="download-button" 
              style={{animationDelay: isLoaded ? '0.6s' : '0s'}} 
              className={`h-10 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
            >
              <a href="#waitlist" className="purple-gradient-button rounded-[10px] flex items-center gap-[6px] w-fit font-medium text-[16px] tracking-[-0.13px] p-[10px_20px] relative overflow-hidden">
                <span className="absolute top-0 left-0 z-20 h-full w-full blur-[1px]" aria-hidden="true">
                  <span className="blurred-border absolute -top-px -left-px z-20 h-full w-full"></span>
                </span>
                <span className="relative z-30 text-white font-semibold">Join Waitlist</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Hero

