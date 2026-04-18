const solutions = [
  {
    href: "/solutions/standards-automation",
    title: "Standards & Submission Automation",
    description: "SDTM, ADaM, Define-XML, and aCRF, automated end to end.",
  },
  {
    href: "/solutions/end-to-end-biometrics",
    title: "End-to-End Biometrics",
    description: "Protocol design through NDA/BLA submission with full traceability.",
  },
  {
    href: "/solutions/embedded-teams",
    title: "Embedded Biostatistics Teams",
    description: "Dedicated AI-enhanced biostats and programming resourcing.",
  },
];

export default function Navbar() {
  return (
    <header className="nav bg-ploy-background-primary/85 backdrop-blur-md z-50 sticky top-0 border-b border-ploy-border-primary">
      <div className="nav__container max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        <a
          href="/"
          className="nav__logo font-heading font-semibold text-xl tracking-tight text-ploy-text-primary flex items-baseline gap-2"
        >
          Astraea
          <span className="nav__logo-meta hidden sm:inline text-xs font-sans font-normal text-ploy-text-secondary">
            An AI-Native Clinical Trial Platform
          </span>
        </a>

        <nav className="nav__links hidden lg:flex items-center gap-8">
          <a
            href="/platform"
            className="nav__link text-sm text-ploy-text-secondary hover:text-ploy-text-primary transition-colors"
          >
            Platform
          </a>
          <div className="nav__solutions group relative">
            <button
              type="button"
              className="nav__link text-sm text-ploy-text-secondary group-hover:text-ploy-text-primary transition-colors inline-flex items-center gap-1"
            >
              Solutions
              <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-60">
                <path
                  d="M1 3l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="nav__dropdown absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[22rem] opacity-0 pointer-events-none translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
              <div className="nav__dropdown-inner bg-ploy-background-primary border border-ploy-border-primary shadow-lg overflow-hidden">
                {solutions.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="nav__dropdown-link block px-5 py-4 border-b border-ploy-border-primary last:border-b-0 hover:bg-ploy-neutral-primary-s2 transition-colors"
                  >
                    <div className="nav__dropdown-title font-heading font-semibold text-sm text-ploy-text-primary">
                      {item.title}
                    </div>
                    <div className="nav__dropdown-description text-xs text-ploy-text-secondary mt-1 leading-relaxed">
                      {item.description}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a
            href="/about"
            className="nav__link text-sm text-ploy-text-secondary hover:text-ploy-text-primary transition-colors"
          >
            About
          </a>
          <a
            href="/contact"
            className="nav__link text-sm text-ploy-text-secondary hover:text-ploy-text-primary transition-colors"
          >
            Contact
          </a>
        </nav>

        <a
          href="https://cal.com/team/astraea/product-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="nav__cta bg-ploy-button-primary-background text-ploy-button-primary-text text-sm font-medium px-4 py-2 rounded-[var(--radius-button)] hover:opacity-90 transition-opacity"
        >
          Partner With Us
        </a>
      </div>
    </header>
  );
}
