import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Benefits from '../components/Benefits'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

function Home() {
  return (
    <div className="flex min-h-svh flex-col cohesive-gradient">
      <div className="grow">
        <main className="relative overflow-hidden md:overflow-visible">
          <Navbar />
          <Hero />
          <Features />
          <Benefits />
          <Testimonials />
          <CTA />
        </main>
      </div>
    </div>
  )
}

export default Home

