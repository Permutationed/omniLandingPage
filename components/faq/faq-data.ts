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
    id: 'compliance',
    question: 'How does Omni ensure compliance?',
    answer:
      'Omni is built for regulated environments with audit-ready outputs and human oversight. Every deliverable can be traced back to source.',
  },
  {
    id: 'data-protection',
    question: 'How is sensitive data protected?',
    answer:
      'Our architecture is designed for privacy and compliance. Data handling follows industry standards.',
  },
  {
    id: 'traceability',
    question: 'Is output traceable?',
    answer:
      'Yes. Omni produces reproducible, auditable outputs with full lineage to source inputs.',
  },
  {
    id: 'quality',
    question: 'How is quality assured?',
    answer:
      'Automated verification and validation are built into the pipeline for higher accuracy.',
  },
  {
    id: 'security-governance',
    question: 'Security & Governance',
    contentKey: 'security-grid',
    icon: 'shield',
  },
]
