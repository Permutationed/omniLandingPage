import Link from 'next/link'

const footerLinks = {
  nav: [
    { href: '#architecture', label: 'Architecture Overview' },
    { href: '#security', label: 'Compliance & Security' },
    { href: '#request-demo', label: 'Documentation' },
    { href: '#request-demo', label: 'Research Whitepaper' },
    { href: '#request-demo', label: 'Contact / Partnerships' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Logo & Tagline */}
          <div>
            <Link href="/" className="font-display font-bold text-xl tracking-tight">
              Omni
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              AI automation for Phase II & III clinical trials.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.nav.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Omni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
