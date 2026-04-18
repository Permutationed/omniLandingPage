export default function CtaSection() {
  return (
    <section
      id="request-demo"
      className="border-solid border-ploy-neutral-inverse-s1 py-20 border-t"
    >
      <div className="max-w-[82.5rem] mx-auto px-8">
        <div className="grid items-end gap-[3.75rem] grid-cols-1 lg:grid-cols-2 max-lg:grid-cols-[repeat(1,minmax(0px,1fr))] lg:grid-cols-[repeat(2,minmax(0px,1fr))]">
          <div className="lg:self-start lg:sticky lg:top-20">
            <p className="tracking-[0.08em] uppercase text-ploy-text-secondary font-bold text-xs mt-0 mb-4">
              Partner With Us
            </p>
            <h2 className="font-heading tracking-[-0.38px] leading-[1.1] font-semibold text-[2.375rem] mt-0 mb-6">
              Ready to ship your clinical trials faster? Let&apos;s accelerate
              together.
            </h2>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://cal.com/team/astraea/product-demo"
              className="border-solid border-ploy-button-primary-border cursor-pointer bg-ploy-button-primary-background text-ploy-button-primary-text leading-normal h-10 inline-flex justify-center items-center gap-2 px-3 rounded-br-[0.3125rem] rounded-t-[0.3125rem] rounded-bl-[0.3125rem] border-t border-r border-b border-l"
              data-ploy-component-type="button"
              data-ploy-component-variant="primary"
            >
              Request Demo
              <span className="transition-[transform,translate,scale,rotate] duration-[0.15s] ease-in-out block transition-transform">
                →
              </span>
            </a>
          </div>
          <div className="flex justify-end items-end">
            <img
              src="/pharmaimage2.webp"
              alt="Pharmaceutical research"
              className="w-full max-w-[30rem] block object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
