import React, { useState } from 'react'

function CTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    event.target.reset()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif"}}>
          Reserve Your Spot on the Waitlist
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Be the first to access Omni when it launches. Share your info and we’ll send you an invite as soon as we’re live.
        </p>
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="grid gap-6 md:grid-cols-2 text-left">
            <div>
              <label htmlFor="waitlist-name" className="block text-sm font-semibold text-white/80 mb-2">
                Full Name
              </label>
              <input
                id="waitlist-name"
                name="name"
                type="text"
                required
                placeholder="Alex Rivera"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-white focus:bg-white/10 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="waitlist-email" className="block text-sm font-semibold text-white/80 mb-2">
                Email Address
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                required
                placeholder="alex@hey.com"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-white focus:bg-white/10 focus:outline-none transition"
              />
            </div>
          </div>
          <button
            type="submit"
            className="purple-gradient-button relative overflow-hidden rounded-2xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01]"
          >
            <span className="absolute top-0 left-0 z-20 h-full w-full blur-[1px]" aria-hidden="true">
              <span className="blurred-border absolute -top-px -left-px z-20 h-full w-full"></span>
            </span>
            <span className="relative z-30">Join Waitlist</span>
          </button>
          {submitted && (
            <p className="text-sm font-medium text-emerald-300 text-center">
              Thanks! You’re on the list — we’ll be in touch soon.
            </p>
          )}
        </form>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <i className="fas fa-shield-alt"></i>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-envelope-open-text"></i>
            <span>Personalized launch invite</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-gift"></i>
            <span>Early access perks</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA

