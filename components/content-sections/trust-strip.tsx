const companies = ['BioGenix', 'AstraFlow', 'MERIDIAN', 'NovaHealth', 'Synthetix']

export function TrustStrip() {
  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-slate-500 font-medium mb-8">
          TRUSTED BY INNOVATORS IN BIOTECH AND PHARMA
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((name) => (
            <h4
              key={name}
              className="text-xl font-bold text-slate-600 flex items-center justify-center gap-1"
            >
              {name === 'MERIDIAN' && <span className="w-4 h-4 rounded-full bg-slate-400" />}
              {name}
            </h4>
          ))}
        </div>
      </div>
    </section>
  )
}
