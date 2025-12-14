import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
// import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initial delay of 0-1 second before animations start
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`flex min-h-svh flex-col cohesive-gradient ${isLoaded ? 'animate-in' : 'page-load-animate'}`}>
      <div className="grow">
        <main className="relative overflow-hidden md:overflow-visible">
          <Navbar isLoaded={isLoaded} />
          <Hero isLoaded={isLoaded} />
          <Features isLoaded={isLoaded} />
          {/* <Testimonials isLoaded={isLoaded} /> */}
          <CTA isLoaded={isLoaded} />
        </main>
      </div>
    </div>
  )
}

export default Home

