import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { FAQAccordion } from './faq-accordion'

export function FAQSection() {
  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 py-20 sm:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about Omni
        </p>
      </ScrollReveal>

      <FAQAccordion />
    </section>
  )
}
