import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const departments = [
  {
    title: "General Inquiry",
    name: "info@tryastraea.com",
    email: "info@tryastraea.com",
  },
  {
    title: "Sales & Product Demo",
    name: "Sales Team",
    email: "sales@tryastraea.com",
  },
  {
    title: "Partnerships",
    name: "Partnerships",
    email: "partnerships@tryastraea.com",
  },
  {
    title: "Media & Communications",
    name: "Press",
    email: "press@tryastraea.com",
  },
  {
    title: "Careers",
    name: "Talent",
    email: "careers@tryastraea.com",
  },
];

export function ContactPage() {
  return (
    <div className="page relative flex flex-col min-h-screen">
      <Navbar />
      <main className="page__main grow">
        {/* Hero */}
        <section className="contact-hero relative overflow-hidden border-b border-ploy-border-primary">
          <div className="contact-hero__backdrop absolute inset-0 pointer-events-none">
            <div className="contact-hero__glow absolute -top-24 left-1/3 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-ploy-accent-primary/8 blur-[110px]" />
          </div>
          <div className="contact-hero__container relative max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-28 text-center">
            <p className="contact-hero__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-5">
              Contact Us
            </p>
            <h1 className="contact-hero__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-4xl md:text-5xl lg:text-6xl text-balance">
              Let's accelerate your next trial.
            </h1>
            <p className="contact-hero__subtitle text-ploy-text-secondary text-lg leading-relaxed mt-5 max-w-2xl mx-auto">
              Reach out for demos, partnerships, or general inquiries. We usually respond within one business day.
            </p>
          </div>
        </section>

        {/* Form + directory */}
        <section className="contact-main border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-background-primary">
          <div className="contact-main__container max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16">
            {/* Form */}
            <div className="contact-form">
              <h2 className="contact-form__title font-heading font-semibold text-2xl md:text-3xl text-ploy-text-primary leading-tight">
                Send us a message.
              </h2>
              <p className="contact-form__subtitle text-ploy-text-secondary text-sm mt-2 mb-8">
                Tell us about your program, we'll route you to the right team.
              </p>
              <form
                className="contact-form__form flex flex-col gap-5"
                action="https://cal.com/team/astraea/product-demo"
              >
                <div className="contact-form__row grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="contact-form__field flex flex-col gap-2">
                    <label className="contact-form__label text-xs font-medium text-ploy-text-primary uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="contact-form__input bg-ploy-input-background border border-ploy-input-border rounded-[var(--radius-input)] px-4 py-3 text-sm text-ploy-text-primary focus:outline-none focus:border-ploy-accent-primary transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="contact-form__field flex flex-col gap-2">
                    <label className="contact-form__label text-xs font-medium text-ploy-text-primary uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="contact-form__input bg-ploy-input-background border border-ploy-input-border rounded-[var(--radius-input)] px-4 py-3 text-sm text-ploy-text-primary focus:outline-none focus:border-ploy-accent-primary transition-colors"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>
                <div className="contact-form__field flex flex-col gap-2">
                  <label className="contact-form__label text-xs font-medium text-ploy-text-primary uppercase tracking-wider">
                    Company
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="contact-form__input bg-ploy-input-background border border-ploy-input-border rounded-[var(--radius-input)] px-4 py-3 text-sm text-ploy-text-primary focus:outline-none focus:border-ploy-accent-primary transition-colors"
                    placeholder="Sponsor or CRO"
                  />
                </div>
                <div className="contact-form__field flex flex-col gap-2">
                  <label className="contact-form__label text-xs font-medium text-ploy-text-primary uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="contact-form__input bg-ploy-input-background border border-ploy-input-border rounded-[var(--radius-input)] px-4 py-3 text-sm text-ploy-text-primary focus:outline-none focus:border-ploy-accent-primary transition-colors resize-none"
                    placeholder="Tell us about your program and timeline."
                  />
                </div>
                <a
                  href="https://cal.com/team/astraea/product-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-form__submit self-start bg-ploy-button-primary-background text-ploy-button-primary-text border border-ploy-button-primary-border px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Book a Call <span>→</span>
                </a>
              </form>
            </div>

            {/* Directory */}
            <aside className="contact-directory">
              <h2 className="contact-directory__title font-heading font-semibold text-2xl md:text-3xl text-ploy-text-primary leading-tight mb-8">
                Department directory.
              </h2>
              <ul className="contact-directory__list divide-y divide-ploy-border-primary border-y border-ploy-border-primary">
                {departments.map((dept) => (
                  <li key={dept.title} className="contact-directory__item py-5">
                    <p className="contact-directory__label text-xs font-semibold text-ploy-text-secondary uppercase tracking-wider">
                      {dept.title}
                    </p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="contact-directory__email block mt-1 text-ploy-text-primary text-sm hover:text-ploy-accent-primary transition-colors"
                    >
                      {dept.email}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="contact-directory__location mt-10 border border-ploy-border-primary p-5 rounded-[var(--radius-card)] bg-ploy-neutral-primary-s2">
                <p className="contact-directory__location-label text-xs font-semibold text-ploy-text-secondary uppercase tracking-wider">
                  Headquarters
                </p>
                <p className="contact-directory__location-value text-ploy-text-primary text-sm mt-2 leading-relaxed">
                  Astraea Inc.<br />
                  San Francisco, California
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ContactPage;
