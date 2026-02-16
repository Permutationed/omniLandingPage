export function AstraeaSection() {
  return (
    <section className="py-12 sm:py-16 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-200/80">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-6 w-fit uppercase tracking-widest">
                Flagship Product
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                Astraea
                <br />
                <span className="text-primary">Autonomous Trial Automation Engine</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                The industry&apos;s first end-to-end autonomous engine for clinical data transformation
                and statistical execution. Astraea replaces manual mapping with verified, traceable AI
                reasoning.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  'Data refinement',
                  'Standards generation',
                  'Statistical execution',
                  'Cross-track validation',
                  'Report automation',
                  'Full traceability',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <span className="material-icons text-primary text-xl">verified</span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <a
                  href="#request-demo"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 w-fit"
                >
                  Request Astraea Demo
                  <span className="material-icons">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 h-full shadow-sm">
                <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Execution Pipeline v4.0
                  </span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="relative flex flex-col gap-4">
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200" />
                    {[
                      { num: '01', label: 'RAW INGESTION', status: 'Approved', statusColor: 'emerald' },
                      { num: '02', label: 'CDASH MAPPING', status: 'Approved', statusColor: 'emerald' },
                      {
                        num: '03',
                        label: 'SDTM GENERATION',
                        status: 'Review',
                        statusColor: 'amber',
                        active: true,
                      },
                      {
                        num: '04',
                        label: 'ADaM TRANSFORMATION',
                        status: 'Pending',
                        statusColor: 'slate',
                        pending: true,
                      },
                      {
                        num: '05',
                        label: 'TLF PRODUCTION',
                        status: 'Rerun',
                        statusColor: 'red',
                      },
                    ].map((step) => (
                      <div key={step.num} className="flex items-center gap-4 relative">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-[10px] font-bold text-white shrink-0 ${
                            step.statusColor === 'emerald'
                              ? 'bg-emerald-500'
                              : step.statusColor === 'amber'
                              ? 'bg-amber-500'
                              : step.statusColor === 'red'
                              ? 'bg-red-500'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {step.num}
                        </div>
                        <div
                          className={`flex-1 p-3 rounded-lg border flex items-center justify-between shadow-sm ${
                            step.pending
                              ? 'bg-white/50 border-slate-100'
                              : step.active
                              ? 'bg-white border-primary/30'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <span
                            className={`text-xs font-semibold tracking-wide ${
                              step.pending ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {step.label}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              step.statusColor === 'emerald'
                                ? 'bg-emerald-100 text-emerald-600'
                                : step.statusColor === 'amber'
                                ? 'bg-amber-100 text-amber-600'
                                : step.statusColor === 'red'
                                ? 'bg-red-100 text-red-600'
                                : 'text-slate-400 italic'
                            }`}
                          >
                            {step.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                      Live Artifact Outputs
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: 'SDTM', sub: 'Datasets' },
                        { label: 'ADaM', sub: 'Analysis' },
                        { label: 'TLF', sub: 'Tables' },
                        { label: 'CSR', sub: 'Summary' },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-primary/5 border border-primary/10 p-2 rounded text-center"
                        >
                          <span className="block text-xs font-bold text-primary">{item.label}</span>
                          <span className="text-[8px] text-slate-400">{item.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
