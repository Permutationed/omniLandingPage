type NavLinkProps = { href: string; label: string };

export const navLinks: NavLinkProps[] = [
  { href: "#platform", label: "Platform" },
  { href: "#technology", label: "Technology" },
  { href: "#pipeline", label: "Pipeline" },
];

export default function Navbar({ items = navLinks }: { items?: NavLinkProps[] }) {
  return (
    <header className="nav border-b border-ploy-border-primary z-50 bg-ploy-background-primary/95 backdrop-blur-sm h-16 sticky top-0">
      <div className="nav__container h-full max-w-7xl flex justify-between items-center mx-auto px-6 lg:px-8">
        <a href="/" className="nav__logo tracking-tight font-heading font-semibold text-lg">Astraea</a>
        <nav className="nav__links hidden md:block">
          <ul className="nav__list flex gap-8 m-0 p-0 list-none">
            {items.map((item) => (
              <li key={item.href} className="nav__item">
                <a href={item.href} className="nav__link text-ploy-text-secondary text-sm transition-colors duration-200 hover:text-ploy-text-primary">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a target="_blank" rel="noopener noreferrer" href="https://cal.com/team/astraea/product-demo"
          className="nav__cta bg-ploy-button-primary-background text-ploy-button-primary-text border border-ploy-button-primary-border px-4 py-2 rounded-[var(--radius-button)] font-medium text-sm transition-opacity duration-200 hover:opacity-90">
          Request Demo
        </a>
      </div>
    </header>
  );
}
