import React from 'react'

function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Frequent Traveler',
      image: 'https://i.pravatar.cc/150?img=1',
      quote: 'Omni has completely changed how I use my credit cards. I\'ve earned over $2,000 in extra rewards in just 6 months without changing my spending habits.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Business Owner',
      image: 'https://i.pravatar.cc/150?img=2',
      quote: 'The real-time recommendations are spot-on. I never have to think about which card to use anymore—Omni just tells me.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Points Enthusiast',
      image: 'https://i.pravatar.cc/150?img=3',
      quote: 'Finally, an app that actually understands my card portfolio and maximizes every purchase. The savings tracking is incredible.',
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif"}}>
            Loved by
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See what our users are saying about their experience with Omni
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

