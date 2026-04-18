interface Props {
  quote: string;
  author?: string;
  role?: string;
}

export default function TestimonialSection({
  quote,
  author,
  role,
}: Props) {
  return (
    <section className="testimonial border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-neutral-primary-s2">
      <div className="testimonial__container max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <span className="testimonial__mark font-heading text-ploy-accent-primary text-6xl leading-none block mb-4">
          &ldquo;
        </span>
        <blockquote className="testimonial__quote font-heading font-semibold text-ploy-text-primary text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-balance">
          {quote}
        </blockquote>
        {(author || role) && (
          <figcaption className="testimonial__author mt-8 text-sm text-ploy-text-secondary">
            {author && <span className="font-medium text-ploy-text-primary">{author}</span>}
            {author && role && <span className="mx-2 opacity-40">·</span>}
            {role}
          </figcaption>
        )}
      </div>
    </section>
  );
}
