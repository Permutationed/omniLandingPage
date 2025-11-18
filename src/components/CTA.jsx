import React from 'react'

function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif"}}>
          Ready to Maximize Your Rewards?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Join thousands of users who are earning more from every dollar they spend. Start your free trial today—no credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            Start Your Free Trial
          </button>
          <button className="px-8 py-4 bg-transparent text-white rounded-full font-semibold text-lg border-2 border-white hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <i className="fas fa-shield-alt"></i>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-clock"></i>
            <span>14-Day Free Trial</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-credit-card"></i>
            <span>No Credit Card Required</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA

