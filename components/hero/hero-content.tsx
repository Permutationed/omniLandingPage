import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroContent() {
  return (
    <>
      {/* Badge */}
      <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8">
        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
        New agentic platform
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
        Ship clinical trials faster with{' '}
        <br className="hidden sm:block" />
        <span className="text-primary">autonomous automation.</span>
      </h1>

      {/* Subtext */}
      <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        Omni Pharma accelerates the full trial lifecycle from protocol design to FDA
        submission using compliant, enterprise-grade AI designed for modern healthcare.
      </p>

      {/* CTA Group */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" className="rounded-lg px-8 py-3.5 text-base font-semibold shadow-md hover:shadow-lg" asChild>
          <a href="#request-demo">Request Demo</a>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-lg px-8 py-3.5 text-base font-medium border-slate-200 hover:bg-slate-50"
          asChild
        >
          <Link href="#" className="flex items-center justify-center gap-2">
            <span className="material-icons text-lg">description</span>
            View Documentation
          </Link>
        </Button>
      </div>
    </>
  )
}
