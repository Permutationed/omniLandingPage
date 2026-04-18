const columns = [
  {
    title: "Solutions",
    links: [
      { label: "Standards & Submission Automation", href: "/solutions/standards-automation" },
      { label: "End-to-End Biometrics", href: "/solutions/end-to-end-biometrics" },
      { label: "Embedded Biostatistics Teams", href: "/solutions/embedded-teams" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Platform", href: "/platform" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Astraea Platform", href: "/platform" },
      { label: "Request Demo", href: "https://cal.com/team/astraea/product-demo" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer bg-ploy-background-inverse text-ploy-text-inverse pt-16 pb-10">
      <div className="footer__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="footer__grid grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 md:gap-12 mb-12">
          <div className="footer__brand">
            <a
              href="/"
              className="footer__logo font-heading font-semibold text-xl text-ploy-text-inverse"
            >
              Astraea
            </a>
            <p className="footer__description text-ploy-text-inverse-secondary text-sm leading-relaxed mt-4 max-w-sm">
              Astraea accelerates the full trial lifecycle from protocol design to FDA submission, with standards-aware, compliant, enterprise-grade AI.
            </p>
            <p className="footer__address text-ploy-text-inverse-secondary text-xs leading-relaxed mt-6">
              Backed by Y Combinator
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="footer__column">
              <h5 className="footer__column-title uppercase text-ploy-text-inverse-secondary font-semibold text-xs tracking-[0.12em] mb-4">
                {col.title}
              </h5>
              <ul className="footer__links space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer__link text-ploy-text-inverse-secondary text-sm hover:text-ploy-text-inverse transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__copyright flex flex-col md:flex-row items-start md:items-center justify-between text-ploy-text-inverse-secondary text-xs border-t border-ploy-border-inverse pt-6 gap-3">
          <span>© {new Date().getFullYear()} Astraea Inc. All rights reserved.</span>
          <span className="footer__legal flex items-center gap-6">
            <a href="#" className="hover:text-ploy-text-inverse transition-colors">Privacy</a>
            <a href="#" className="hover:text-ploy-text-inverse transition-colors">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
