import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-foreground">
      <div className="max-w-[1140px] mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="font-sans text-lg font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
            Astraea
          </Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Company</h5>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">About Us</Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Platform</h5>
          <Link href="#technology" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">Technology</Link>
          <Link href="#pipeline" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">Pipeline</Link>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">Policies</h5>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">Privacy Policy</Link>
          <Link href="#" className="block text-[13px] text-foreground py-1 hover:opacity-70 transition-opacity">Terms of Service</Link>
        </div>
      </div>
      <div className="max-w-[1140px] mx-auto px-5 pb-10 text-xs text-muted-foreground">
        &copy; Astraea Inc. {new Date().getFullYear()}
      </div>
    </footer>
  )
}
