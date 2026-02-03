export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 'how-omni-makes-money',
    question: 'How does Omni make money?',
    answer:
      'Omni earns a small commission from partner merchants when you shop at their locations. This allows us to offer rewards at no cost to students or schools.',
  },
  {
    id: 'school-integration',
    question: 'How does school integration work?',
    answer:
      "Schools connect their payment systems to Omni, allowing tuition payments to automatically earn rewards. The process is seamless for students and parents—you'll see rewards accumulate in real-time.",
  },
  {
    id: 'supported-cards',
    question: 'What payment methods are supported?',
    answer:
      'Omni works with major credit and debit cards, ACH transfers, and direct bank payments. Check with your school for specific payment options available.',
  },
  {
    id: 'data-safety',
    question: 'Is my data safe?',
    answer:
      "Absolutely. We use bank-level 256-bit encryption and never store sensitive payment information on our servers. We're SOC 2 compliant and follow strict data protection standards.",
  },
  {
    id: 'how-rewards-work',
    question: 'How do rewards work?',
    answer:
      'Earn points on tuition payments (up to 1% back) and everyday purchases at partner merchants (3x-10x points). Points convert to statement credits or direct tuition payments at a rate of 100 points = $1.',
  },
]
