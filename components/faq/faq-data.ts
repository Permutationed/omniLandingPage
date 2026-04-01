export interface FAQItem {
  id: string
  question: string
  answer?: string
  /** When set, accordion renders custom content (e.g. security grid) instead of answer. */
  contentKey?: 'security-grid'
  /** Optional icon name for the row label (e.g. 'shield'). */
  icon?: 'shield'
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
      "We're working to integrate Omni directly into student payment rails. For now, students and parents pay through our platform, and we handle the ACH transfer to your school on your behalf.",
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
      'Earn up to 1% back on tuition based on your everyday spending, plus 1% cash back on all everyday purchases. Partner merchants offer bonus rewards (3x-10x points) on top of your base rewards. Points convert to statement credits or direct tuition payments at a rate of 100 points = $1.',
  },
  {
    id: 'bank-level-security',
    question: 'Bank-Level Security',
    contentKey: 'security-grid',
    icon: 'shield',
  },
]
