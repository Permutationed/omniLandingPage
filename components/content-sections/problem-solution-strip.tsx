const columns = [
  {
    icon: 'edit_note',
    title: 'Protocol Design',
    friction: 'Manual drafting is slow, error-prone, and often leads to costly amendments mid-trial.',
    solution: 'Generative AI drafts compliant protocols in minutes, predicting risks before they happen.',
  },
  {
    icon: 'group_add',
    title: 'Patient Recruitment',
    friction: 'Finding eligible patients is a "needle in a haystack" problem that delays 80% of trials.',
    solution: 'Predictive cohort matching scans millions of EHR records instantly to identify candidates.',
  },
  {
    icon: 'hub',
    title: 'Data Ingestion',
    friction: 'Fragmented data sources across clinics result in months of manual cleaning and verification.',
    solution: 'Unified autonomous ingestion pipelines normalize disparate data streams in real-time.',
  },
]

export function ProblemSolutionStrip() {
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row md:gap-0 gap-8">
          {columns.map((col, i) => (
            <div
              key={col.title}
              className={`flex-1 min-w-0 flex flex-col ${
                i === 0 ? 'md:pr-10' : i === columns.length - 1 ? 'md:pl-10' : 'md:px-10'
              } ${i > 0 ? 'md:border-l border-slate-100 pt-8 md:pt-0' : ''}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  <span className="material-icons text-slate-400">{col.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{col.title}</h3>
              </div>
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-red-200">
                  <p className="text-xs uppercase tracking-wider text-red-500 font-bold mb-1">
                    The Friction
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">{col.friction}</p>
                </div>
                <div className="pl-4 border-l-2 border-primary">
                  <p className="text-xs uppercase tracking-wider text-primary font-bold mb-1">
                    Omni Solution
                  </p>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">{col.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
