'use client'

const steps = [
  { id: 'protocol', label: 'Protocol', status: 'complete', title: 'Design Draft', desc: 'AI Generated V4 approved by Board.' },
  { id: 'site', label: 'Site Select', status: 'complete', title: '24 Sites Live', desc: 'Contracting finalized via eSign.' },
  { id: 'recruitment', label: 'Recruitment', status: 'complete', title: 'Cohort Filled', desc: 'N=450 patients matched.' },
  { id: 'screening', label: 'Screening', status: 'active', title: 'Screening', desc: 'Auto-validating biomarkers.', progress: 78 },
  { id: 'treatment', label: 'Treatment', status: 'pending', title: 'Dosing', desc: 'Scheduled for Q3 Start.' },
  { id: 'lock', label: 'Data Lock', status: 'pending', title: 'DB Lock', desc: '' },
  { id: 'analysis', label: 'Analysis', status: 'pending', title: 'Results', desc: '' },
]

export function DashboardMockup() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] -z-10 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(19, 127, 236, 0.1)' }}
      />

      {/* Dashboard Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xl overflow-hidden">
        {/* Header/Toolbar */}
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="h-4 w-px bg-slate-300 mx-2 hidden sm:block" />
            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-icons text-primary text-base">science</span>
              Project: Phase III - Oncology (ONC-2024-X)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              Live Status: Active
            </span>
            <div className="text-xs text-slate-400">Last updated: 2m ago</div>
          </div>
        </div>

        {/* 7-Step Workflow */}
        <div className="p-8 overflow-x-auto custom-scrollbar">
          <div className="min-w-[900px]">
            {/* Step labels */}
            <div className="grid grid-cols-7 gap-4 mb-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    step.status === 'pending' ? 'text-slate-400' : 'text-primary'
                  }`}
                >
                  {step.label}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-slate-100 rounded-full mb-8">
              <div
                className="absolute left-0 top-0 h-full w-[60%] rounded-full"
                style={{
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 0 10px rgba(19, 127, 236, 0.5)',
                }}
              />
              <div className="absolute inset-0 flex justify-between items-center px-[6%]">
                {steps.map((step, i) => (
                  <div
                    key={step.id}
                    className={`rounded-full border-2 border-white shadow-sm z-10 ${
                      step.status === 'active'
                        ? 'w-4 h-4 animate-pulse'
                        : step.status === 'complete'
                        ? 'w-4 h-4'
                        : 'w-3 h-3'
                    }`}
                    style={{
                      backgroundColor: step.status === 'pending' ? '#cbd5e1' : 'var(--primary)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-7 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border ${
                    step.status === 'active'
                      ? 'bg-white border-primary shadow-sm relative overflow-hidden'
                      : step.status === 'complete'
                      ? 'bg-slate-50 border-slate-200'
                      : 'opacity-60 border-slate-100 border-dashed bg-white'
                  }`}
                >
                  {step.status === 'active' && (
                    <div
                      className="absolute top-0 right-0 w-8 h-8 rounded-bl-full -mr-2 -mt-2"
                      style={{ backgroundColor: 'rgba(19, 127, 236, 0.1)' }}
                    />
                  )}
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    {step.status === 'complete' && (
                      <span className="material-icons text-green-500 text-sm">check_circle</span>
                    )}
                    {step.status === 'active' && (
                      <span className="material-icons text-primary text-sm animate-spin" style={{ animationDuration: '3s' }}>
                        sync
                      </span>
                    )}
                    {step.status === 'pending' && (
                      <span className="material-icons text-slate-300 text-sm">
                        {step.id === 'treatment' ? 'schedule' : step.id === 'lock' ? 'lock_clock' : 'analytics'}
                      </span>
                    )}
                    {step.status === 'complete' && <span className="text-[10px] text-slate-400">100%</span>}
                    {step.status === 'active' && (
                      <span className="text-[10px] text-primary font-bold">In Progress</span>
                    )}
                  </div>
                  <h4
                    className={`text-xs font-semibold mb-1 ${
                      step.status === 'pending' ? 'text-slate-500' : 'text-slate-700'
                    }`}
                  >
                    {step.title}
                  </h4>
                  {step.desc && (
                    <p className="text-[10px] text-slate-500 leading-tight mb-2">{step.desc}</p>
                  )}
                  {step.status === 'active' && step.progress !== undefined && (
                    <>
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${step.progress}%`, backgroundColor: 'var(--primary)' }}
                        />
                      </div>
                      <div className="mt-1 text-[10px] text-right text-primary font-medium">
                        {step.progress}% Done
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
