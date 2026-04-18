export default function Footer() {
  return (
    <footer className="footer border-t border-ploy-border-primary">
      <div className="footer__container max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="footer__grid grid gap-8 grid-cols-2 md:grid-cols-4">
          <div className="footer__brand">
            <a href="/" className="footer__logo tracking-tight font-heading font-semibold text-lg">Astraea</a>
          </div>
          <div className="footer__column">
            <h5 className="footer__column-title tracking-[0.1em] uppercase text-ploy-text-secondary font-medium text-xs mb-3">Company</h5>
            <a href="#" className="footer__link text-ploy-text-secondary text-sm block py-1 transition-colors duration-200 hover:text-ploy-text-primary">About Us</a>
          </div>
          <div className="footer__column">
            <h5 className="footer__column-title tracking-[0.1em] uppercase text-ploy-text-secondary font-medium text-xs mb-3">Platform</h5>
            <a href="#technology" className="footer__link text-ploy-text-secondary text-sm block py-1 transition-colors duration-200 hover:text-ploy-text-primary">Technology</a>
            <a href="#pipeline" className="footer__link text-ploy-text-secondary text-sm block py-1 transition-colors duration-200 hover:text-ploy-text-primary">Pipeline</a>
          </div>
          <div className="footer__column">
            <h5 className="footer__column-title tracking-[0.1em] uppercase text-ploy-text-secondary font-medium text-xs mb-3">Legal</h5>
            <a href="#" className="footer__link text-ploy-text-secondary text-sm block py-1 transition-colors duration-200 hover:text-ploy-text-primary">Privacy Policy</a>
            <a href="#" className="footer__link text-ploy-text-secondary text-sm block py-1 transition-colors duration-200 hover:text-ploy-text-primary">Terms of Service</a>
          </div>
        </div>
        <div className="footer__copyright text-ploy-text-secondary text-xs mt-12 pt-8 border-t border-ploy-border-primary">© Astraea Inc. 2025</div>
      </div>
    </footer>
  );
}
